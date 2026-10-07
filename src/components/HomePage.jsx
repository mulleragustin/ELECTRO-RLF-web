import { createElement, useRef } from "react";
import {
  ArrowRight,
  ShoppingCart,
  MessageSquare,
  CircleCheck,
  Zap,
  ShieldCheck,
  Grid2x2Plus,
  Lightbulb,
  UserCog,
  Wallet,
  Wrench,
} from "lucide-react";
import { whatsappLink } from "../site";
import Button from "./ui/Button";
import SectionLabel from "./ui/SectionLabel";
import SectionTitle from "./ui/SectionTitle";
import ImageSkeleton from "./ui/ImageSkeleton";
import useScrollAnimations from "../hooks/useScrollAnimations";
import FeaturedProducts from "./shop/FeaturedProducts";

const HERO_IMAGE = "/assets/seo/ferreteria-electrica-resistencia-electro-rlf.jpg";
const MATERIALS_IMAGE = "/assets/seo/kit-herramientas-insumos-electricos-electro-rlf.jpg";

const HOME_CTA_MESSAGE = encodeURIComponent(
  "Hola! Quiero cotizar materiales o una instalacion para mi casa.",
);

const SMALL_SERVICE_CARDS = [
  {
    title: "Armado de tableros",
    description: "Expertos en tableros eléctricos principales y seccionales para el hogar.",
    icon: Grid2x2Plus,
  },
  {
    title: "Iluminación",
    description: "Especialistas en iluminación técnica y LED para ambientes modernos.",
    icon: Lightbulb,
  },
  {
    title: "Ferretería general",
    description: "Herramientas, pinturas e insumos esenciales para tus arreglos.",
    icon: Wrench,
    watermark: "+500",
  },
];

const DIFFERENTIALS = [
  {
    title: ["Precios sin", "competencia"],
    description:
      "Cuidamos tu bolsillo con los materiales más accesibles del mercado. Directo de fábrica.",
    icon: Wallet,
  },
  {
    title: ["Velocidad que", "sorprende"],
    description: "Entregas y respuestas rápidas porque sabemos que tus arreglos no pueden esperar.",
    icon: Zap,
  },
  {
    title: ["Proceso 100% simple"],
    description:
      "Nos escribís, cotizamos online y avanzamos. Sin vueltas técnicas ni complicaciones.",
    icon: CircleCheck,
  },
];

const MARQUEE_BRANDS = [
  { name: "Sica", src: "/MARCAS/sica.svg" },
  { name: "Lusqtoff", src: "/MARCAS/lusqtoff.svg" },
  { name: "Klaukol", src: "/MARCAS/klaukol.svg" },
  { name: "Weber", src: "/MARCAS/weber.svg" },
  { name: "Lessa", src: "/MARCAS/lessa.svg" },
  { name: "Jeluz", src: "/MARCAS/jeluz.svg" },
  { name: "Sekur", src: "/MARCAS/sekur.svg" },
  { name: "Prive", src: "/MARCAS/prive.svg" },
];

