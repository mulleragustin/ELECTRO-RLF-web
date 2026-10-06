import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { createApi } from './api.js'
import { canonicalPathname, loadPageData, matchRoute, parseUrl } from './router.js'
import { buildSeo, renderSeoTags } from './seo.js'

// Resuelve una request del servidor: redirect a la URL canónica o el HTML de la página.
export async function handleRequest(url, fetchJson) {
  const location = parseUrl(url)

  const pathname = canonicalPathname(location.pathname)
  if (pathname !== location.pathname) return { redirect: `${pathname}${location.search}` }

  const route = matchRoute(pathname)
  if (route.name === 'shop' && location.query.get('page') === '1') {
    const query = new URLSearchParams(location.query)
    query.delete('page')
    const search = query.toString()
    return { redirect: search ? `${pathname}?${search}` : pathname }
  }

  const page = await loadPageData(route, location.query, createApi(fetchJson))
  if (route.name === 'product' && page.data && page.data.path !== pathname) {
    return { redirect: page.data.path }
  }

  const html = renderToString(
    <StrictMode>
      <App initialUrl={`${location.pathname}${location.search}`} initialPage={page} />
    </StrictMode>,
  )
  return { status: page.status, html, head: renderSeoTags(buildSeo(route, page)), state: page }
}
