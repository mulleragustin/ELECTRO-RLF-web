import { formatPrecio, unidadSingular } from '../../format'

// Precio de lista grande y, abajo, el precio pagando en efectivo o transferencia.
export default function Precio({ producto, grande = false }) {
  if (!producto.precio) return null
  const unidad = unidadSingular(producto.unidad)
  const porUnidad = unidad ? (
    <span className="text-[0.5em] font-semibold tracking-normal text-[#e2e2e280]"> / {unidad}</span>
  ) : null

  if (grande) {
    return (
      <div className="mt-6">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#e2e2e280]">Precio de lista</p>
        <p className="mt-1.5 text-[36px] font-extrabold leading-none tracking-[-0.5px] text-white md:text-[42px]">
          {formatPrecio(producto.precio)}
          {porUnidad}
        </p>
        {producto.precio_efectivo ? (
          <p className="mt-4 flex w-fit flex-wrap items-baseline gap-x-2 gap-y-1 rounded-lg border border-[#4fc27855] bg-[#4fc2781a] px-4 py-3 text-[15px] font-semibold text-[#e2e2e2cc]">
            <span className="text-[24px] font-extrabold leading-none text-[#7fe0a2]">
              {formatPrecio(producto.precio_efectivo)}
            </span>
            pagando en efectivo o transferencia
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="mt-3">
      <p className="text-[19px] font-extrabold leading-none text-white md:text-[21px]">
        {formatPrecio(producto.precio)}
        {porUnidad}
      </p>
      {producto.precio_efectivo ? (
        <p className="mt-1.5 text-[12px] font-semibold leading-snug text-[#e2e2e299]">
          <span className="font-extrabold text-[#7fe0a2]">{formatPrecio(producto.precio_efectivo)}</span>{' '}
          efectivo o transferencia
        </p>
      ) : null}
    </div>
  )
}