export default function HomePage({ destacados = [] }) {
  const mainRef = useRef(null);
  useScrollAnimations(mainRef);

  return (
    <main ref={mainRef} className="bg-black">
      {/* ── Hero ── */}
      <section
        id="inicio"
        className="relative overflow-hidden border-b border-[#4a47321a] bg-rlf-hero-left pb-16 pt-14 md:pb-16 md:pt-16 lg:pb-14 lg:pt-16 xl:pb-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-rlf-noise opacity-[0.07]" />
        <div className="container-section relative z-10">
          <div className="grid gap-10 md:grid-cols-[1fr_340px] md:items-start md:gap-10 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_560px] xl:gap-16">
            <div className="flex flex-col gap-[31px]">
              <div data-animate="hero">
                <SectionLabel>Electricidad · Hogar · Construcción</SectionLabel>
              </div>

              <h1
                data-animate="hero"
                className="max-w-[683px] text-[40px] font-extrabold leading-[1.1] tracking-[-1.6px] text-white md:text-[64px] md:tracking-[-2px] xl:text-[88px] xl:tracking-[-2.4px]"
              >
                <span className="block">
                  Tu ferreteria de <span className="italic text-[#fff212]">confianza</span>.
                </span>
              </h1>

              <div
                data-animate="hero"
                className="max-w-[576px] text-[18px] font-medium leading-[1.55] text-[#e2e2e2cc] md:text-[20px] md:leading-[32.5px]"
              >
                <p>Materiales eléctricos, herramientas y productos</p>
                <p>para el hogar y la construcción. Todo en un solo</p>
                <p>lugar, en Resistencia, Chaco.</p>
              </div>

              <div data-animate="hero">
                <Button
                  href={whatsappLink(HOME_CTA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="size-5" />
                  Contacto por WhatsApp
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] md:mx-0 md:ml-auto md:h-[460px] lg:h-[500px] xl:h-[520px]">
              <div
                data-animate="hero-image"
                className="mx-auto w-full max-w-[320px] md:absolute md:right-0 md:top-0 md:mx-0 md:max-w-none"
              >
                <div className="aspect-square w-full overflow-hidden rounded-lg border border-[#fff21233] bg-[#131313] md:size-[340px] lg:size-[390px] xl:size-[430px]">
                  <ImageSkeleton
                    src={HERO_IMAGE}
                    alt="Ferretería y electricidad Electro RLF en Resistencia, Chaco, con materiales y atención en el local"
                    priority={true}
                    width={1000}
                    height={1082}
                    sizes="(min-width: 1280px) 430px, (min-width: 1024px) 390px, (min-width: 768px) 340px, 320px"
                    wrapperClassName="h-full rounded-lg"
                    className="object-cover object-center"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </ImageSkeleton>
                </div>
              </div>

              <div
                data-animate="hero-card"
                className="relative z-20 mt-6 max-w-[260px] rounded-lg border border-[#fff21233] bg-[#131313]/90 p-7 text-white shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-md md:absolute md:bottom-0 md:left-[72px] md:mt-0 md:p-9 lg:left-[96px] xl:left-[118px]"
              >
                <div className="flex items-center gap-3 text-[14px] font-extrabold uppercase tracking-[-0.05em] text-[#fff212]">
                  <ShieldCheck className="size-5" />
                  <span>Marcas líderes del mercado</span>
                </div>
                <p className="mt-3 text-[13px] font-medium leading-[1.4] text-[#ccc7ab]">
                  Sica, Klaukol, Sekur y más. Calidad garantizada en cada producto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand marquee ── */}
      <section
        data-animate="fade-up"
        className="overflow-hidden border-y border-[#fff21226] bg-rlf-brand-strip py-4 md:py-5"
      >
        <div className="relative flex">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#080808] to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#080808] to-transparent md:w-32" />

          <div className="animate-marquee flex w-max items-center gap-6 pl-6 md:gap-10 md:pl-10">
            {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex h-14 w-[148px] shrink-0 items-center justify-center md:h-16 md:w-[176px]"
              >
                <img
                  src={brand.src}
                  alt={`Logo ${brand.name}`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-9 max-w-full object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 md:max-h-11"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Productos destacados (se eligen desde la gestión) ── */}
      <FeaturedProducts productos={destacados} />

      {/* ── Services ── */}
      <section
        id="servicios"
        className="relative overflow-hidden bg-rlf-wash-right py-20 md:py-28 lg:py-32"
      >
        <div className="section-cutline" />
        <div className="container-section relative z-10 flex flex-col gap-24">
          <header data-animate="title">
            <SectionTitle className="max-w-[1216px]">Todo lo que tu casa necesita</SectionTitle>
          </header>

          <div className="grid gap-6 md:grid-cols-[1.85fr_1fr] md:items-stretch xl:grid-cols-[792px_400px] xl:justify-between">
            <article
              data-animate="fade-right"
              className="rounded-2xl border border-[#fff21226] bg-[#131313] p-8 md:min-h-[420px] lg:p-12"
            >
              <div className="max-w-[448px]">
                <UserCog className="size-10 text-[#fff212]" />

                <h3 className="mt-8 text-[30px] font-extrabold leading-[36px] tracking-[-0.75px] text-white">
                  <span className="block">Electricista a</span>
                  <span className="block">domicilio y</span>
                  <span className="block">mantenimiento</span>
                </h3>

                <p className="mt-6 text-[18px] font-medium leading-7 text-[#e2e2e2b3]">
                  Instalaciones eléctricas zona sur / centro. Electricista residencial rápido
                  Resistencia. Pedí presupuesto de instalación eléctrica casa y mantenimiento
                  preventivo eléctrico precios.
                </p>

                <a
                  href={whatsappLink(HOME_CTA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-4 border-b-2 border-[#fff2124d] pb-1 text-[14px] font-extrabold uppercase tracking-[0.1em] text-[#fff212]"
                >
                  Consultar servicio
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </article>

            <article
              id="productos"
              data-animate="fade-left"
              className="flex scroll-mt-24 flex-col justify-between overflow-hidden rounded-2xl border border-[#fff21226] bg-[#131313] p-8 text-white md:min-h-[420px] lg:p-12"
            >
              <div>
                <ShoppingCart className="size-10 text-[#fff212]" />
                <h3 className="mt-6 text-[24px] font-extrabold leading-[30px] text-white">
                  Kits a medida
                </h3>
                <p className="mt-4 text-[14px] font-medium leading-[1.6] text-[#ccc7ab]">
                  Armamos tu kit de herramientas e insumos eléctricos según tu proyecto. Coordiná la
                  compra y retiralo por la sede más cerca.
                </p>
              </div>

              <div className="mt-8 overflow-hidden rounded-lg bg-white md:h-[224px]">
                <img
                  src={MATERIALS_IMAGE}
                  alt="Kit de herramientas e insumos eléctricos a medida en Electro RLF Resistencia"
                  width={900}
                  height={707}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  data-animate="parallax"
                />
              </div>
            </article>
          </div>

          <div
            data-animate="stagger-up"
            className="grid gap-6 md:grid-cols-3 xl:grid-cols-[389px_389px_390px] xl:justify-between"
          >
            {SMALL_SERVICE_CARDS.map((card) => (
              <ServiceMiniCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Differentials ── */}
      <section className="relative overflow-hidden bg-rlf-grid py-20 md:py-28 lg:py-32">
        <div className="section-cutline" />
        <div className="pointer-events-none absolute inset-0 bg-rlf-grid-fade" />
        <div className="container-section relative z-10 flex flex-col gap-24">
          <header data-animate="title" className="text-center">
            <SectionTitle>&iquest;Por qu&eacute; nos eligen?</SectionTitle>
          </header>

          <div
            data-animate="scale-in"
            className="overflow-hidden rounded-2xl border border-[#4a473233] bg-[#4a473233] p-px"
          >
            <div
              data-animate="stagger-up"
              className="grid gap-px md:grid-cols-3 xl:grid-cols-[405px_405px_404px] xl:justify-between"
            >
              {DIFFERENTIALS.map((item) => (
                <DifferentialCard key={item.title.join(" ")} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceMiniCard({ title, description, icon, watermark }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#fff21226] bg-[#131313] p-8 md:min-h-[210px] lg:p-10">
      {watermark ? (
        <span className="pointer-events-none absolute bottom-[-16px] right-[-16px] text-[96px] font-extrabold leading-none text-[#fff2121a]">
          {watermark}
        </span>
      ) : null}

      {createElement(icon, { className: "size-7 text-[#fff212]" })}

      <h3 className="mt-6 text-[20px] font-extrabold leading-7 text-white">{title}</h3>

      <p className="mt-4 text-[14px] font-medium leading-5 text-[#e2e2e299]">{description}</p>
    </article>
  );
}

function DifferentialCard({ title, description, icon }) {
  return (
    <article className="bg-[#131313] px-6 py-10 text-center md:min-h-[382px] md:px-12 md:py-16">
      <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#fff2121a] text-[#fff212]">
        {createElement(icon, { className: "size-8" })}
      </div>

      <h3 className="mt-10 text-[24px] font-extrabold leading-8 text-white">
        {title.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>

      <p className="mx-auto mt-6 max-w-[290px] text-[16px] font-medium leading-[26px] text-[#e2e2e2b3]">
        {description}
      </p>
    </article>
  );
}
