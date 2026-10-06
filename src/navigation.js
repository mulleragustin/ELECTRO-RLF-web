import { createContext, useContext } from 'react'

// { location, route, navigate(href, { replace }) } — lo provee App.
export const NavigationContext = createContext(null)

export function useNavigation() {
  return useContext(NavigationContext)
}

function isPlainLeftClick(event) {
  return event.button === 0 && !event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey
}

// Links internos que la app resuelve sin recargar la página.
export function isAppLink(event, anchor) {
  if (event.defaultPrevented || !isPlainLeftClick(event)) return false
  if (!anchor || anchor.hasAttribute('download')) return false
  if (anchor.target && anchor.target !== '_self') return false
  const url = new URL(anchor.href, window.location.href)
  if (url.origin !== window.location.origin) return false
  // Archivos, fotos, API y sitemaps los sirve el servidor directamente.
  return !/^\/(api|media|assets)\//.test(url.pathname) && !/\.[a-z0-9]+$/i.test(url.pathname)
}
