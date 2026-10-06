import { productoWhatsAppText } from '../../cart'
import { whatsappText } from '../../site'
import { WhatsAppIcon } from '../icons'

export default function ConsultarButton({ producto, compact = false, className = '' }) {
  const href = whatsappText(productoWhatsAppText(producto))

  if (compact) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Consultar por WhatsApp: ${producto.titulo}`}
        title="Consultar por WhatsApp"
        className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#fff2124d] text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#fff212] transition-colors hover:border-[#fff212] hover:bg-[#fff21214] sm:w-10 sm:shrink-0 ${className}`}
      >
        <WhatsAppIcon className="size-[18px]" />
        <span className="sm:hidden">Consultar</span>
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-lg border border-[#fff21266] px-6 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#fff212] transition-colors hover:border-[#fff212] hover:bg-[#fff21214] ${className}`}
    >
      <WhatsAppIcon className="size-5" />
      Consultar por WhatsApp
    </a>
  )
}
