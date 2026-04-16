import { createElement } from 'react'
import {
  Package,
  MessageSquare,
  CircleCheck,
  ShieldCheck,
} from 'lucide-react'
import { whatsappLink } from '../site'
import Button from './ui/Button'
import SectionLabel from './ui/SectionLabel'
import SectionTitle from './ui/SectionTitle'
import ImageSkeleton from './ui/ImageSkeleton'

const HERO_IMAGE = '/assets/seo/negocio-electro-rlf-resistencia-chaco.jpg'
const DETAIL_IMAGE =
  '/assets/seo/materiales-electricos-electro-rlf-resistencia.jpg'
const MULTIMETER_IMAGE =
  '/assets/seo/medicion-electrica-multimetro-electro-rlf.jpg'
const ROOM_IMAGE =
  '/assets/seo/instalacion-electrica-residencial-resistencia.jpg'

const ABOUT_CTA_MESSAGE = encodeURIComponent(
  'Hola! Quiero consultar por un proyecto o una urgencia electrica.',
)

const PHILOSOPHY_CARDS = [
  {
    title: 'Evaluación ágil',
    description:
      'Diagnóstico rápido para determinar la mejor solución técnica y económica para tu necesidad habitacional.',
    icon: CircleCheck,
  },
  {
    title: 'Suministro directo',
    description:
      'Eliminamos intermediarios. Contamos con stock propio de materiales certificados para asegurar la calidad.',
    icon: Package,
  },
  {
    title: 'Ejecución segura',
    description:
      'Protocolos de seguridad rigurosos y acabados limpios que respetan la estética y funcionalidad de tu hogar.',
    icon: ShieldCheck,
  },
]

const DIFFERENCES = [
  {
    title: 'Enfoque 100% residencial',
    description:
      'Entendemos las necesidades específicas de los particulares y las viviendas. Trabajamos con discreción y limpieza.',
  },
  {
    title: 'Asesoramiento técnico personalizado',
    description:
      'Es nuestro gran diferencial. No solo te vendemos un producto, te explicamos cómo usarlo y cuál es la mejor alternativa para tu instalación.',
  },
  {
    title: 'Eficiencia garantizada',
    description:
      'Destacamos por nuestros precios competitivos y una velocidad de respuesta inigualable en el rubro.',
  },
]

