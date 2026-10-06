export default function NotFoundPage() {
  return (
    <main className="bg-black">
      <section className="container-section flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#fff212]">Error 404</p>
        <h1 className="mt-5 max-w-[760px] text-[40px] font-extrabold uppercase leading-[1.05] tracking-[-1.4px] text-white md:text-[64px]">
          Esta página no existe
        </h1>
        <p className="mt-6 max-w-[560px] text-[17px] font-medium leading-[1.6] text-[#ccc7ab]">
          Puede que el producto ya no esté publicado o que el link esté mal escrito.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/shop"
            className="inline-flex items-center rounded-lg bg-[#fff212] px-7 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-black transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Ver el shop
          </a>
          <a
            href="/"
            className="inline-flex items-center rounded-lg border border-[#fff21266] px-7 py-4 text-[13px] font-extrabold uppercase tracking-[0.1em] text-[#fff212] transition-colors hover:border-[#fff212]"
          >
            Ir al inicio
          </a>
        </div>
      </section>
    </main>
  )
}
