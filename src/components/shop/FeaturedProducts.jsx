import { ArrowRight } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import SectionTitle from '../ui/SectionTitle'
import ProductCard from './ProductCard'

// Productos marcados como "Destacar en el inicio" desde la gestión.
export default function FeaturedProducts({ productos }) {
  if (!productos.length) return null

  return (
    <section id="destacados" className="relative overflow-hidden bg-rlf-wash-left py-20 md:py-28">
      <div className="section-cutline" />
      <div className="container-section relative z-10">
        <header data-animate="title" className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Shop online</SectionLabel>
            <SectionTitle className="mt-6">Productos destacados</SectionTitle>
          </div>
          <a
            href="/shop"
            className="inline-flex w-fit items-center gap-3 border-b-2 border-[#fff2124d] pb-1 text-[14px] font-extrabold uppercase tracking-[0.1em] text-[#fff212] transition-colors hover:border-[#fff212]"
          >
            Ver todo el shop
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </header>

        <ul data-animate="stagger-up" className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {productos.slice(0, 8).map((producto) => (
            <li key={producto.id} className="flex">
              <ProductCard producto={producto} headingLevel="h3" showDestacado={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
