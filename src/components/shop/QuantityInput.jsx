import { Minus, Plus } from 'lucide-react'

const MAX = 999

function clamp(value) {
  return Math.min(Math.max(Math.round(Number(value) || 1), 1), MAX)
}

export default function QuantityInput({ value, onChange, label = 'Cantidad', size = 'lg' }) {
  const height = size === 'lg' ? 'h-14' : 'h-10'
  const buttonWidth = size === 'lg' ? 'w-12' : 'w-9'
  const buttonClasses = `flex h-full ${buttonWidth} items-center justify-center text-white transition-colors hover:text-[#fff212] disabled:opacity-30 disabled:hover:text-white`

  return (
    <div className={`inline-flex ${height} shrink-0 items-center rounded-lg border border-[#4a473266] bg-[#0b0b0b]`}>
      <button type="button" onClick={() => onChange(clamp(value - 1))} disabled={value <= 1} aria-label="Restar uno" className={buttonClasses}>
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={MAX}
        value={value}
        onChange={(event) => onChange(clamp(event.target.value))}
        aria-label={label}
        className="h-full w-12 bg-transparent text-center text-[15px] font-bold text-white [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button type="button" onClick={() => onChange(clamp(value + 1))} disabled={value >= MAX} aria-label="Sumar uno" className={buttonClasses}>
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
