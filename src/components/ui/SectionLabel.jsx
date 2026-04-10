export default function SectionLabel({ children, className = '' }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full bg-[#fff2121a] px-4 py-[6px] text-[12px] font-extrabold uppercase tracking-[0.3em] text-[#fff212] ${className}`.trim()}
    >
      {children}
    </span>
  )
}