export default function AboutPage() {
  return (
    <main className="bg-black">
      <section className="relative overflow-hidden border-b border-[#4a47321a] bg-rlf-hero-right pb-16 pt-14 md:pb-16 md:pt-16 lg:pb-14 lg:pt-16 xl:pb-12">
        <div className="pointer-events-none absolute inset-0 bg-rlf-noise opacity-[0.07]" />
        <div className="container-section relative z-10">
          <div className="grid gap-10 md:grid-cols-[1fr_340px] md:items-start md:gap-10 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_560px] xl:gap-16">
            <div className="flex flex-col gap-[31px]">
              <SectionLabel>
                sobre nosotros
              </SectionLabel>

              <h1 className="max-w-[683px] text-[40px] font-extrabold leading-[1.1] tracking-[-1.6px] text-white md:text-[64px] md:tracking-[-2px] xl:text-[88px] xl:tracking-[-2.4px]">
                <span className="block">Tu aliado</span>
                <span className="block">en cada</span>
                <span className="block italic text-[#fff212]">proyecto</span>
              </h1>

              <div className="max-w-[576px] space-y-6 text-[18px] font-medium leading-[1.55] text-[#ccc7ab] md:text-[20px] md:leading-[32.5px]">
                <p>
                  En ELECTRO RLF nacimos con un objetivo claro: hacer que las
                  soluciones eléctricas para casas y departamentos sean
                  accesibles, rápidas y seguras. Sabemos que cuando necesitás
                  un repuesto, venta de materiales eléctricos o una reparación, el tiempo y el presupuesto son
                  claves. Trabajamos en toda la zona sur y centro.
                </p>

                <div className="border-l-2 border-[#fff212] bg-white/5 py-2 pl-[26px] text-[14px] leading-5 text-[#ccc7ab]">
                  <p>
                    A diferencia de las ferreterías tradicionales, nosotros te
                    ofrecemos un servicio integral: somos tanto tu proveedor de
                    materiales e insumos de primera calidad, como tus
                    instaladores de confianza.
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <div className="h-px w-16 bg-[#fff21266]" />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[400px] md:mx-0 md:max-w-none">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#4a47324d] bg-[#131313] md:aspect-auto">
                <ImageSkeleton
                  src={HERO_IMAGE}
                  alt="Negocio Electro RLF con materiales eléctricos y atención personalizada en Resistencia Chaco"
                  priority={true}
                  width={1100}
                  height={1383}
                  sizes="(min-width: 1280px) 536px, (min-width: 768px) 400px, 100vw"
                  className="h-full w-full object-cover md:h-[540px] lg:h-[620px] xl:h-[718px]"
                />
              </div>

              <div className="absolute bottom-[-16px] left-[-12px] max-w-[240px] rounded-2xl border border-[#fff21233] bg-[#131313]/90 px-5 py-5 text-[#fff212] shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-md md:bottom-[-24px] md:left-[-24px] md:px-6 md:py-6">
                <p className="text-[14px] font-bold uppercase leading-[1.25] tracking-[-0.04em]">
                  El mejor lugar para
                </p>
                <p className="text-[14px] font-bold uppercase leading-[1.25] tracking-[-0.04em]">
                  tus servicios
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[#4a47321a] bg-rlf-grid py-20 md:py-28 lg:py-[120px]">
        <div className="section-cutline" />
        <div className="pointer-events-none absolute inset-0 bg-rlf-grid-fade" />
        <div className="container-section relative z-10 flex flex-col gap-16 lg:gap-20 xl:gap-[80px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-[576px]">
              <p className="text-[48px] font-extrabold leading-none tracking-[-2.4px] text-[#fff212]">
                01 /
              </p>
              <SectionTitle className="mt-2 max-w-[680px]">
                Nuestra filosofía de trabajo
              </SectionTitle>
              <p className="mt-4 text-[16px] leading-6 text-[#ccc7ab]">
                Queremos que tu experiencia sea mucho más moderna y
                actualizada. Por eso, simplificamos todo el proceso. Olvidate
                de hacer filas largas o esperar días por un presupuesto.
              </p>
            </div>

            <div className="inline-flex items-center gap-4 rounded-xl border border-[#4a473233] bg-[#1b1b1b] px-[25px] py-[25px] text-[12px] font-bold uppercase tracking-[0.1em] text-[#ccc7ab] md:shrink-0">
              <span className="size-2 rounded-full bg-[#fff212]" />
              Nuestro sistema es ágil: escribís, cotizamos, avanzamos.
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-[389px_389px_390px] xl:justify-between">
            {PHILOSOPHY_CARDS.map((card) => (
              <PhilosophyCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-rlf-wash-left py-20 md:py-28 lg:py-[120px]">
        <div className="section-cutline" />
        <div className="container-section relative z-10">
          <div className="grid gap-16 md:grid-cols-[1fr_1fr] md:items-start md:gap-10 lg:gap-14 xl:grid-cols-[568px_568px] xl:justify-between xl:gap-20">
            <div>
              <p className="text-[32px] font-extrabold leading-none tracking-[-1px] text-[#fff212] md:text-[48px] md:tracking-[-2.4px]">
                02 /
              </p>
              <SectionTitle className="mt-4 max-w-[680px] md:mt-2">
                &iquest;Qué nos hace diferentes?
              </SectionTitle>

              <div className="mt-10 space-y-10">
                {DIFFERENCES.map((item) => (
                  <div key={item.title} className="relative pl-8">
                    <span className="absolute inset-y-0 left-0 w-1 bg-[#fff212]" />
                    <h3 className="text-[18px] font-bold leading-7 text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[22.75px] text-[#ccc7ab]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:min-h-[660px] xl:grid-cols-[276px_276px]">
              <div className="flex flex-col gap-4 md:pt-10 xl:pt-16">
                <div className="overflow-hidden rounded-xl border border-[#4a473233] bg-[#1b1b1b]">
                  <img
                    src={DETAIL_IMAGE}
                    alt="Herramientas e insumos eléctricos disponibles en Electro RLF Resistencia"
                    width={650}
                    height={655}
                    loading="lazy"
                    decoding="async"
                    className="h-[274px] w-full object-cover grayscale"
                  />
                </div>

                <div className="rounded-xl border border-[#fff21233] bg-[#fff2120d] px-[33px] py-[76px]">
                  <p className="text-[30px] font-extrabold text-[#fff212]">
                    Personal
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#fff212]">
                    capacitado
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-xl border border-[#4a473233] bg-[#1b1b1b]">
                  <img
                    src={MULTIMETER_IMAGE}
                    alt="Medición eléctrica profesional con multímetro para instalaciones residenciales"
                    width={650}
                    height={808}
                    loading="lazy"
                    decoding="async"
                    className="h-[366px] w-full object-cover grayscale"
                  />
                </div>

                <div className="overflow-hidden rounded-xl border border-[#4a473233] bg-[#1b1b1b]">
                  <img
                    src={ROOM_IMAGE}
                    alt="Instalación eléctrica residencial en Resistencia Chaco"
                    width={650}
                    height={655}
                    loading="lazy"
                    decoding="async"
                    className="h-[274px] w-full object-cover grayscale"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-rlf-panel py-20 md:py-28 lg:py-[120px]">
        <div className="section-top-wash" />
        <div className="section-cutline" />
        <div className="container-section relative z-10">
          <div className="mx-auto max-w-[1024px] rounded-2xl border border-[#4a47324d] bg-[#131313] px-6 py-12 text-center md:px-12 md:py-20 lg:p-[81px]">
            <h2 className="mx-auto max-w-[780px] text-[32px] font-extrabold leading-[1.1] tracking-[-1.2px] text-white md:text-[48px] md:tracking-[-2px] xl:text-[56px] xl:tracking-[-2.6px]">
              <span className="block">&iquest;Tenés una urgencia o un</span>
              <span className="block">proyecto en mente?</span>
            </h2>

            <p className="mx-auto mt-6 max-w-[672px] text-[16px] leading-[1.6] text-[#ccc7ab] lg:text-[18px]">
              Escribinos al WhatsApp y resolvamos tu problema hoy mismo con el
              respaldo de profesionales certificados.
            </p>

            <Button
              href={whatsappLink(ABOUT_CTA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              shadow={true}
              className="mt-10"
            >
              <MessageSquare className="size-5" />
              Contacto por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function PhilosophyCard({ title, description, icon }) {
  return (
    <article className="rounded-2xl border border-[#4a47321a] bg-[#1b1b1b] p-8 md:min-h-[238px] lg:p-10">
      <div className="flex size-14 items-center justify-center rounded-xl bg-black text-[#fff212]">
        {createElement(icon, { className: 'size-[22px]' })}
      </div>

      <h3 className="mt-6 text-[18px] font-bold leading-7 text-white">
        {title}
      </h3>

      <p className="mt-4 text-[14px] leading-[1.625] text-[#ccc7ab]">
        {description}
      </p>
    </article>
  )
}
