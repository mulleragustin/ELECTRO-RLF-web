const WHATSAPP_NUMBER = '5493624866272'

const WHATSAPP_MSG = encodeURIComponent(
  'Hola! Me gustaria consultar precios y cotizar mi pedido.',
)

export function whatsappLink(msg = WHATSAPP_MSG) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

// Igual que whatsappLink pero recibe el texto sin codificar.
export function whatsappText(text) {
  return whatsappLink(encodeURIComponent(text))
}

export const SITE = {
  name: 'ELECTRO RLF',
  baseUrl: 'https://electrorlf.com.ar',
  tagline: 'Ferretería y electricidad',
  description:
    'Ferretería y electricidad en Resistencia, Chaco: materiales eléctricos, plomería, herramientas y servicios residenciales.',
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
