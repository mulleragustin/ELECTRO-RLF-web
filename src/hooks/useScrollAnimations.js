import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reusable GSAP ScrollTrigger animations for page sections.
 * Attach refs to containers and call the returned helpers,
 * or use the automatic `data-animate` attribute system.
 *
 * Supported data-animate values:
 *   "fade-up"      – fade in + slide up
 *   "fade-right"   – fade in + slide from left
 *   "fade-left"    – fade in + slide from right
 *   "scale-in"     – fade in + scale from 0.85
 *   "stagger-up"   – parent: children stagger fade-up
 */
export default function useScrollAnimations(containerRef) {
  const ctx = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    ctx.current = gsap.context(() => {
      // ── fade-up ──
      gsap.utils.toArray('[data-animate="fade-up"]', container).forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── fade-right ──
      gsap.utils.toArray('[data-animate="fade-right"]', container).forEach((el) => {
        gsap.from(el, {
          x: -60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── fade-left ──
      gsap.utils.toArray('[data-animate="fade-left"]', container).forEach((el) => {
        gsap.from(el, {
          x: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── scale-in ──
      gsap.utils.toArray('[data-animate="scale-in"]', container).forEach((el) => {
        gsap.from(el, {
          scale: 0.85,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── stagger-up (parent container – animates direct children) ──
      gsap.utils.toArray('[data-animate="stagger-up"]', container).forEach((parent) => {
        const children = parent.children
        if (!children.length) return

        gsap.from(children, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── Hero entrance (runs immediately, no scroll needed) ──
      const heroTimeline = gsap.utils.toArray('[data-animate="hero"]', container)
      if (heroTimeline.length) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        heroTimeline.forEach((el, i) => {
          tl.from(
            el,
            {
              y: 32,
              opacity: 0,
              duration: 0.8,
            },
            i * 0.15,
          )
        })
      }

      // ── Hero image (clip-path reveal) ──
      gsap.utils.toArray('[data-animate="hero-image"]', container).forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(12% 12% 12% 12%)',
          opacity: 0,
          duration: 1.1,
          ease: 'power4.out',
          delay: 0.3,
        })
      })

      // ── Hero card (float in) ──
      gsap.utils.toArray('[data-animate="hero-card"]', container).forEach((el) => {
        gsap.from(el, {
          y: 40,
          x: -20,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.7,
        })
      })

      // ── Section titles with line draw ──
      gsap.utils.toArray('[data-animate="title"]', container).forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── Counter / number pop ──
      gsap.utils.toArray('[data-animate="number-pop"]', container).forEach((el) => {
        gsap.from(el, {
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── Parallax subtle (images that shift slightly on scroll) ──
      gsap.utils.toArray('[data-animate="parallax"]', container).forEach((el) => {
        gsap.to(el, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })

      // ── Line draw (horizontal lines that grow) ──
      gsap.utils.toArray('[data-animate="line-draw"]', container).forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, container)

    return () => {
      ctx.current?.revert()
    }
  }, [containerRef])
}
