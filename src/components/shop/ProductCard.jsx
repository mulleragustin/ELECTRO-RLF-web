import { formatPrecio } from '../../format'
import AddToCartButton from './AddToCartButton'
import ConsultarButton from './ConsultarButton'
import ProductImage from './ProductImage'

export default function ProductCard({ producto, priority = false, headingLevel = 'h2', showDestacado = true }) {
  const Heading = headingLevel

  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-lg border border-[#4a473240] bg-[#131313] transition-colors hover:border-[#fff21259]">
      <a href={producto.path} tabIndex={-1} aria-hidden="true" className="relative block">
        <ProductImage imagen={producto.imagen} alt={producto.titulo} priority={priority} />
        {showDestacado && producto.destacado ? (
          <span className="absolute left-2 top-2 rounded-md bg-[#fff212] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-black shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
            Destacado
          </span>
        ) : null}
      </a>

      <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
        <p className="text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-[#fff212]">
          {producto.rubro.nombre}
        </p>
        <Heading className="mt-2 line-clamp-2 text-[15px] font-bold leading-[1.35] text-white md:text-[16px]">
          <a href={producto.path} className="transition-colors hover:text-[#fff212]">
            {producto.titulo}
          </a>
        </Heading>
        {producto.marca ? (
          <p className="mt-1.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[#e2e2e280]">
            {producto.marca}
          </p>
        ) : null}
        {producto.precio ? (
          <p className="mt-3 text-[20px] font-extrabold text-white">{formatPrecio(producto.precio)}</p>
        ) : null}

        {/* En celulares chicos los botones van apilados: en fila no entran en la tarjeta. */}
        <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row">
          <AddToCartButton producto={producto} compact className="w-full sm:w-auto sm:flex-1" />
          <ConsultarButton producto={producto} compact />
        </div>
      </div>
    </article>
  )
}
