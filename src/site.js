const WHATSAPP_NUMBER = '5493624866272'

const WHATSAPP_MSG = encodeURIComponent(
  'Hola! Me gustaria consultar precios y cotizar mi pedido.',
)

export function whatsappLink(msg = WHATSAPP_MSG) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

export const SITE = {
  name: 'ELECTRO RLF',
  baseUrl: 'https://electrorlf.com',
  tagline: 'Ferretería eléctrica & servicios',
  description:
    'Venta de materiales eléctricos, ferretería eléctrica y servicios residenciales en Resistencia, Chaco.',
  whatsapp: '3624866272',
  whatsappFull: '+5493624866272',
  email: 'ventas@electrorlf.com',
  instagram: 'https://www.instagram.com/electrorlf',
  instagramHandle: '@ELECTRORLF',
  facebook: 'https://www.facebook.com/electroRLF',
  branches: ['Hipólito Yrigoyen 715', 'Juan Ramón Lestani 649'],
  locations: [
    {
      name: 'Sede Hipólito Yrigoyen',
      streetAddress: 'Hipólito Yrigoyen 715',
      addressLocality: 'Resistencia',
      addressRegion: 'Chaco',
      addressCountry: 'AR',
    },
    {
      name: 'Sede Juan Ramón Lestani',
      streetAddress: 'Juan Ramón Lestani 649',
      addressLocality: 'Resistencia',
      addressRegion: 'Chaco',
      addressCountry: 'AR',
    },
  ],
}
