import { Clock3, MapPin, MessageSquare, ShoppingBag } from 'lucide-react'
import { SITE, whatsappLink } from '../site'

const SHOP_CTA_MESSAGE = encodeURIComponent(
  'Hola! Quiero coordinar una compra en la sede que me quede mas cerca.',
)

export default function ShopPage() {
  return (
    <main className="bg-black">
      <section className="relative overflow-hidden border-b border-[#4a47321a] bg-rlf-shop py-20 md:py-28 lg:py-32">
        <div className="section-cutline" />
        <div className="pointer-events-none absolute inset-0 bg-rlf-shop-fade" />
        <div className="pointer-events-none absolute inset-0 bg-rlf-noise opacity-[0.06]" />

        <div className="container-section relative z-10">
          <div className="inline-flex items-center gap-3 rounded-lg border border-[#fff2124d] bg-[#fff21214] px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#fff212]">
            <ShoppingBag className="size-4" />
            Shop
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch xl:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="max-w-[760px] text-[42px] font-extrabold uppercase leading-[1.05] tracking-[-1.4px] text-white md:text-[68px] md:tracking-[-2px] xl:text-[84px]">
                <span className="block">Shop online</span>
                <span className="block italic text-[#fff212]">
                  pr&oacute;ximamente
                </span>
              </h1>

              <p className="mt-8 max-w-[620px] text-[18px] font-medium leading-[1.6] text-[#ccc7ab] md:text-[20px]">
                Estamos preparando la tienda online. Por el momento,
                comunicate con nosotros para coordinar tu compra por la sede
                que te quede m&aacute;s cerca.
              </p>

              <a
                href={whatsappLink(SHOP_CTA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex w-fit items-center gap-3 rounded-lg bg-[#fff212] px-8 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-black transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                <MessageSquare className="size-5" />
                Coordinar compra
              </a>
            </div>

            <aside className="rounded-lg border border-[#4a47324d] bg-[#131313] p-6 md:p-8 lg:p-10">
              <div className="flex items-center gap-3 text-[#fff212]">
                <Clock3 className="size-6" />
                <p className="text-[13px] font-extrabold uppercase tracking-[0.18em]">
                  Atenci&oacute;n personalizada
                </p>
              </div>

              <h2 className="mt-8 text-[26px] font-extrabold uppercase leading-[1.15] text-white md:text-[34px]">
                Eleg&iacute; la sede que te quede m&aacute;s cerca
              </h2>

              <div className="mt-8 grid gap-4">
                {SITE.branches.map((branch) => (
                  <div
                    key={branch}
                    className="rounded-lg border border-[#fff21226] bg-black/35 p-5"
                  >
                    <div className="flex items-start gap-3 text-[#e2e2e2cc]">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-[#fff212]" />
                      <p className="text-[15px] font-medium leading-6">
                        {branch}
                        <br />
                        Resistencia, Chaco
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
