// SEO por página. El servidor lo inserta en el HTML (renderSeoTags) y el
// navegador lo actualiza al navegar dentro del sitio (applySeo).
import { formatPrecio } from './format'
import { SITE } from './site'

const INDEX = 'index, follow, max-image-preview:large'
const NOINDEX = 'noindex, follow'

const DEFAULT_IMAGE = {
  url: `${SITE.baseUrl}/assets/seo/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: 'Ferretería eléctrica Electro RLF en Resistencia, Chaco',
}

const SHOP_IMAGE = {
  url: `${SITE.baseUrl}/assets/seo/kit-herramientas-insumos-electricos-electro-rlf.jpg`,
  alt: 'Kits e insumos eléctricos de Electro RLF para comprar en Resistencia',
}

const PAGES = {
  home: {
    title: 'Ferretería eléctrica en Resistencia | ELECTRO RLF',
    description:
      'Venta de materiales eléctricos, armado de tableros y todo lo que necesitás para tu hogar o tu obra. Coordiná por WhatsApp y retirá por el local más cercano en Resistencia, Chaco.',
    path: '/',
    preloadImage: '/assets/seo/ferreteria-electrica-resistencia-electro-rlf.jpg',
  },
  about: {
    title: 'Sobre ELECTRO RLF | Materiales eléctricos para tu obra u hogar en Resistencia',
    description:
      'Conocé ELECTRO RLF: atención personalizada, herramientas y materiales certificados; en el centro de Resistencia, Chaco.',
    path: '/nosotros',
    image: {
      url: `${SITE.baseUrl}/assets/seo/negocio-electro-rlf-resistencia-chaco.jpg`,
      alt: 'Negocio Electro RLF con atención personalizada en Resistencia',
    },
  },
  cart: {
    title: 'Tu carrito | ELECTRO RLF',
    description: 'Revisá tu pedido y envialo por WhatsApp para consultar precio y disponibilidad.',
    path: '/carrito',
    robots: NOINDEX,
  },
  notFound: {
    title: 'Página no encontrada | ELECTRO RLF',
    description: 'La página que buscás no existe o el producto ya no está publicado.',
    robots: NOINDEX,
  },
  error: {
    title: 'Shop no disponible | ELECTRO RLF',
    description: 'No pudimos cargar el catálogo en este momento. Escribinos por WhatsApp.',
    robots: NOINDEX,
  },
}

function absolute(path) {
  return new URL(path, SITE.baseUrl).toString()
}

function resumen(texto, largo) {
  const limpio = texto.replace(/\s+/g, ' ').trim()
  if (limpio.length <= largo) return limpio
  return `${limpio.slice(0, largo).replace(/\s+\S*$/, '').replace(/[.,;:]$/, '')}…`
}

function breadcrumbList(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: absolute(path),
    })),
  }
}

// Google solo acepta Product con precio (offers): sin precio no se publica.
function productJsonLd(producto, canonical, images, description) {
  return {
    '@type': 'Product',
    name: producto.titulo,
    description,
    url: canonical,
    sku: producto.codigo,
    ...(producto.gtin ? { gtin: producto.gtin } : {}),
    ...(producto.marca ? { brand: { '@type': 'Brand', name: producto.marca } } : {}),
    category: producto.rubro.nombre,
    image: images,
    additionalProperty: producto.caracteristicas
      .filter((caracteristica) => caracteristica.nombre)
      .map((caracteristica) => ({
        '@type': 'PropertyValue',
        name: caracteristica.nombre,
        value: caracteristica.valor,
      })),
    offers: {
      '@type': 'Offer',
      url: canonical,
      priceCurrency: 'ARS',
      price: producto.precio,
      availability: producto.disponible ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE.baseUrl}/#localbusiness` },
    },
  }
}

function productSeo(producto) {
  const marca = producto.marca && !producto.titulo.toLowerCase().includes(producto.marca.toLowerCase())
    ? ` ${producto.marca}`
    : ''
  const precio = producto.precio
    ? ` ${formatPrecio(producto.precio)}${producto.precio_efectivo ? ` (${formatPrecio(producto.precio_efectivo)} en efectivo o transferencia)` : ''}.`
    : ''
  const description = producto.descripcion
    ? resumen(producto.descripcion, 155)
    : precio
      ? `${producto.titulo}${marca} en ELECTRO RLF:${precio} Retiralo en nuestras sedes de Resistencia, Chaco.`
      : `${producto.titulo}${marca} en ELECTRO RLF. Consultá precio y disponibilidad por WhatsApp y retiralo en nuestras sedes de Resistencia, Chaco.`
  const canonical = absolute(producto.path)
  // Para compartir (WhatsApp, Facebook) va la foto con la marca.
  const images = producto.imagenes.map((imagen) => ({
    url: absolute(imagen.url),
    width: imagen.ancho,
    height: imagen.alto,
    alt: producto.titulo,
  }))
  // Para Google, la foto limpia: rechaza imágenes con logos o marcas de agua.
  const imagenesLimpias = producto.imagenes.map((imagen) => absolute(imagen.original || imagen.url))

  const jsonLd = [breadcrumbList([
    ['Inicio', '/'],
    ['Shop', '/shop'],
    [producto.rubro.nombre, `/shop/${producto.rubro.slug}`],
    [producto.titulo, producto.path],
  ])]
  if (producto.precio) jsonLd.push(productJsonLd(producto, canonical, imagenesLimpias, description))

  return {
    title: `${producto.titulo}${marca} | ELECTRO RLF`,
    description,
    canonical,
    ogType: 'product',
    image: images[0],
    extraMeta: producto.precio
      ? [['product:price:amount', producto.precio], ['product:price:currency', 'ARS']]
      : [],
    jsonLd,
  }
}

