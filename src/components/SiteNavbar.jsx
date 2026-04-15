import { useState } from 'react'
import { whatsappLink } from '../site'
import Button from './ui/Button'

const LOGO_IMAGE = '/assets/logo-electro-rlf.png'

const NAV_LINKS = [
  { label: 'Home', path: '/', hash: 'inicio' },
  { label: 'Nosotros', path: '/nosotros', hash: '' },
  { label: 'Shop', path: '/shop', hash: '', badge: 'Prox.' },
]

function buildHref({ path, hash }) {
  return hash ? `${path}#${hash}` : path
}

function isPlainLeftClick(event) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.shiftKey
  )
}

function isLinkActive(link, route) {
  if (link.path !== '/') {
    return route.pathname === link.path
  }

  if (route.pathname !== '/') {
    return false
  }

  const currentHash = route.hash || 'inicio'
  return currentHash === (link.hash || 'inicio')
}

export default function SiteNavbar({ route, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (event, link) => {
    if (!isPlainLeftClick(event)) return

    event.preventDefault()
    setIsOpen(false)
    onNavigate(link.path, link.hash)
  }

  return (
    <header
      id="navbar"
      className="sticky top-0 z-50 w-full border-b border-[#4a473226] bg-[#131313]/90 backdrop-blur-md"
    >
      <div className="container-section">
        <nav className="relative flex h-20 items-center justify-between gap-8 md:h-24">
          <a
            href="/"
            onClick={(event) =>
              handleNavigation(event, { path: '/', hash: 'inicio' })
            }
            className="shrink-0"
            aria-label="Ir al inicio"
          >
            <img
              src={LOGO_IMAGE}
              alt="Electro RLF - ferretería eléctrica en Resistencia"
              width={855}
              height={263}
              decoding="async"
              className="h-[36px] w-[118px] object-contain md:h-[42px] md:w-[138px]"
            />
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex lg:gap-12">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link, route)

              return (
                <li key={link.label}>
                  <a
                    href={buildHref(link)}
                    onClick={(event) => handleNavigation(event, link)}
                    className={`inline-flex items-center gap-2 font-sans text-[14px] font-bold tracking-[-0.025em] transition-colors hover:text-[#fff212] ${
                      isActive
                        ? 'border-b-2 border-[#fff212] pb-1.5 text-[#fff212]'
                        : 'border-b-2 border-transparent pb-1.5 text-[#e2e2e2b8]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge ? (
                      <span className="rounded-[6px] border border-[#fff2124d] bg-[#fff21214] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#fff212]">
                        {link.badge}
                      </span>
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center rounded-xl bg-[#fff212] px-6 py-2.5 font-sans text-[14px] font-extrabold uppercase tracking-[0.05em] text-black transition-transform hover:-translate-y-0.5 active:scale-95 md:flex"
          >
            Contacto
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-label="Abrir menu"
            className="p-2 text-white transition-opacity hover:opacity-75 md:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>

        <div
          className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[#4a473233] py-6">
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => {
                  const isActive = isLinkActive(link, route)

                  return (
                    <li key={link.label}>
                      <a
                        href={buildHref(link)}
                        onClick={(event) => handleNavigation(event, link)}
                        className={`block px-2 font-sans text-base font-bold transition-colors ${
                          isActive
                            ? 'text-[#fff212]'
                            : 'text-white hover:text-[#fff212]'
                        }`}
                      >
                        <span className="inline-flex items-center gap-2">
                          {link.label}
                          {link.badge ? (
                            <span className="rounded-[6px] border border-[#fff2124d] bg-[#fff21214] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#fff212]">
                              {link.badge}
                            </span>
                          ) : null}
                        </span>
                      </a>
                    </li>
                  )
                })}
                <li className="mt-2">
                  <Button
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full justify-center py-4"
                  >
                    Contacto
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
