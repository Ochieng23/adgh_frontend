'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useReducedMotion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import { strings } from '@/lib/strings'

const stats = [
  { value: strings.impactStat1Value, label: strings.impactStat1Label, numericEnd: 54 },
  { value: strings.impactStat2Value, label: strings.impactStat2Label, numericEnd: 6 },
  { value: strings.impactStat3Value, label: strings.impactStat3Label, numericEnd: 2063 },
  { value: strings.impactStat4Value, label: strings.impactStat4Label, numericEnd: 100 },
]

function CountUp({ value, numericEnd, started }) {
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState('0')
  const frameRef = useRef(null)

  useEffect(() => {
    if (!started || prefersReduced) {
      setDisplay(value)
      return
    }

    const isPercent = value.includes('%')
    const isPlus = value.includes('+')
    const duration = 2000
    const start = performance.now()

    function step(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numericEnd)
      setDisplay(`${current}${isPlus ? '+' : ''}${isPercent ? '%' : ''}`)
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }

    frameRef.current = requestAnimationFrame(step)
    return () => frameRef.current && cancelAnimationFrame(frameRef.current)
  }, [started, prefersReduced, value, numericEnd])

  return <span>{display}</span>
}

export default function ImpactNumbers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} className="section-shell py-20 dark:bg-deep lg:py-24" aria-labelledby="impact-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <SectionLabel>{strings.impactLabel}</SectionLabel>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted">
            {strings.impactIntro}
          </p>
        </div>
        <dl id="impact-heading" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.75rem] border border-forest/15 bg-[linear-gradient(180deg,rgba(245,248,246,0.98),rgba(255,255,255,0.98))] px-6 py-8 text-center shadow-[0_22px_60px_-50px_rgba(14,26,20,0.45)] dark:bg-forest"
              role="listitem"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <div
                  className="mb-2 font-serif text-forest dark:text-cream"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  <CountUp value={stat.value} numericEnd={stat.numericEnd} started={inView} />
                </div>
                <p className="font-sans text-sm font-medium uppercase tracking-widest text-forest/65 dark:text-cream/65">
                  {stat.label}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
