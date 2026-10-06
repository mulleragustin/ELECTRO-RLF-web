import { PackageOpen } from 'lucide-react'
import { miniaturaSize } from '../../format'

export default function ProductImage({ imagen, alt, priority = false, className = '' }) {
  if (!imagen) {
    return (
      <div
        className={`flex aspect-square flex-col items-center justify-center gap-3 bg-[#1a1a1a] text-[#fff21259] ${className}`}
      >
        <PackageOpen className="size-10" strokeWidth={1.5} aria-hidden="true" />
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#e2e2e266]">
          Foto próximamente
        </span>
      </div>
    )
  }

  if (imagen.con_marca) {
    return (
      <div className={`aspect-square overflow-hidden bg-[#dededa] ${className}`}>
        <img
          src={imagen.miniatura}
          alt={alt}
          width={600}
          height={600}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  const { width, height } = miniaturaSize(imagen)
  return (
    <div className={`aspect-square overflow-hidden bg-white ${className}`}>
      <img
        src={imagen.miniatura}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
      />
    </div>
  )
}
