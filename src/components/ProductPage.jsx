import { useState } from 'react'
import { Check, ShieldCheck, Store } from 'lucide-react'
import { formatPrecio, miniaturaSize, unidadPlural } from '../format'
import { SITE } from '../site'
import AddToCartButton from './shop/AddToCartButton'
import Breadcrumbs from './shop/Breadcrumbs'
import ConsultarButton from './shop/ConsultarButton'
import ProductCard from './shop/ProductCard'
import ProductImage from './shop/ProductImage'
import QuantityInput from './shop/QuantityInput'

function Gallery({ imagenes, titulo }) {
  const [actual, setActual] = useState(0)

  if (!imagenes.length) {
    return <ProductImage imagen={null} alt={titulo} className="rounded-lg border border-[#4a473240]" />
  }

  const imagen = imagenes[actual]
  const miniatura = miniaturaSize(imagen)
  // Si la foto original es chica, la miniatura y la grande miden lo mismo.
  const srcSet = miniatura.width < imagen.ancho
    ? `${imagen.miniatura} ${miniatura.width}w, ${imagen.url} ${imagen.ancho}w`
    : undefined

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-lg border border-[#4a473240] bg-white">
        <img
          key={imagen.url}
          src={imagen.url}
          srcSet={srcSet}
          sizes="(min-width: 1024px) 50vw, 100vw"
          width={imagen.ancho || undefined}
          height={imagen.alto || undefined}
          alt={actual === 0 ? titulo : `${titulo} - foto ${actual + 1}`}
          fetchPriority={actual === 0 ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-contain p-4 md:p-8"
        />
      </div>

      {imagenes.length > 1 ? (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {imagenes.map((item, index) => (
            <li key={item.url}>
              <button
                type="button"
                onClick={() => setActual(index)}
                aria-label={`Ver foto ${index + 1}`}
                aria-pressed={index === actual}
                className={`block aspect-square w-full overflow-hidden rounded-md border-2 bg-white transition-opacity ${
                  index === actual ? 'border-[#fff212]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={item.miniatura} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function Disponibilidad({ producto }) {
  if (!producto.disponible) {
    return (
      <p className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#ffffff0f] px-3.5 py-1.5 text-[13px] font-bold text-[#e2e2e2b3]">
        <span className="size-2 rounded-full bg-[#e2e2e266]" aria-hidden="true" />
        Consultá disponibilidad
      </p>
    )
  }
  return (
    <p className="mt-6 inline-flex w-fit flex-wrap items-center gap-2 rounded-full bg-[#4fc2781f] px-3.5 py-1.5 text-[13px] font-bold text-[#7fe0a2]">
      <span className="size-2 rounded-full bg-[#4fc278]" aria-hidden="true" />
      En stock{producto.sedes.length ? ` en ${producto.sedes.join(' y ')}` : ''}
    </p>
  )
}

function Detalle({ producto }) {
  const parrafos = producto.descripcion
    ? producto.descripcion.split(/\n\s*\n/).map((parrafo) => parrafo.trim()).filter(Boolean)
    : []
  const atributos = producto.caracteristicas.filter((caracteristica) => caracteristica.nombre)
  const vinetas = producto.caracteristicas.filter((caracteristica) => !caracteristica.nombre)
  if (!parrafos.length && !producto.caracteristicas.length) return null

  return (
    <section className="border-t border-[#4a47321a] bg-rlf-panel py-14 md:py-20">
      <div className="container-section grid gap-12 lg:grid-cols-2 lg:gap-16">
        {parrafos.length ? (
          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#fff212]">Descripción</h2>
            <div className="mt-6 max-w-[640px] space-y-4 text-[16px] font-medium leading-[1.75] text-[#e2e2e2cc]">
              {parrafos.map((parrafo) => (
                <p key={parrafo} className="whitespace-pre-line">{parrafo}</p>
              ))}
            </div>
          </div>
        ) : null}

        {producto.caracteristicas.length ? (
          <div>
            <h2 className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#fff212]">Características</h2>
            {atributos.length ? (
              <table className="mt-6 w-full text-[15px]">
                <tbody>
                  {atributos.map((caracteristica) => (
                    <tr key={caracteristica.nombre} className="border-b border-[#4a473240]">
                      <th scope="row" className="w-2/5 py-3.5 pr-6 text-left align-top font-semibold text-[#e2e2e2a6]">
                        {caracteristica.nombre}
                      </th>
                      <td className="py-3.5 font-bold text-white">{caracteristica.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
            {vinetas.length ? (
              <ul className="mt-6 space-y-3 text-[15px] font-medium text-[#e2e2e2cc]">
                {vinetas.map((caracteristica) => (
                  <li key={caracteristica.valor} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#fff212]" aria-hidden="true" />
                    {caracteristica.valor}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default function ProductPage({ producto }) {
  const [cantidad, setCantidad] = useState(1)
  const plural = unidadPlural(producto.unidad)

  return (
    <main className="bg-black">
      <div className="container-section pt-8 md:pt-10">
        <Breadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: producto.rubro.nombre, href: `/shop/${producto.rubro.slug}` },
            { label: producto.titulo },
          ]}
        />
      </div>

      <section className="container-section grid gap-8 pb-14 pt-6 md:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pb-20">
        <Gallery imagenes={producto.imagenes} titulo={producto.titulo} />

        <div className="flex flex-col">
          <a
            href={`/shop/${producto.rubro.slug}`}
            className="w-fit rounded-md border border-[#fff2124d] bg-[#fff21214] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#fff212] transition-colors hover:border-[#fff212]"
          >
            {producto.rubro.nombre}
          </a>
          <h1 className="mt-5 text-[30px] font-extrabold leading-[1.1] tracking-[-0.8px] text-white md:text-[42px] md:tracking-[-1.2px]">
            {producto.titulo}
          </h1>

          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
            {producto.marca ? (
              <div className="flex gap-2">
                <dt className="font-semibold uppercase tracking-[0.1em] text-[#e2e2e280]">Marca</dt>
                <dd className="font-bold text-white">{producto.marca}</dd>
              </div>
            ) : null}
            <div className="flex gap-2">
              <dt className="font-semibold uppercase tracking-[0.1em] text-[#e2e2e280]">Código</dt>
              <dd className="font-mono font-bold text-white">{producto.codigo}</dd>
            </div>
          </dl>

          <Disponibilidad producto={producto} />

          {producto.precio ? (
            <p className="mt-6 text-[34px] font-extrabold text-white">{formatPrecio(producto.precio)}</p>
          ) : (
            <p className="mt-6 max-w-[520px] text-[15px] font-medium leading-[1.6] text-[#ccc7ab]">
              Agregalo al carrito o consultanos directo: te pasamos el precio actualizado y la
              disponibilidad por WhatsApp.
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <QuantityInput value={cantidad} onChange={setCantidad} />
              {plural ? <span className="text-[13px] font-semibold text-[#e2e2e2b3]">{plural}</span> : null}
            </div>
            <AddToCartButton producto={producto} cantidad={cantidad} className="flex-1" />
          </div>
          <ConsultarButton producto={producto} className="mt-3 w-full" />

          <ul className="mt-8 grid gap-4 border-t border-[#4a473240] pt-8 text-[14px] font-medium leading-[1.6] text-[#e2e2e2cc]">
            <li className="flex gap-3">
              <Store className="mt-0.5 size-5 shrink-0 text-[#fff212]" aria-hidden="true" />
              <span>Retirá en nuestras sedes: {SITE.branches.join(' y ')}, Resistencia, Chaco.</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#fff212]" aria-hidden="true" />
              <span>Asesoramiento técnico para elegir el material correcto para tu obra.</span>
            </li>
          </ul>
        </div>
      </section>

      <Detalle producto={producto} />

      {producto.relacionados.length ? (
        <section className="container-section py-14 md:py-20">
          <h2 className="text-[28px] font-extrabold uppercase leading-[1.1] tracking-[-0.8px] text-white md:text-[36px]">
            También te puede interesar
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {producto.relacionados.map((relacionado) => (
              <li key={relacionado.id} className="flex">
                <ProductCard producto={relacionado} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  )
}
