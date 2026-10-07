// Palabras clave del rubro para <meta name="keywords"> (todas las páginas).
// Google no usa esta etiqueta para posicionar; sí la leen otros buscadores.
// Lo que más pesa en Google son títulos, descripciones y el texto visible.

const NEGOCIO = [
  'ferretería', 'electricidad', 'ferretería y electricidad', 'ferretería y electricidad en Resistencia',
  'casa de electricidad', 'materiales eléctricos',
  'artículos eléctricos', 'plomería', 'sanitarios', 'herramientas', 'ferretería en Resistencia',
  'ferretería Resistencia Chaco', 'casa de electricidad en Resistencia', 'materiales eléctricos Resistencia',
  'plomería Resistencia', 'sanitarios Resistencia', 'herramientas Resistencia', 'ferretería Chaco',
  'ferretería Gran Resistencia', 'ferretería Barranqueras', 'ferretería Fontana', 'ferretería Puerto Vilelas',
  'ferretería cerca', 'ferretería online', 'tienda online de ferretería', 'comprar materiales eléctricos online',
  'electricista a domicilio en Resistencia', 'armado de tableros eléctricos', 'instalación eléctrica domiciliaria',
  'Electro RLF', 'ElectroRLF',
]

const ELECTRICIDAD = [
  'electricidad', 'cables eléctricos', 'cable unipolar', 'cable taller', 'cable subterráneo', 'cable de cobre',
  'conductores eléctricos', 'térmicas', 'llave térmica', 'interruptor termomagnético', 'disyuntor',
  'disyuntor diferencial', 'protector de tensión', 'tablero eléctrico', 'caja de térmicas', 'gabinete estanco',
  'caja de luz', 'caja rectangular', 'caja octogonal', 'tomacorriente', 'enchufe', 'ficha macho', 'ficha hembra',
  'interruptor de luz', 'llave de luz', 'módulos y tapas', 'bastidor', 'alargue', 'prolongador',
  'zapatilla eléctrica', 'adaptador', 'portalámparas', 'lámparas LED', 'focos LED', 'tubos LED', 'panel LED',
  'reflector LED', 'tira LED', 'plafón', 'aplique', 'iluminación', 'luminarias', 'fotocélula',
  'sensor de movimiento', 'timbre', 'cinta aisladora', 'caño corrugado', 'cablecanal', 'precintos', 'borneras',
  'terminales', 'jabalina', 'puesta a tierra', 'contactor', 'guardamotor', 'buscapolo', 'tester', 'multímetro',
]

const PLOMERIA = [
  'artículos de plomería', 'caños', 'caños de agua', 'termofusión', 'caños PPR', 'caños PVC', 'caño de desagüe',
  'accesorios de termofusión', 'codos', 'tees', 'uniones', 'cuplas', 'niples', 'llave de paso', 'válvulas',
  'canillas', 'grifería', 'flexibles', 'sifón', 'rejillas', 'tapa de inspección', 'tanque de agua',
  'tanque bicapa', 'bomba de agua', 'bomba periférica', 'bomba presurizadora', 'bomba sumergible', 'termotanque',
  'calefón', 'depósito de inodoro', 'mochila de inodoro', 'flotante', 'sopapa', 'cinta de teflón', 'sellador',
  'mangueras', 'riego', 'accesorios de gas', 'regulador de gas', 'flexible de gas',
]

const FERRETERIA = [
  'bulonería', 'bulones', 'tornillos', 'tuercas', 'arandelas', 'tarugos', 'clavos', 'autoperforantes',
  'tirafondos', 'varilla roscada', 'herrajes', 'bisagras', 'cerraduras', 'candados', 'cerrojos', 'picaportes',
  'cadenas', 'alambre', 'adhesivos', 'pegamentos', 'siliconas', 'cemento de contacto', 'lubricantes',
  'escaleras', 'carretillas', 'palas', 'guantes de trabajo', 'elementos de protección personal',
  'indumentaria de seguridad', 'anteojos de seguridad', 'bazar', 'artículos de limpieza',
]

const HERRAMIENTAS = [
  'herramientas manuales', 'herramientas eléctricas', 'taladro', 'taladro percutor', 'atornillador',
  'amoladora', 'sierra circular', 'caladora', 'rotomartillo', 'soldadora', 'compresor', 'hidrolavadora',
  'destornilladores', 'pinzas', 'alicates', 'llaves combinadas', 'llave francesa', 'juego de llaves',
  'martillo', 'serrucho', 'cinta métrica', 'nivel', 'pinza amperométrica', 'discos de corte', 'mechas',
  'set de herramientas', 'caja de herramientas',
]

const PINTURERIA = [
  'pinturería', 'pinturas', 'látex', 'esmalte sintético', 'pintura para techos', 'impermeabilizante',
  'membrana líquida', 'pinceles', 'rodillos', 'enduido', 'fijador', 'aguarrás', 'materiales de construcción',
  'cemento', 'pegamento para cerámicos',
]

const MARCAS = ['Sica', 'Jeluz', 'Lusqtoff', 'Klaukol', 'Weber', 'Lessa', 'Sekur', 'Prive']

// Rubro del sistema → grupo que va primero en sus páginas.
const GRUPO_DEL_RUBRO = {
  electricidad: ELECTRICIDAD,
  'herramientas-electricas': HERRAMIENTAS,
  herramientas: HERRAMIENTAS,
  'herramientas-crossmaster': HERRAMIENTAS,
  maquinarias: HERRAMIENTAS,
  plomeria: PLOMERIA,
  sanitarios: PLOMERIA,
  gas: PLOMERIA,
  mangueras: PLOMERIA,
  ferreteria: FERRETERIA,
  buloneria: FERRETERIA,
  'herrajes-y-seguridad': FERRETERIA,
  'indumentaria-de-seguridad': FERRETERIA,
  'liquidos-y-pegamentos': FERRETERIA,
  bazar: FERRETERIA,
  limpieza: FERRETERIA,
  pintureria: PINTURERIA,
  construccion: PINTURERIA,
  carpinteria: FERRETERIA,
}

const TODAS = [...NEGOCIO, ...ELECTRICIDAD, ...PLOMERIA, ...FERRETERIA, ...HERRAMIENTAS, ...PINTURERIA, ...MARCAS]

function unir(...listas) {
  const vistas = new Set()
  const resultado = []
  for (const palabra of listas.flat()) {
    const limpia = (palabra || '').trim()
    const clave = limpia.toLowerCase()
    if (!limpia || vistas.has(clave)) continue
    vistas.add(clave)
    resultado.push(limpia)
  }
  return resultado.join(', ')
}

function deRubro(rubro) {
  if (!rubro) return []
  return [rubro.nombre, `${rubro.nombre} en Resistencia`, `${rubro.nombre} Chaco`, ...(GRUPO_DEL_RUBRO[rubro.slug] || [])]
}

export function palabrasClave(route, page) {
  const data = page?.status === 200 ? page.data : null
  if (route.name === 'product' && data) {
    const propias = [data.titulo, `${data.titulo} en Resistencia`]
    if (data.marca) propias.push(data.marca, `${data.marca} ${data.rubro.nombre}`)
    return unir(propias, deRubro(data.rubro), TODAS)
  }
  if (route.name === 'shop' && data) {
    return unir(['shop online', 'tienda online', 'comprar online'], deRubro(data.rubro), TODAS)
  }
  return unir(TODAS)
}
