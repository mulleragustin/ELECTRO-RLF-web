// Carrito guardado en localStorage. Mientras no haya precios funciona como
// pedido de cotización: se envía por WhatsApp.
import { useSyncExternalStore } from 'react'
import { SITE } from './site'

const STORAGE_KEY = 'rlf-carrito'
const MAX_CANTIDAD = 999
const EMPTY = []

let items = EMPTY
let loaded = false
const listeners = new Set()

function read() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed)
      ? parsed.filter((item) => item && item.id && item.titulo && item.cantidad > 0)
      : EMPTY
  } catch {
    return EMPTY
  }
}

function emit() {
  listeners.forEach((listener) => listener())
}

function commit(next) {
  items = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Modo privado o sin espacio: el carrito vive solo en esta pestaña.
  }
  emit()
}

function handleStorage(event) {
  if (event.key === STORAGE_KEY) {
    items = read()
    emit()
  }
}

function subscribe(listener) {
  if (listeners.size === 0) window.addEventListener('storage', handleStorage)
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener('storage', handleStorage)
  }
}

function getSnapshot() {
  if (!loaded) {
    items = read()
    loaded = true
  }
  return items
}

// En el servidor y durante la hidratación el carrito está vacío; después de
// hidratar React vuelve a renderizar con lo guardado (sin errores de hidratación).
export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)
}

const noopSubscribe = () => () => {}
export function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false)
}

function clamp(cantidad) {
  return Math.min(Math.max(Math.round(Number(cantidad) || 1), 1), MAX_CANTIDAD)
}

export function addToCart(producto, cantidad = 1) {
  const current = getSnapshot()
  const existing = current.find((item) => item.id === producto.id)
  const entry = {
    id: producto.id,
    titulo: producto.titulo,
    codigo: producto.codigo,
    path: producto.path,
    unidad: producto.unidad,
    imagen: producto.imagen?.miniatura || null,
    cantidad: clamp((existing?.cantidad || 0) + cantidad),
  }
  commit(existing
    ? current.map((item) => (item.id === producto.id ? entry : item))
    : [...current, entry])
}

export function setCantidad(id, cantidad) {
  commit(getSnapshot().map((item) => (item.id === id ? { ...item, cantidad: clamp(cantidad) } : item)))
}

export function removeFromCart(id) {
  commit(getSnapshot().filter((item) => item.id !== id))
}

export function clearCart() {
  commit(EMPTY)
}

export function formatCantidad(cantidad, unidad) {
  return unidad && unidad !== 'u' ? `${cantidad} ${unidad}` : `${cantidad}`
}

export function pedidoWhatsAppText(lista, { nombre = '', sede = '', comentarios = '' } = {}) {
  const lineas = [
    'Hola! Quiero consultar precio y disponibilidad de este pedido:',
    '',
    ...lista.map((item) => `• ${formatCantidad(item.cantidad, item.unidad)} × ${item.titulo} (cód. ${item.codigo})`),
    '',
  ]
  if (sede) lineas.push(`Retiro en: ${sede}`)
  if (nombre.trim()) lineas.push(`Nombre: ${nombre.trim()}`)
  if (comentarios.trim()) lineas.push(`Comentarios: ${comentarios.trim()}`)
  return lineas.join('\n').trim()
}

export function productoWhatsAppText(producto) {
  return [
    'Hola! Quiero consultar por este producto:',
    `${producto.titulo} (cód. ${producto.codigo})`,
    `${SITE.baseUrl}${producto.path}`,
  ].join('\n')
}
