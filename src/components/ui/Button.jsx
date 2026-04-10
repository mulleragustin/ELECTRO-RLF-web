export default function Button({
  href,
  children,
  shadow,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex w-fit items-center gap-3 rounded-xl bg-[#fff212] px-10 py-5 text-[14px] font-extrabold uppercase tracking-[0.1em] text-black transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 active:bg-[#fff212]/90'
  const shadowClasses = shadow ? 'shadow-[0_0_30px_rgba(255,242,18,0.2)]' : ''

  return (
    <a
      href={href}
      className={`${baseClasses} ${shadowClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  )
}
