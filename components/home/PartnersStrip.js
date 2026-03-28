'use client'

import { useRef, useEffect } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { partners } from '@/lib/data/partners'
import { strings } from '@/lib/strings'

function PartnerLogo({ partner }) {
  return (
    <div
      className="flex h-12 min-w-[120px] flex-shrink-0 items-center justify-center rounded-xl border border-forest/20 bg-forest/[0.08] px-6 transition-colors hover:border-forest/30 dark:border-gold/10 dark:bg-forest"
      title={partner.name}
    >
      <span className="whitespace-nowrap font-sans text-sm font-semibold text-forest/80 transition-colors hover:text-gold dark:text-muted">
        {partner.acronym}
      </span>
    </div>
  )
}

export default function PartnersStrip() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animFrame
    let position = 0
    const speed = 0.5

    function animate() {
      position += speed
      if (position >= el.scrollWidth / 2) position = 0
      el.style.transform = `translateX(-${position}px)`
      animFrame = requestAnimationFrame(animate)
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mq.matches) animFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animFrame)
  }, [])

  return (
    <section className="bg-[linear-gradient(180deg,rgba(242,248,244,0.98),rgba(255,255,255,1))] dark:bg-deep py-16" aria-labelledby="partners-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <AnimatedSection>
          <SectionLabel>{strings.partnersLabel}</SectionLabel>
          <h2 id="partners-heading" className="mt-2 font-serif text-xl text-deep dark:text-cream">
            {strings.partnersTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-muted">
            {strings.partnersIntro}
          </p>
        </AnimatedSection>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden" aria-hidden="true">
        <div ref={scrollRef} className="flex gap-4 w-max will-change-transform">
          {[...partners, ...partners].map((p, i) => (
            <PartnerLogo key={`${p.acronym}-${i}`} partner={p} />
          ))}
        </div>
      </div>

      {/* Screen-reader list */}
      <ul className="sr-only" role="list" aria-label="Our partners">
        {partners.map((p) => (
          <li key={p.acronym}>{p.name}</li>
        ))}
      </ul>
    </section>
  )
}
