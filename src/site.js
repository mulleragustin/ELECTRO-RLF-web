const WHATSAPP_NUMBER = '5493624866272'

const WHATSAPP_MSG = encodeURIComponent(
  'Hola! Me gustaria consultar precios y cotizar mi pedido.',
)

export function whatsappLink(msg = WHATSAPP_MSG) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

export const SITE = {
  name: 'ELECTRO RLF',
  tagline: 'Ferreteria Electrica & Servicios',
  whatsapp: '3624866272',
  instagram: 'https://www.instagram.com/electrorlf',
  instagramHandle: '@ELECTRORLF',
  facebook: 'https://www.facebook.com/ferreteria.electro.rlf',
  branches: ['Hipólito Yrigoyen 715 - Juan Ramón Lestani 649'],
}
