import { SITE, whatsappLink } from '../site'
import { MapPin, Phone, Mail } from 'lucide-react'

function InstagramIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-rlf-footer py-20 text-[14px] md:py-28 lg:pb-24 lg:pt-32">
      <div className="section-cutline" />
      <div className="container-section relative z-10">
        <div className="grid gap-16 md:grid-cols-3 lg:gap-24 xl:gap-32">
          {/* Column 1 */}
          <div className="max-w-[320px]">
            <h3 className="text-[20px] font-extrabold uppercase tracking-wide text-white">
              {SITE.name}
            </h3>
            <p className="mt-6 font-medium leading-relaxed text-[#e2e2e2b3]">
              Ferretería eléctrica y servicio de instalación residencial en
              Resistencia, Chaco. Calidad técnica y compromiso en cada proyecto.
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <h4 className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-[#fff212]">
              Contacto
            </h4>
            <ul className="space-y-4 font-medium text-[#e2e2e2b3]">
              <li className="flex items-start gap-4">
                <MapPin className="mt-[2px] size-[18px] shrink-0 text-[#fff212]" />
                <div className="space-y-4">
                  {SITE.branches.map((branch, index) => (
                    <div key={branch}>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#fff212]">
                        Sede {index + 1}
                      </p>
                      <p className="mt-1 leading-relaxed">
                        {branch}
                        <br />
                        Resistencia, Chaco
                      </p>
                    </div>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="size-[18px] shrink-0 text-[#fff212]" />
                <a
                  href={whatsappLink()}
                  className="transition-colors hover:text-white"
                >
                  +54 9 {SITE.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="size-[18px] shrink-0 text-[#fff212]" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-white"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <h4 className="text-[13px] font-extrabold uppercase tracking-[0.15em] text-[#fff212]">
              Seguinos
            </h4>
            <div className="flex items-center gap-4">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Electro RLF"
                className="flex size-11 items-center justify-center rounded-[10px] border border-[#ffffff1a] text-[#e2e2e2b3] transition-colors hover:border-[#fff212] hover:text-[#fff212]"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Electro RLF"
                className="flex size-11 items-center justify-center rounded-[10px] border border-[#ffffff1a] text-[#e2e2e2b3] transition-colors hover:border-[#fff212] hover:text-[#fff212]"
              >
                <FacebookIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-section relative z-10 mt-20 md:mt-28 lg:mt-32">
        <div className="flex flex-col items-center justify-between gap-8 border-t border-[#ffffff1a] pt-8 md:flex-row lg:pt-12">
          <p className="text-[12px] font-medium text-[#e2e2e2b3]">
            &copy; 2026 {SITE.name}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-3 text-[12px] font-medium text-[#e2e2e2b3]">
            <span>Design & developed by</span>
            <a
              href="https://tinystudioar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Sitio web de Tiny Studio"
            >
              <img
                src="/Icon-tiny.svg"
                alt="Tiny Studio"
                width={18}
                height={18}
                loading="lazy"
                decoding="async"
                className="h-[18px]"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
