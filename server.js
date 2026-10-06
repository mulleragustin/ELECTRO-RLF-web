// Servidor de electrorlf.com.ar: renderiza React en el servidor (SEO) y expone
// en el mismo dominio los datos de la tienda que vienen del sistema de gestión.
import fs from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'
import { fileURLToPath } from 'node:url'
import compression from 'compression'
import express from 'express'

const root = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT || 5173)
const gestionUrl = (process.env.GESTION_URL || 'https://gestion.electrorlf.com.ar').replace(/\/+$/, '')
const apiBase = `${gestionUrl}/tienda/api/`

// ── Caché en memoria de lo que viene de gestión ─────────────────────────────
// Un cambio en el sistema tarda como mucho API_TTL en verse en la web. Si
// gestión no responde, se sigue sirviendo la última respuesta buena.
const API_TTL = 60_000
const XML_TTL = 10 * 60_000
const MAX_ENTRIES = 500
const cache = new Map()
const lastGood = new Map()

function remember(map, key, value) {
  map.delete(key)
  map.set(key, value)
  if (map.size > MAX_ENTRIES) map.delete(map.keys().next().value)
}

async function fetchUpstream(url) {
  try {
    const response = await fetch(url, {
      headers: { 'user-agent': 'electrorlf-web' },
      signal: AbortSignal.timeout(8000),
    })
    return { status: response.status, text: await response.text() }
  } catch (error) {
    console.error(`[gestion] ${url}: ${error.message}`)
    return { status: 502, text: '{"detail":"Gestión no disponible"}' }
  }
}

async function cachedFetch(url, ttl) {
  const hit = cache.get(url)
  if (hit && hit.expires > Date.now()) return hit.promise

  const promise = fetchUpstream(url).then((result) => {
    if (result.status < 500) {
      if (result.status === 200) remember(lastGood, url, result)
      return result
    }
    cache.delete(url)
    return lastGood.get(url) ?? result
  })
  remember(cache, url, { expires: Date.now() + ttl, promise })
  return promise
}

// Lo usa el render del servidor (entry-server) para pedir datos a la API.
async function fetchJson(pathWithQuery) {
  const result = await cachedFetch(apiBase + pathWithQuery, API_TTL)
  if (result.status !== 200) return { status: result.status, body: null }
  try {
    return { status: 200, body: JSON.parse(result.text) }
  } catch {
    return { status: 502, body: null }
  }
}

function serializeState(state) {
  return JSON.stringify(state)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', true)

app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  })
  const host = req.headers.host || ''
  if (host.startsWith('www.')) {
    return res.redirect(301, `https://${host.slice(4)}${req.originalUrl}`)
  }
  next()
})
app.use(compression())

app.get('/healthz', (req, res) => res.type('text').send('ok'))

// API de la tienda (la usa el navegador al navegar dentro del sitio).
app.use('/api/tienda', async (req, res) => {
  const match = req.url.match(/^\/(productos\/(?:\d+\/)?)(\?.*)?$/)
  if (req.method !== 'GET' || !match) return res.status(404).json({ detail: 'No encontrado' })
  const result = await cachedFetch(apiBase + match[1] + (match[2] || ''), API_TTL)
  res
    .status(result.status)
    .type('application/json')
    .set('Cache-Control', result.status === 200 ? 'public, max-age=60' : 'no-store')
    .send(result.text)
})

// Fotos de productos (nombres únicos: Cloudflare y el navegador las cachean para siempre).
app.get(/^\/media\/productos\/[\w/.-]+$/, async (req, res) => {
  if (req.path.includes('..')) return res.sendStatus(404)
  try {
    const upstream = await fetch(gestionUrl + req.path, { signal: AbortSignal.timeout(15000) })
    res.status(upstream.status)
    for (const header of ['content-type', 'cache-control', 'last-modified', 'etag']) {
      const value = upstream.headers.get(header)
      if (value) res.set(header, value)
    }
    if (!upstream.ok || !upstream.body) return res.end()
    Readable.fromWeb(upstream.body).pipe(res)
  } catch (error) {
    console.error(`[gestion] ${req.path}: ${error.message}`)
    if (!res.headersSent) res.sendStatus(502)
  }
})

// Sitemap de productos y feed de Google Merchant, publicados en el dominio de la web.
const XML_PROXIES = {
  '/sitemap-productos.xml': 'tienda/sitemap.xml',
  '/feeds/google-merchant.xml': 'tienda/feed/google.xml',
}
for (const [publicPath, upstreamPath] of Object.entries(XML_PROXIES)) {
  app.get(publicPath, async (req, res) => {
    const result = await cachedFetch(`${gestionUrl}/${upstreamPath}`, XML_TTL)
    if (result.status !== 200) return res.status(503).type('text').send('No disponible')
    res.type('application/xml').set('Cache-Control', 'public, max-age=600').send(result.text)
  })
}

let vite
if (isProduction) {
  const clientDir = path.join(root, 'dist/client')
  app.get('/index.html', (req, res) => res.redirect(301, '/'))
  app.use('/assets', express.static(path.join(clientDir, 'assets'), {
    index: false, maxAge: '1y', immutable: true, fallthrough: false,
  }))
  app.use(express.static(clientDir, { index: false, maxAge: '1h' }))
} else {
  const { createServer } = await import('vite')
  vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  app.use(vite.middlewares)
}

const productionTemplate = isProduction
  ? fs.readFile(path.join(root, 'dist/client/index.html'), 'utf-8')
  : null
const productionEntry = isProduction ? import('./dist/server/entry-server.js') : null

app.use(async (req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next()
  const url = req.originalUrl
  try {
    let template
    let entry
    if (isProduction) {
      template = await productionTemplate
      entry = await productionEntry
    } else {
      const raw = await fs.readFile(path.join(root, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, raw)
      entry = await vite.ssrLoadModule('/src/entry-server.jsx')
    }

    const result = await entry.handleRequest(url, fetchJson)
    if (result.redirect) return res.redirect(301, result.redirect)

    // Reemplazos con función: el contenido puede traer "$" y no debe interpretarse.
    const html = template
      .replace('<!--app-head-->', () => result.head)
      .replace('<!--app-html-->', () => result.html)
      .replace('<!--app-state-->', () => `<script>window.__RLF_INITIAL__=${serializeState(result.state)}</script>`)
    res.status(result.status).set('Cache-Control', 'no-cache').type('html').send(html)
  } catch (error) {
    vite?.ssrFixStacktrace(error)
    console.error(error)
    res.status(500).type('text').send('Error interno')
  }
})

app.listen(port, () => {
  console.log(`electrorlf-web escuchando en http://localhost:${port} (gestión: ${gestionUrl})`)
})
