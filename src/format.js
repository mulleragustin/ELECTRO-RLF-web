const PRECIO = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' })

export function formatPrecio(precio) {
  return PRECIO.format(Number(precio))
}

const UNIDADES_PLURAL = {
  m: 'metros',
  cm: 'centímetros',
  m2: 'metros cuadrados',
  kg: 'kilos',
  g: 'gramos',
  l: 'litros',
  ml: 'mililitros',
}

// "metros", "kilos"…; null para productos que se venden por unidad.
export function unidadPlural(unidad) {
  return UNIDADES_PLURAL[unidad] || null
}

// Ancho y alto de la miniatura (600px de lado mayor) a partir de la foto grande.
export function miniaturaSize(imagen) {
  const ancho = imagen.ancho || 600
  const alto = imagen.alto || 600
  const escala = Math.min(600 / Math.max(ancho, alto), 1)
  return { width: Math.round(ancho * escala), height: Math.round(alto * escala) }
}
