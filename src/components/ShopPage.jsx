import { useState } from 'react'
import { Check, ChevronDown, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react'
import { useNavigation } from '../navigation'
import { SITE, whatsappText } from '../site'
import { WhatsAppIcon } from './icons'
import Breadcrumbs from './shop/Breadcrumbs'
import Pagination from './shop/Pagination'
import ProductCard from './shop/ProductCard'

const MARCAS_VISIBLES = 10

// URL del shop con filtros: el rubro va en el path; búsqueda, marca y página en la query.
function shopHref({ rubro = '', q = '', marca = '', page = 1 } = {}) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (marca) params.set('marca', marca)
  if (page > 1) params.set('page', String(page))
  const search = params.toString()
  const path = rubro ? `/shop/${rubro}` : '/shop'
  return search ? `${path}?${search}` : path
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-[#4a473240] py-6 first:pt-2 last:border-b-0 lg:first:pt-0">
      <h2 className="px-3 text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#fff212]">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function CategoryLink({ href, label, total, active }) {
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center justify-between gap-3 rounded-md px-3 py-2 text-[14px] font-semibold transition-colors ${
        active ? 'bg-[#fff2121a] text-[#fff212]' : 'text-[#e2e2e2cc] hover:bg-[#ffffff0a] hover:text-white'
      }`}
    >
      <span>{label}</span>
      <span className={`text-[12px] tabular-nums ${active ? 'text-[#fff212]' : 'text-[#e2e2e266]'}`}>{total}</span>
    </a>
  )
}

function BrandLink({ href, label, total, active }) {
  return (
    <a
      href={href}
      aria-current={active ? 'true' : undefined}
      className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-[14px] font-semibold text-[#e2e2e2cc] transition-colors hover:bg-[#ffffff0a] hover:text-white"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className={`flex size-4 shrink-0 items-center justify-center rounded-[4px] border ${
            active ? 'border-[#fff212] bg-[#fff212] text-black' : 'border-[#4a473299]'
          }`}
        >
          {active ? <Check className="size-3" strokeWidth={3.5} /> : null}
        </span>
        <span className="truncate">{label}</span>
      </span>
      <span className="text-[12px] tabular-nums text-[#e2e2e266]">{total}</span>
    </a>
  )
}

function Filtros({ data }) {
  const [verTodas, setVerTodas] = useState(false)
  const rubroActivo = data.rubro?.slug || ''
  const marcaActiva = data.marca?.slug || ''
  const todasLasMarcas = data.marcas || []
  const totalCategorias = data.rubros.reduce((suma, rubro) => suma + rubro.total, 0)
  const marcas = verTodas
    ? todasLasMarcas
    : todasLasMarcas.filter((marca, index) => index < MARCAS_VISIBLES || marca.slug === marcaActiva)

  return (
    <>
      <FilterGroup title="Categorías">
        <ul className="space-y-0.5">
          <li>
            <CategoryLink
              href={shopHref({ q: data.q })}
              label="Todos los productos"
              total={totalCategorias}
              active={!rubroActivo}
            />
          </li>
          {data.rubros.map((rubro) => (
            <li key={rubro.slug}>
              <CategoryLink
                href={shopHref({ rubro: rubro.slug, q: data.q })}
                label={rubro.nombre}
                total={rubro.total}
                active={rubro.slug === rubroActivo}
              />
            </li>
          ))}
        </ul>
      </FilterGroup>

      {todasLasMarcas.length ? (
        <FilterGroup title="Marcas">
          <ul className="space-y-0.5">
            {marcas.map((marca) => (
              <li key={marca.slug}>
                <BrandLink
                  href={shopHref({
                    rubro: rubroActivo,
                    q: data.q,
                    marca: marca.slug === marcaActiva ? '' : marca.slug,
                  })}
                  label={marca.nombre}
                  total={marca.total}
                  active={marca.slug === marcaActiva}
                />
              </li>
            ))}
          </ul>
          {todasLasMarcas.length > MARCAS_VISIBLES ? (
            <button
              type="button"
              onClick={() => setVerTodas((current) => !current)}
              className="mt-2 px-3 text-[13px] font-bold text-[#fff212] hover:underline"
            >
              {verTodas ? 'Ver menos' : `Ver todas (${todasLasMarcas.length})`}
            </button>
          ) : null}
        </FilterGroup>
      ) : null}
    </>
  )
}

function FiltrosActivos({ data }) {
  const rubro = data.rubro?.slug || ''
  const chips = []
  if (data.rubro) chips.push({ label: data.rubro.nombre, href: shopHref({ q: data.q }) })
  if (data.marca) chips.push({ label: data.marca.nombre, href: shopHref({ rubro, q: data.q }) })
  if (data.q) chips.push({ label: `“${data.q}”`, href: shopHref({ rubro, marca: data.marca?.slug }) })
  if (!chips.length) return null

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <a
          key={chip.label}
          href={chip.href}
          aria-label={`Quitar filtro ${chip.label}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#fff21266] bg-[#fff21214] px-3 py-1.5 text-[12.5px] font-bold text-[#fff212] transition-colors hover:border-[#fff212]"
        >
          {chip.label}
          <X className="size-3.5" aria-hidden="true" />
        </a>
      ))}
      {chips.length > 1 ? (
        <a href="/shop" className="px-1 text-[12.5px] font-bold text-[#e2e2e299] transition-colors hover:text-white">
          Limpiar todo
        </a>
      ) : null}
    </div>
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
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)
  const { rubro, marca, q } = data
  const rubroSlug = rubro?.slug || ''
  const hayCatalogo = data.rubros.length > 0 || data.count > 0
  const filtrosActivos = (rubro ? 1 : 0) + (marca ? 1 : 0)

  const handleSearch = (event) => {
    event.preventDefault()
    const value = String(new FormData(event.currentTarget).get('q') || '').trim()
    navigate(shopHref({ rubro: rubroSlug, q: value }))
  }

  return (
    <main className="bg-black">
      <section className="relative overflow-hidden border-b border-[#4a47321a] bg-rlf-shop py-10 md:py-12">
        <div className="pointer-events-none absolute inset-0 bg-rlf-shop-fade" />
        <div className="pointer-events-none absolute inset-0 bg-rlf-noise opacity-[0.06]" />

        <div className="container-section relative z-10 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div>
            <Breadcrumbs
              items={
                rubro
                  ? [{ label: 'Inicio', href: '/' }, { label: 'Shop', href: '/shop' }, { label: rubro.nombre }]
                  : [{ label: 'Inicio', href: '/' }, { label: 'Shop' }]
              }
            />
            <h1 className="mt-5 text-[34px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-white md:text-[48px] md:tracking-[-1.6px]">
              {rubro ? (
                rubro.nombre
              ) : (
                <>
                  Materiales eléctricos{' '}
                  <span className="italic text-[#fff212]">y ferretería</span>
                </>
              )}
            </h1>
            <p className="mt-4 max-w-[600px] text-[16px] font-medium leading-[1.6] text-[#ccc7ab]">
              {data.mostrar_precios
                ? 'Armá tu carrito y envialo por WhatsApp: confirmamos el stock y coordinamos el pago. Pagando en efectivo o transferencia tenés mejor precio.'
                : 'Armá tu carrito y envialo por WhatsApp: te respondemos con precio y disponibilidad.'}{' '}
              Retirás en {SITE.branches.join(' o ')}, Resistencia.
            </p>
          </div>

          <form
            role="search"
            action={rubro ? `/shop/${rubroSlug}` : '/shop'}
            method="get"
            onSubmit={handleSearch}
            className="mt-7 flex w-full gap-2 lg:mt-0 lg:max-w-[440px]"
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
                className="h-12 w-full rounded-lg border border-[#4a473266] bg-[#0b0b0b] pl-12 pr-4 text-[16px] font-medium text-white placeholder:text-[#e2e2e266] focus:border-[#fff212] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-12 shrink-0 rounded-lg bg-[#fff212] px-5 text-[13px] font-extrabold uppercase tracking-[0.1em] text-black transition-transform active:scale-95"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="container-section py-8 md:py-12">
        {hayCatalogo ? (
          <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10 xl:gap-12">
            <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
              <button
                type="button"
                onClick={() => setFiltrosAbiertos((current) => !current)}
                aria-expanded={filtrosAbiertos}
                aria-controls="shop-filtros"
                className="flex w-full items-center justify-between rounded-lg border border-[#4a473266] bg-[#131313] px-4 py-3.5 text-[14px] font-bold text-white lg:hidden"
              >
                <span className="flex items-center gap-2.5">
                  <SlidersHorizontal className="size-4 text-[#fff212]" aria-hidden="true" />
                  Filtrar{filtrosActivos ? ` (${filtrosActivos})` : ''}
                </span>
                <ChevronDown
                  className={`size-4 transition-transform ${filtrosAbiertos ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <aside
                id="shop-filtros"
                aria-label="Filtros"
                className={`${filtrosAbiertos ? 'block' : 'hidden'} mt-3 rounded-lg border border-[#4a473240] bg-[#0b0b0b] p-3 lg:mt-0 lg:block lg:border-0 lg:bg-transparent lg:p-0`}
              >
                <Filtros data={data} />
              </aside>
            </div>

            <div className="mt-8 lg:mt-0">
              <p className="text-[14px] font-semibold text-[#e2e2e2b3]">
                {data.count} {data.count === 1 ? 'producto' : 'productos'}
              </p>
              <FiltrosActivos data={data} />

              {data.results.length ? (
                <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
                  {data.results.map((producto, index) => (
                    <li key={producto.id} className="flex">
                      <ProductCard producto={producto} priority={index < 3} />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState q={q} />
              )}

              <Pagination
                page={data.page}
                pages={data.pages}
                hrefFor={(page) => shopHref({ rubro: rubroSlug, q, marca: marca?.slug, page })}
              />
            </div>
          </div>
        ) : (
          <EmptyState q={q} />
        )}
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
