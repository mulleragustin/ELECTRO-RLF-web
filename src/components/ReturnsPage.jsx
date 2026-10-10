import { SITE, whatsappText } from '../site'
import { WhatsAppIcon } from './icons'

const MENSAJE_ARREPENTIMIENTO = 'Hola! Quiero arrepentirme de una compra. Mi nombre y el pedido son: '
const MENSAJE_CAMBIO = 'Hola! Quiero hacer un cambio o devolución. Mi nombre y el pedido son: '

function Seccion({ id, titulo, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[#4a473240] py-10 md:py-12">
      <h2 className="text-[22px] font-extrabold tracking-[-0.4px] text-white md:text-[26px]">{titulo}</h2>
      <div className="mt-5 space-y-4 text-[16px] font-medium leading-[1.7] text-[#ccc7ab]">{children}</div>
    </section>
  )
}

function Lista({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-[#fff212]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function BotonWhatsApp({ mensaje, children }) {
  return (
    <a
      href={whatsappText(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-lg bg-[#fff212] px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-black transition-all hover:-translate-y-0.5 active:scale-95"
    >
      <WhatsAppIcon className="size-[18px]" aria-hidden="true" />
      {children}
    </a>
  )
}

export default function ReturnsPage() {
  return (
    <main className="bg-black">
      <div className="container-section py-16 md:py-24">
        <div className="max-w-[860px]">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#fff212]">Ayuda</p>
        <h1 className="mt-5 text-[36px] font-extrabold uppercase leading-[1.05] tracking-[-1.2px] text-white md:text-[56px]">
          Cambios y devoluciones
        </h1>
        <p className="mt-6 max-w-[640px] text-[17px] font-medium leading-[1.6] text-[#ccc7ab]">
          Si el producto no era lo que esperabas o llegó con una falla, lo resolvemos. Estas condiciones
          valen para las compras hechas en {SITE.name}, por la web, por WhatsApp o en nuestras sedes de
          Resistencia, Chaco.
        </p>

        <div className="mt-12">
          <Seccion id="arrepentimiento" titulo="Arrepentimiento de compra">
            <p>
              Si compraste por la web o por WhatsApp y recibiste el pedido en tu domicilio, podés
              arrepentirte de la compra dentro de los <strong className="text-white">10 días corridos</strong>{' '}
              desde que lo recibiste, sin dar explicaciones y sin ningún costo (Ley 24.240 de Defensa del
              Consumidor, art. 34).
            </p>
            <p>
              El producto tiene que volver sin uso, en las mismas condiciones en que lo recibiste y con su
              embalaje. Te devolvemos lo que pagaste por el mismo medio de pago.
            </p>
            <p>
              No aplica a productos hechos o cortados a tu medida, como cables, caños o cadenas por metro.
            </p>
            <BotonWhatsApp mensaje={MENSAJE_ARREPENTIMIENTO}>Botón de arrepentimiento</BotonWhatsApp>
          </Seccion>

          <Seccion id="cambios" titulo="Cambios">
            <p>
              Cambiamos productos dentro de los <strong className="text-white">10 días corridos</strong> desde
              la compra o la entrega, por otro producto o por otra medida o modelo.
            </p>
            <Lista
              items={[
                'El producto tiene que estar sin uso y con su embalaje original.',
                'Traé o envianos el comprobante de compra.',
                'Si hay diferencia de precio, se abona o se reintegra al momento del cambio.',
                'Los productos cortados a medida no tienen cambio, salvo que tengan una falla.',
              ]}
            />
          </Seccion>

          <Seccion id="fallas" titulo="Productos con fallas y garantía">
            <p>
              Todos los productos nuevos tienen la garantía legal de{' '}
              <strong className="text-white">6 meses</strong> por defectos de fabricación, además de la
              garantía que ofrezca cada fabricante.
            </p>
            <p>
              Si el producto llegó dañado o falla, avisanos apenas lo notes: lo revisamos y lo cambiamos por
              uno igual, lo reparamos por garantía o te devolvemos el dinero. En estos casos el traslado
              corre por nuestra cuenta.
            </p>
            <p>La garantía no cubre daños por mal uso, golpes o instalaciones incorrectas.</p>
          </Seccion>

          <Seccion id="como" titulo="Cómo pedir un cambio o una devolución">
            <Lista
              items={[
                `Escribinos por WhatsApp al ${SITE.whatsappFull} o por mail a ${SITE.email}, con tu nombre y el detalle del pedido.`,
                `También podés acercarte con el producto y el comprobante a cualquiera de nuestras sedes: ${SITE.branches.join(' o ')}, Resistencia, Chaco.`,
                'Coordinamos con vos el cambio, el retiro o la devolución del dinero.',
              ]}
            />
            <BotonWhatsApp mensaje={MENSAJE_CAMBIO}>Escribir por WhatsApp</BotonWhatsApp>
          </Seccion>
        </div>
        </div>
      </div>
    </main>
  )
}
