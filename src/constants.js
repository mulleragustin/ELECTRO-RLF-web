const WHATSAPP_NUMBER = '5493624866272'
const WHATSAPP_MSG = encodeURIComponent('Hola! Me gustaría consultar precios y cotizar mi pedido.')

export function whatsappLink(msg = WHATSAPP_MSG) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

export const SITE = {
  name: 'ELECTRO RLF',
  tagline: 'Ferretería Eléctrica & Servicios',
  whatsapp: '3624866272',
  instagram: 'https://www.instagram.com/electrorlf',
  facebook: 'https://www.facebook.com/electroRLF',
  branches: [
    'Hipólito Yrigoyen 715',
    'Juan Ramón Lestani 649',
  ],
}
