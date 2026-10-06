// Rutas de la web. Se usan igual en el servidor (SSR) y en el navegador.

export function parseUrl(url) {
  const parsed = new URL(url, 'http://localhost')
  return {
    pathname: parsed.pathname,
    search: parsed.search,
    hash: parsed.hash.replace(/^#/, ''),
    query: parsed.searchParams,
  }
}

export function locationHref(location) {
  return `${location.pathname}${location.search}${location.hash ? `#${location.hash}` : ''}`
}

// Forma canónica de un path: minúsculas, sin barras repetidas ni barra final.
export function canonicalPathname(pathname) {
  const path = pathname.toLowerCase().replace(/\/{2,}/g, '/')
  return path.length > 1 ? path.replace(/\/+$/, '') || '/' : '/'
}

export function matchRoute(pathname) {
  if (pathname === '/') return { name: 'home' }
  if (pathname === '/nosotros') return { name: 'about' }
  if (pathname === '/shop') return { name: 'shop', rubro: '' }
  if (pathname === '/carrito') return { name: 'cart' }

  let match = pathname.match(/^\/shop\/([a-z0-9-]+)$/)
  if (match) return { name: 'shop', rubro: match[1] }

  // /producto/<slug>-<id>: el id manda, el slug es para SEO.
  match = pathname.match(/^\/producto\/(?:[a-z0-9-]*-)?(\d+)$/)
  if (match) return { name: 'product', id: match[1] }

  return { name: 'notFound' }
}

export function shopParams(route, query) {
  const page = Number.parseInt(query.get('page') || '1', 10)
  return {
    rubro: route.rubro || '',
    q: (query.get('q') || '').trim().slice(0, 100),
    page: Number.isFinite(page) && page > 0 ? page : 1,
  }
}

export function routeNeedsData(route) {
  return route.name === 'shop' || route.name === 'product'
}

// Devuelve { status, data }: 404 y 503 se muestran como páginas de error.
export async function loadPageData(route, query, api) {
  if (route.name === 'notFound') return { status: 404, data: null }
  if (!routeNeedsData(route)) return { status: 200, data: null }
  try {
    const data = route.name === 'shop'
      ? await api.productos(shopParams(route, query))
      : await api.producto(route.id)
    return { status: 200, data }
  } catch (error) {
    return { status: error.status === 404 ? 404 : 503, data: null }
  }
}
