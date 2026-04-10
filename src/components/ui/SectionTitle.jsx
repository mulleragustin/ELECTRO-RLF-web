export default function SectionTitle({ children, className = '' }) {
  return (
    <h2
      className={`text-[44px] font-extrabold leading-[44px] tracking-[-1.8px] text-white md:text-[60px] md:leading-[60px] md:tracking-[-3px] xl:text-[72px] xl:leading-[72px] xl:tracking-[-3.6px] ${className}`.trim()}
    >
      {children}
    </h2>
  )
}
