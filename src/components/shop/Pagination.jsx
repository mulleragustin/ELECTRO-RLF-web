import { ChevronLeft, ChevronRight } from 'lucide-react'

// [1, '…', 4, 5, 6, '…', 12]
function pageWindow(page, pages) {
  const set = new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages))
  const sorted = [...set].sort((a, b) => a - b)
  const result = []
  sorted.forEach((n, index) => {
    if (index > 0 && n - sorted[index - 1] > 1) result.push(`gap-${n}`)
    result.push(n)
  })
  return result
}

const baseClasses =
  'inline-flex h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-[14px] font-bold transition-colors'

export default function Pagination({ page, pages, hrefFor }) {
  if (pages <= 1) return null

  return (
    <nav aria-label="Páginas del catálogo" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <a href={hrefFor(page - 1)} rel="prev" aria-label="Página anterior" className={`${baseClasses} border-[#4a473266] text-white hover:border-[#fff212] hover:text-[#fff212]`}>
          <ChevronLeft className="size-4" aria-hidden="true" />
        </a>
      ) : null}
      {pageWindow(page, pages).map((item) =>
        typeof item === 'string' ? (
          <span key={item} className="px-1 text-[#e2e2e266]" aria-hidden="true">…</span>
        ) : item === page ? (
          <span key={item} aria-current="page" className={`${baseClasses} border-[#fff212] bg-[#fff212] text-black`}>
            {item}
          </span>
        ) : (
          <a key={item} href={hrefFor(item)} className={`${baseClasses} border-[#4a473266] text-white hover:border-[#fff212] hover:text-[#fff212]`}>
            {item}
          </a>
        ),
      )}
      {page < pages ? (
        <a href={hrefFor(page + 1)} rel="next" aria-label="Página siguiente" className={`${baseClasses} border-[#4a473266] text-white hover:border-[#fff212] hover:text-[#fff212]`}>
          <ChevronRight className="size-4" aria-hidden="true" />
        </a>
      ) : null}
    </nav>
  )
}
