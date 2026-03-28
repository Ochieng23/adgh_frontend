'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import { strings } from '@/lib/strings'

const quotes = [
  {
    text: 'Democracy is not just about elections — it is about how power is exercised every day.',
    author: 'Nelson Mandela',
    role: 'Former President of South Africa',
  },
  {
    text: 'Good governance and democracy are prerequisites for peace, stability and development in Africa.',
    author: 'Kofi Annan',
    role: 'Former UN Secretary-General',
  },
  {
    text: "Africa's greatest resource is not its minerals — it is its people, governed well.",
    author: 'Ellen Johnson Sirleaf',
    role: 'Former President of Liberia',
  },
]

const stats = [
  strings.heroStat1,
  strings.heroStat2,
  strings.heroStat3,
  strings.heroStat4,
]

function QuoteCard() {
  const [idx, setIdx] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const timer = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 5000)
    return () => clearInterval(timer)
  }, [prefersReduced])

  const q = quotes[idx]

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-gold/15 bg-[linear-gradient(180deg,rgba(27,51,38,0.98),rgba(14,26,20,0.98))] p-6 shadow-[0_32px_80px_-56px_rgba(14,26,20,0.6)] lg:p-8">
      <div
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sage/18 via-gold/6 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gold/6 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="mb-2 font-serif text-6xl leading-none text-gold/30" aria-hidden="true">
          &ldquo;
        </div>
        <motion.blockquote
          key={idx}
          initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-serif text-lg leading-relaxed italic text-cream/90"
        >
          {q.text}
        </motion.blockquote>
        <motion.footer
          key={`footer-${idx}`}
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-8 bg-gold" aria-hidden="true" />
          <div>
            <div className="text-sm font-sans font-medium text-gold-light">{q.author}</div>
            <div className="text-xs font-sans text-cream/55">{q.role}</div>
          </div>
        </motion.footer>

        <div className="mt-4 flex gap-2" role="tablist" aria-label="Quote navigation">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Quote ${i + 1}`}
              className={`h-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-gold ${i === idx ? 'w-6 bg-gold' : 'w-2 bg-cream/20 hover:bg-gold/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function HeroSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden" aria-label="Hero — About African Democracy & Governance Hub">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #C9973A 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      <div className="absolute left-0 top-0 h-[30rem] w-[30rem] rounded-full bg-gold/8 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-forest/14 blur-3xl" aria-hidden="true" />
      <div
        className="absolute right-0 top-1/2 hidden h-[30rem] w-[38%] -translate-y-1/2 rounded-l-[3rem] bg-[linear-gradient(180deg,rgba(27,51,38,0.12),rgba(14,26,20,0.04))] lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-16">
          <motion.div variants={prefersReduced ? {} : containerVariants} initial="hidden" animate="visible">
            <motion.div variants={prefersReduced ? {} : itemVariants}>
              <SectionLabel>{strings.heroLabel}</SectionLabel>
            </motion.div>

            <motion.h1
              variants={prefersReduced ? {} : itemVariants}
              className="mt-4 text-balance font-serif font-light leading-[0.98] text-deep dark:text-cream"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              African Democracy
              <span className="mt-1 block italic text-forest dark:text-gold-light">
                &amp; Governance Hub
              </span>
            </motion.h1>

            <motion.p
              variants={prefersReduced ? {} : itemVariants}
              className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-body/80 dark:text-cream/70"
            >
              {strings.heroSubtext}
            </motion.p>

            <motion.div variants={prefersReduced ? {} : itemVariants} className="mt-8 flex flex-wrap gap-3">
              <Button href="/our-work" variant="primary" size="lg">
                {strings.heroCta1}
              </Button>
              <Button href="/publications" variant="secondary" size="lg">
                {strings.heroCta2}
              </Button>
            </motion.div>

            <motion.div
              variants={prefersReduced ? {} : itemVariants}
              className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2"
              role="list"
              aria-label="Key statistics"
            >
              {stats.map((stat) => (
                <div
                  key={stat}
                  role="listitem"
                  className="inline-flex items-center rounded-2xl border border-forest/20 bg-[linear-gradient(180deg,rgba(241,247,243,0.98),rgba(255,255,255,0.98))] px-4 py-3 text-sm font-sans text-body/80 shadow-[0_16px_50px_-42px_rgba(14,26,20,0.35)] dark:bg-forest/60 dark:text-cream/85"
                >
                  <span className="mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-forest" aria-hidden="true" />
                  {stat}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="relative"
          >
            <div
              className="absolute -inset-4 hidden rounded-[2.5rem] border border-forest/10 bg-forest/[0.04] lg:block"
              aria-hidden="true"
            />
            <div
              className="absolute -left-4 top-12 hidden h-24 w-24 rounded-full border border-gold/20 bg-gold/5 lg:block"
              aria-hidden="true"
            />
            <div
              className="absolute -right-6 bottom-10 hidden h-40 w-40 rounded-full bg-forest/12 blur-3xl lg:block"
              aria-hidden="true"
            />
            <QuoteCard />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden="true" />
    </section>
  )
}
