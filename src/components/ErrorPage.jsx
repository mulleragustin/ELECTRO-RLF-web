import { whatsappText } from '../site'
import { WhatsAppIcon } from './icons'

// Se muestra cuando el sistema de gestión no responde (HTTP 503).
export default function ErrorPage() {
  return (
    <main className="bg-black">
      <section className="container-section flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#fff212]">Shop</p>
        <h1 className="mt-5 max-w-[760px] text-[40px] font-extrabold uppercase leading-[1.05] tracking-[-1.4px] text-white md:text-[64px]">
          No pudimos cargar el catálogo
        </h1>
        <p className="mt-6 max-w-[560px] text-[17px] font-medium leading-[1.6] text-[#ccc7ab]">
          Probá de nuevo en unos minutos o escribinos y te ayudamos con tu pedido.
        </p>
        <a
          href={whatsappText('Hola! Quería hacer una consulta por un producto.')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-lg bg-[#fff212] px-7 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-black transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <WhatsAppIcon className="size-5" />
          Consultar por WhatsApp
        </a>
      </section>
    </main>
  )
}