function shopSeo(data) {
  const { rubro } = data
  const pagina = data.page > 1 ? ` · Página ${data.page}` : ''
  const basePath = rubro ? `/shop/${rubro.slug}` : '/shop'
  const path = data.page > 1 ? `${basePath}?page=${data.page}` : basePath
  const crumbs = [['Inicio', '/'], ['Shop', '/shop']]
  if (rubro) crumbs.push([rubro.nombre, basePath])

  return {
    title: rubro
      ? `${rubro.nombre} en Resistencia${pagina} | Shop ELECTRO RLF`
      : `Shop online de materiales eléctricos y ferretería${pagina} | ELECTRO RLF`,
    description: rubro
      ? `${rubro.nombre} en ELECTRO RLF: ${rubro.total} productos para tu obra u hogar. Armá tu pedido, consultalo por WhatsApp y retiralo en Resistencia, Chaco.`
      : 'Catálogo online de ELECTRO RLF: materiales eléctricos, herramientas y ferretería. Armá tu pedido, consultalo por WhatsApp y retiralo en nuestras sedes de Resistencia, Chaco.',
    // Búsquedas y filtros por marca no se indexan (duplican las categorías).
    canonical: data.q || data.marca ? null : absolute(path),
    robots: data.q || data.marca ? NOINDEX : INDEX,
    image: SHOP_IMAGE,
    jsonLd: [breadcrumbList(crumbs)],
  }
}

export function buildSeo(route, page) {
  let seo
  if (page.status === 404) seo = PAGES.notFound
  else if (page.status >= 500) seo = PAGES.error
  else if (route.name === 'shop') seo = shopSeo(page.data)
  else if (route.name === 'product') seo = productSeo(page.data)
  else seo = PAGES[route.name] || PAGES.notFound

  return {
    robots: INDEX,
    image: DEFAULT_IMAGE,
    ogType: 'website',
    extraMeta: [],
    jsonLd: [],
    ...seo,
    canonical: seo.canonical !== undefined ? seo.canonical : seo.path ? absolute(seo.path) : null,
  }
}

function seoTags(seo) {
  const image = seo.image || DEFAULT_IMAGE
  const tags = [
    ['meta', { name: 'description', content: seo.description }],
    ['meta', { name: 'robots', content: seo.robots }],
  ]
  if (seo.canonical) tags.push(['link', { rel: 'canonical', href: seo.canonical }])
  tags.push(
    ['meta', { property: 'og:title', content: seo.title }],
    ['meta', { property: 'og:description', content: seo.description }],
    ['meta', { property: 'og:type', content: seo.ogType }],
    ['meta', { property: 'og:site_name', content: SITE.name }],
    ['meta', { property: 'og:locale', content: 'es_AR' }],
  )
  if (seo.canonical) tags.push(['meta', { property: 'og:url', content: seo.canonical }])
  tags.push(['meta', { property: 'og:image', content: image.url }])
  if (image.width && image.height) {
    tags.push(
      ['meta', { property: 'og:image:width', content: String(image.width) }],
      ['meta', { property: 'og:image:height', content: String(image.height) }],
    )
  }
  tags.push(['meta', { property: 'og:image:alt', content: image.alt || seo.title }])
  for (const [property, content] of seo.extraMeta) tags.push(['meta', { property, content }])
  tags.push(
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: seo.title }],
    ['meta', { name: 'twitter:description', content: seo.description }],
    ['meta', { name: 'twitter:image', content: image.url }],
  )
  if (seo.preloadImage) {
    tags.push(['link', { rel: 'preload', as: 'image', href: seo.preloadImage, fetchpriority: 'high' }])
  }
  return tags
}

function jsonLdText(seo) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': seo.jsonLd }).replace(/</g, '\\u003c')
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function renderSeoTags(seo) {
  const parts = [`<title>${escapeHtml(seo.title)}</title>`]
  for (const [tag, attrs] of seoTags(seo)) {
    const attributes = Object.entries(attrs).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ')
    parts.push(`<${tag} data-seo ${attributes}>`)
  }
  if (seo.jsonLd.length) {
    parts.push(`<script type="application/ld+json" data-seo>${jsonLdText(seo)}</script>`)
  }
  return parts.join('\n    ')
}

export function applySeo(seo) {
  document.title = seo.title
  document.head.querySelectorAll('[data-seo]').forEach((element) => element.remove())

  const fragment = document.createDocumentFragment()
  for (const [tag, attrs] of seoTags(seo)) {
    if (attrs.rel === 'preload') continue // solo sirve en la primera carga
    const element = document.createElement(tag)
    element.setAttribute('data-seo', '')
    for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value)
    fragment.appendChild(element)
  }
  if (seo.jsonLd.length) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo', '')
    script.textContent = jsonLdText(seo)
    fragment.appendChild(script)
  }
  document.head.appendChild(fragment)
}
