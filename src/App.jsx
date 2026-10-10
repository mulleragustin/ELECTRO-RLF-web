import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AboutPage from './components/AboutPage'
import CartPage from './components/CartPage'
import ReturnsPage from './components/ReturnsPage'
import ErrorPage from './components/ErrorPage'
import HomePage from './components/HomePage'
import NotFoundPage from './components/NotFoundPage'
import ProductPage from './components/ProductPage'
import ShopPage from './components/ShopPage'
import SiteFooter from './components/SiteFooter'
import SiteNavbar from './components/SiteNavbar'
import { WhatsAppIcon } from './components/icons'
import { browserApi } from './api'
import { NavigationContext, isAppLink } from './navigation'
import { loadPageData, locationHref, matchRoute, parseUrl, routeNeedsData } from './router'
import { applySeo, buildSeo } from './seo'
import { whatsappLink } from './site'

// Páginas ya visitadas: volver atrás en el shop es instantáneo.
const PAGE_CACHE_TTL = 60_000
const pageCache = new Map()

function pageKey(location) {
  return `${location.pathname}${location.search}`
}

async function fetchPage(location) {
  const route = matchRoute(location.pathname)
  if (!routeNeedsData(route)) return loadPageData(route, location.query, browserApi)

  const key = pageKey(location)
  const hit = pageCache.get(key)
  if (hit && Date.now() - hit.time < PAGE_CACHE_TTL) return hit.page
  const page = await loadPageData(route, location.query, browserApi)
  if (page.status === 200) pageCache.set(key, { page, time: Date.now() })
  return page
}

function scrollToTarget({ hash, y = 0, smooth = false }) {
  // 'instant' y no 'auto': el html tiene scroll-behavior: smooth y el salto al
  // cambiar de página quedaba a mitad de camino.
  const behavior = smooth ? 'smooth' : 'instant'
  if (hash && hash !== 'inicio') {
    const element = document.getElementById(hash)
    if (element) {
      element.scrollIntoView({ behavior, block: 'start' })
      return
    }
  }
  window.scrollTo({ top: y, behavior })
}

function App({ initialUrl, initialPage }) {
  const [location, setLocation] = useState(() => parseUrl(initialUrl))
  const [page, setPage] = useState(initialPage)
  const [isLoading, setIsLoading] = useState(false)
  const locationRef = useRef(location)
  const requestRef = useRef(0)
  const pendingScroll = useRef(null)
  const seoReady = useRef(false)
  const route = useMemo(() => matchRoute(location.pathname), [location.pathname])

  const commit = useCallback((nextLocation, nextPage, scroll) => {
    locationRef.current = nextLocation
    pendingScroll.current = scroll
    setLocation(nextLocation)
    setPage(nextPage)
    setIsLoading(false)
  }, [])

  const navigate = useCallback(async (href, { replace = false } = {}) => {
    let next = parseUrl(href)
    const current = locationRef.current
    const historyMethod = replace ? 'replaceState' : 'pushState'

    // Misma página, solo cambia el ancla (#servicios, #inicio…).
    if (next.pathname === current.pathname && next.search === current.search) {
      window.history[historyMethod](window.history.state, '', locationHref(next))
      locationRef.current = next
      setLocation(next)
      scrollToTarget({ hash: next.hash, smooth: true })
      return
    }

    window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '')
    const request = ++requestRef.current
    const nextRoute = matchRoute(next.pathname)
    if (routeNeedsData(nextRoute)) setIsLoading(true)
    const nextPage = await fetchPage(next)
    if (request !== requestRef.current) return

    // Producto con un slug viejo: se muestra con la URL canónica.
    if (nextRoute.name === 'product' && nextPage.data?.path && nextPage.data.path !== next.pathname) {
      next = parseUrl(nextPage.data.path)
    }
    window.history[historyMethod]({ scrollY: 0 }, '', locationHref(next))
    commit(next, nextPage, { hash: next.hash })
  }, [commit])

  useEffect(() => {
    const handlePopState = async (event) => {
      const next = parseUrl(window.location.href)
      const current = locationRef.current
      const request = ++requestRef.current
      if (next.pathname === current.pathname && next.search === current.search) {
        locationRef.current = next
        setLocation(next)
        scrollToTarget({ hash: next.hash })
        return
      }
      if (routeNeedsData(matchRoute(next.pathname))) setIsLoading(true)
      const nextPage = await fetchPage(next)
      if (request !== requestRef.current) return
      commit(next, nextPage, { y: event.state?.scrollY ?? 0 })
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [commit])

  // Links internos (<a href="/...">) sin recargar la página.
  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!isAppLink(event, anchor)) return
      event.preventDefault()
      const url = new URL(anchor.href)
      navigate(`${url.pathname}${url.search}${url.hash}`)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [navigate])

  // Al entrar con un ancla (/#servicios) el servidor no la conoce: se resuelve acá.
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (hash) window.requestAnimationFrame(() => scrollToTarget({ hash, smooth: true }))
  }, [])

  useEffect(() => {
    const target = pendingScroll.current
    if (!target) return
    pendingScroll.current = null
    scrollToTarget(target)
  }, [location, page])

  const seo = useMemo(() => buildSeo(route, page), [route, page])
  useEffect(() => {
    // En la primera carga el <head> ya viene armado del servidor.
    if (!seoReady.current) {
      seoReady.current = true
      return
    }
    applySeo(seo)
  }, [seo])

  const navigation = useMemo(() => ({ location, route, navigate }), [location, route, navigate])

  let content
  if (page.status === 404) content = <NotFoundPage />
  else if (page.status >= 500) content = <ErrorPage />
  else if (route.name === 'about') content = <AboutPage />
  else if (route.name === 'shop') content = <ShopPage data={page.data} />
  else if (route.name === 'product') content = <ProductPage producto={page.data} />
  else if (route.name === 'cart') content = <CartPage />
  else if (route.name === 'returns') content = <ReturnsPage />
  else content = <HomePage destacados={page.data?.destacados ?? []} />

  return (
    <NavigationContext.Provider value={navigation}>
      {isLoading ? (
        <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] animate-pulse bg-[#fff212]" />
      ) : null}
      <SiteNavbar />
      <Fragment key={pageKey(location)}>{content}</Fragment>
      <SiteFooter />

      <a
        href={whatsappLink(
          encodeURIComponent('Hola! Necesitaba hacerles una consulta...'),
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacto por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex size-[60px] items-center justify-center rounded-full bg-[#fff212] text-black shadow-[0_4px_14px_rgba(255,242,18,0.4)] transition-transform hover:-translate-y-1 md:size-[68px]"
      >
        <WhatsAppIcon className="size-8" />
      </a>
    </NavigationContext.Provider>
  )
}

export default App
