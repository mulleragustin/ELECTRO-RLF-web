import { useState } from 'react'
import { PackageOpen, ShoppingCart, Trash2 } from 'lucide-react'
import {
  clearCart,
  pedidoWhatsAppText,
  removeFromCart,
  setCantidad,
  useCart,
  useIsClient,
} from '../cart'
import { unidadPlural } from '../format'
import { SITE, whatsappText } from '../site'
import { WhatsAppIcon } from './icons'
import QuantityInput from './shop/QuantityInput'

const OPCIONES_RETIRO = [...SITE.branches, 'A coordinar']

function CartItem({ item }) {
  const plural = unidadPlural(item.unidad)

  return (
    <li className="flex gap-4 p-4 md:p-5">
      <a href={item.path} className="size-20 shrink-0 overflow-hidden rounded-md bg-white md:size-24" tabIndex={-1} aria-hidden="true">
        {item.imagen ? (
          <img src={item.imagen} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain p-1.5" />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#1a1a1a] text-[#fff21259]">
            <PackageOpen className="size-7" strokeWidth={1.5} />
          </div>
        )}
      </a>
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <a href={item.path} className="line-clamp-2 text-[15px] font-bold leading-snug text-white transition-colors hover:text-[#fff212]">
            {item.titulo}
          </a>
          <p className="mt-1 font-mono text-[12px] text-[#e2e2e280]">Cód. {item.codigo}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <QuantityInput
            value={item.cantidad}
            onChange={(cantidad) => setCantidad(item.id, cantidad)}
            label={`Cantidad de ${item.titulo}`}
            size="sm"
          />
          {plural ? <span className="text-[12px] font-semibold text-[#e2e2e2b3]">{plural}</span> : null}
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            aria-label={`Quitar ${item.titulo} del carrito`}
            className="flex size-10 items-center justify-center rounded-lg text-[#e2e2e280] transition-colors hover:bg-[#ff5a401a] hover:text-[#ff5a40]"
          >
            <Trash2 className="size-[18px]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  )
}

function EmptyCart() {
  return (
    <div className="mt-10 rounded-lg border border-[#4a473240] bg-[#131313] px-6 py-16 text-center">
      <ShoppingCart className="mx-auto size-10 text-[#fff212]" aria-hidden="true" />
      <h2 className="mt-5 text-[22px] font-extrabold text-white md:text-[26px]">Tu carrito está vacío</h2>
      <p className="mx-auto mt-3 max-w-[440px] text-[15px] font-medium leading-[1.6] text-[#e2e2e2b3]">
        Agregá productos desde el shop y mandanos el pedido por WhatsApp para recibir precio y
        disponibilidad.
      </p>
      <a
        href="/shop"
        className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#fff212] px-7 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-black transition-all hover:-translate-y-0.5 active:scale-95"
      >
        Ir al shop
      </a>
    </div>
  )
}

export default function CartPage() {
  const items = useCart()
  const isClient = useIsClient()
  const [retiro, setRetiro] = useState(OPCIONES_RETIRO[0])
  const [nombre, setNombre] = useState('')
  const [comentarios, setComentarios] = useState('')

  let content
  if (!isClient) {
    content = <div className="mt-10 h-48 animate-pulse rounded-lg bg-[#131313]" />
  } else if (!items.length) {
    content = <EmptyCart />
  } else {
    const mensaje = pedidoWhatsAppText(items, { nombre, sede: retiro, comentarios })
    content = (
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
        <div>
          <ul className="divide-y divide-[#4a473240] rounded-lg border border-[#4a473240] bg-[#131313]">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 text-[13px] font-bold text-[#e2e2e280] transition-colors hover:text-[#ff5a40]"
          >
            Vaciar carrito
          </button>
        </div>

        <aside className="h-fit rounded-lg border border-[#fff21233] bg-[#131313] p-6 md:p-8 lg:sticky lg:top-28">
          <h2 className="text-[20px] font-extrabold uppercase tracking-[-0.3px] text-white">Enviar pedido</h2>
          <p className="mt-3 text-[14px] font-medium leading-[1.6] text-[#e2e2e2b3]">
            Te respondemos por WhatsApp con el precio actualizado y la disponibilidad de cada producto.
          </p>

          <fieldset className="mt-6">
            <legend className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#fff212]">Retiro en</legend>
            <div className="mt-3 grid gap-2">
              {OPCIONES_RETIRO.map((opcion) => (
                <label
                  key={opcion}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-[14px] font-semibold transition-colors ${
                    retiro === opcion ? 'border-[#fff212] text-white' : 'border-[#4a473266] text-[#e2e2e2b3] hover:border-[#fff21280]'
                  }`}
                >
                  <input
                    type="radio"
                    name="retiro"
                    value={opcion}
                    checked={retiro === opcion}
                    onChange={() => setRetiro(opcion)}
                    className="accent-[#fff212]"
                  />
                  {opcion}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-5 block">
            <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#fff212]">Tu nombre (opcional)</span>
            <input
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              autoComplete="name"
              className="mt-2 h-12 w-full rounded-lg border border-[#4a473266] bg-[#0b0b0b] px-4 text-[15px] text-white focus:border-[#fff212] focus:outline-none"
            />
          </label>
          <label className="mt-5 block">
            <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#fff212]">Comentarios (opcional)</span>
            <textarea
              value={comentarios}
              onChange={(event) => setComentarios(event.target.value)}
              rows={3}
              placeholder="Medidas, colores, si necesitás factura…"
              className="mt-2 w-full resize-y rounded-lg border border-[#4a473266] bg-[#0b0b0b] px-4 py-3 text-[15px] text-white placeholder:text-[#e2e2e266] focus:border-[#fff212] focus:outline-none"
            />
          </label>

          <a
            href={whatsappText(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-[#fff212] px-6 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-black transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <WhatsAppIcon className="size-5" />
            Enviar pedido por WhatsApp
          </a>
        </aside>
      </div>
    )
  }

  return (
    <main className="bg-black">
      <section className="container-section py-12 md:py-16">
        <h1 className="text-[38px] font-extrabold uppercase leading-[1.05] tracking-[-1.2px] text-white md:text-[56px] md:tracking-[-2px]">
          Tu carrito
        </h1>
        {content}
      </section>
    </main>
  )
}
