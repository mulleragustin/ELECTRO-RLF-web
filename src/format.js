// Formato argentino a mano ($ 1.357,95): Intl puede dar espacios distintos en
// Node y en el navegador, y eso rompe la hidratación.
export function formatPrecio(precio) {
  const [entero, decimales] = Number(precio).toFixed(2).split('.')
  const miles = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return decimales === '00' ? `$ ${miles}` : `$ ${miles},${decimales}`
}

const UNIDADES_SINGULAR = {
  m: 'metro',
  cm: 'centímetro',
  m2: 'metro cuadrado',
  kg: 'kilo',
  g: 'gramo',
  l: 'litro',
  ml: 'mililitro',
}

// "metro", "kilo"…; null para productos que se venden por unidad.
export function unidadSingular(unidad) {
  return UNIDADES_SINGULAR[unidad] || null
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
