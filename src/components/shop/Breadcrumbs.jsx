import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] font-semibold text-[#e2e2e280]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.href || item.label} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="line-clamp-1 text-[#e2e2e2cc]">{item.label}</span>
              ) : (
                <>
                  <a href={item.href} className="transition-colors hover:text-[#fff212]">{item.label}</a>
                  <ChevronRight className="size-3.5 text-[#fff21280]" aria-hidden="true" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
