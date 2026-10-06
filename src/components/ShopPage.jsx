import { Search, ShoppingBag, X } from 'lucide-react'
import { useNavigation } from '../navigation'
import { SITE, whatsappText } from '../site'
import { WhatsAppIcon } from './icons'
import Breadcrumbs from './shop/Breadcrumbs'
import Pagination from './shop/Pagination'
import ProductCard from './shop/ProductCard'

function RubroChip({ href, label, total, active }) {
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-bold transition-colors ${
        active
          ? 'border-[#fff212] bg-[#fff212] text-black'
          : 'border-[#4a473266] text-[#e2e2e2cc] hover:border-[#fff212] hover:text-[#fff212]'
      }`}
    >
      {label}
      {total ? <span className={active ? 'text-black/55' : 'text-[#e2e2e266]'}>{total}</span> : null}
    </a>
  )
}

function EmptyState({ q }) {
  const mensaje = q
    ? `Hola! Estoy buscando: ${q}. ¿Lo tienen?`
    : 'Hola! Quería consultar por un producto.'

  return (
    <div className="mt-6 rounded-lg border border-[#4a473240] bg-[#131313] px-6 py-14 text-center">
      <ShoppingBag className="mx-auto size-10 text-[#fff212]" aria-hidden="true" />
      <h2 className="mt-5 text-[22px] font-extrabold text-white md:text-[26px]">
        {q ? `No encontramos “${q}” en la web` : 'Todavía no hay productos publicados'}
      </h2>
      <p className="mx-auto mt-3 max-w-[480px] text-[15px] font-medium leading-[1.6] text-[#e2e2e2b3]">
        Muchos productos todavía no están en la tienda online. Escribinos y te decimos si lo tenemos
        en alguna de nuestras sedes.
      </p>
      <a
        href={whatsappText(mensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#fff212] px-7 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-black transition-all hover:-translate-y-0.5 active:scale-95"
      >
        <WhatsAppIcon className="size-5" />
        Preguntar por WhatsApp
      </a>
    </div>
  )
}

export default function ShopPage({ data }) {
  const { navigate } = useNavigation()
  const { rubro, q } = data
  const basePath = rubro ? `/shop/${rubro.slug}` : '/shop'

  const hrefFor = (page) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (page > 1) params.set('page', String(page))
    const search = params.toString()
    return search ? `${basePath}?${search}` : basePath
  }

  const handleSearch = (event) => {
    event.preventDefault()
    const value = String(new FormData(event.currentTarget).get('q') || '').trim()
    navigate(value ? `${basePath}?q=${encodeURIComponent(value)}` : basePath)
  }

  return (
    <main className="bg-black">
      <section className="relative overflow-hidden border-b border-[#4a47321a] bg-rlf-shop pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="section-cutline" />
        <div className="pointer-events-none absolute inset-0 bg-rlf-shop-fade" />
        <div className="pointer-events-none absolute inset-0 bg-rlf-noise opacity-[0.06]" />

        <div className="container-section relative z-10">
          {rubro ? (
            <Breadcrumbs
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Shop', href: '/shop' },
                { label: rubro.nombre },
              ]}
            />
          ) : (
            <div className="inline-flex items-center gap-3 rounded-lg border border-[#fff2124d] bg-[#fff21214] px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#fff212]">
              <ShoppingBag className="size-4" aria-hidden="true" />
              Shop online
            </div>
          )}

          <h1 className="mt-6 max-w-[900px] text-[38px] font-extrabold uppercase leading-[1.04] tracking-[-1.2px] text-white md:text-[60px] md:tracking-[-2px]">
            {rubro ? (
              rubro.nombre
            ) : (
              <>
                Materiales eléctricos{' '}
                <span className="italic text-[#fff212]">y ferretería</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-[640px] text-[17px] font-medium leading-[1.6] text-[#ccc7ab] md:text-[19px]">
            Armá tu carrito y envialo por WhatsApp: te respondemos con precio y disponibilidad.
            Retirás en {SITE.branches.join(' o ')}, Resistencia.
          </p>

          <form
            role="search"
            action={basePath}
            method="get"
            onSubmit={handleSearch}
            className="mt-8 flex max-w-[640px] gap-2"
          >
            <label htmlFor="shop-q" className="sr-only">Buscar productos</label>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#e2e2e280]" aria-hidden="true" />
              <input
                id="shop-q"
                name="q"
                type="search"
                defaultValue={q}
                placeholder={rubro ? `Buscar en ${rubro.nombre.toLowerCase()}…` : 'Producto, marca o código…'}
                className="h-14 w-full rounded-lg border border-[#4a473266] bg-[#0b0b0b] pl-12 pr-4 text-[16px] font-medium text-white placeholder:text-[#e2e2e266] focus:border-[#fff212] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-14 shrink-0 rounded-lg bg-[#fff212] px-5 text-[13px] font-extrabold uppercase tracking-[0.1em] text-black transition-transform active:scale-95 md:px-7"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="container-section py-10 md:py-14">
        <nav aria-label="Rubros" className="-mx-6 overflow-x-auto px-6 pb-1 md:mx-0 md:overflow-visible md:px-0">
          <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
            <li>
              <RubroChip href="/shop" label="Todo" active={!rubro} />
            </li>
            {data.rubros.map((item) => (
              <li key={item.slug}>
                <RubroChip
                  href={`/shop/${item.slug}`}
                  label={item.nombre}
                  total={item.total}
                  active={rubro?.slug === item.slug}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-[14px] font-semibold text-[#e2e2e2b3]">
            {data.count} {data.count === 1 ? 'producto' : 'productos'}
            {q ? (
              <>
                {' '}para “<span className="text-white">{q}</span>”
              </>
            ) : null}
          </p>
          {q ? (
            <a href={basePath} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#fff212] hover:underline">
              <X className="size-4" aria-hidden="true" />
              Limpiar búsqueda
            </a>
          ) : null}
        </div>

        {data.results.length ? (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {data.results.map((producto, index) => (
              <li key={producto.id} className="flex">
                <ProductCard producto={producto} priority={index < 4} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState q={q} />
        )}

        <Pagination page={data.page} pages={data.pages} hrefFor={hrefFor} />
      </section>

      <section className="border-t border-[#4a47321a] bg-rlf-panel py-14 md:py-20">
        <div className="container-section flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-[28px] font-extrabold uppercase leading-[1.1] tracking-[-0.8px] text-white md:text-[40px]">
              ¿No encontrás lo que buscás?
            </h2>
            <p className="mt-4 max-w-[560px] text-[16px] font-medium leading-[1.6] text-[#ccc7ab]">
              En nuestras sedes hay muchos más productos de los que ves acá. Escribinos y te ayudamos
              a armar tu pedido.
            </p>
          </div>
          <a
            href={whatsappText('Hola! Estoy buscando un producto que no encontré en la web.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-3 rounded-lg bg-[#fff212] px-8 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-black transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <WhatsAppIcon className="size-5" />
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}
