import { useEffect, useRef, useState } from 'react'
import { Check, ShoppingCart } from 'lucide-react'
import { addToCart } from '../../cart'

export default function AddToCartButton({ producto, cantidad = 1, compact = false, className = '' }) {
  const [added, setAdded] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleClick = () => {
    addToCart(producto, cantidad)
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1800)
  }

  const label = compact ? 'Agregar' : 'Agregar al carrito'
  const sizeClasses = compact
    ? 'gap-2 px-3 py-2.5 text-[11px] tracking-[0.08em]'
    : 'gap-3 px-6 py-4 text-[13px] tracking-[0.1em]'

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={compact ? `Agregar ${producto.titulo} al carrito` : undefined}
      className={`inline-flex items-center justify-center rounded-lg bg-[#fff212] font-extrabold uppercase text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,242,18,0.25)] active:scale-95 ${sizeClasses} ${className}`}
    >
      {added ? <Check className="size-4" aria-hidden="true" /> : <ShoppingCart className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{added ? 'Agregado' : label}</span>
    </button>
  )
}
