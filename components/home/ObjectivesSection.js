import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import { objectives } from '@/lib/data/objectives'
import { strings } from '@/lib/strings'

function ObjectiveCard({ objective, index }) {
  const Icon = Icons[objective.icon] || Icons.Circle

  return (
    <AnimatedSection delay={index * 0.08}>
      <Link
        href={`/our-work/${objective.slug}`}
        className="group block h-full rounded-[1.75rem] border border-forest/15 bg-[linear-gradient(180deg,rgba(245,248,246,0.98),rgba(255,255,255,0.98))] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-[0_26px_70px_-50px_rgba(14,26,20,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold dark:bg-forest lg:p-8"
        aria-label={`Learn about ${objective.title}`}
      >
        <div className="mb-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-forest via-sage to-gold/70" aria-hidden="true" />
        <div className="mb-4 flex items-start gap-4">
          <span className="select-none flex-shrink-0 font-serif text-3xl font-light leading-none text-forest" aria-hidden="true">
            {objective.number}
          </span>
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-forest/10 transition-colors group-hover:bg-forest/15">
            <Icon className="h-5 w-5 text-forest" aria-hidden="true" />
          </div>
        </div>
        <h3 className="mb-3 font-serif text-lg font-semibold text-deep transition-colors group-hover:text-forest dark:text-cream dark:group-hover:text-gold-light">
          {objective.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-muted">
          {objective.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-sm font-sans text-forest/55 transition-colors group-hover:text-forest" aria-hidden="true">
          <span className="text-xs">Learn more</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </AnimatedSection>
  )
}

export default function ObjectivesSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(245,248,246,0.98))] py-24 dark:bg-deep lg:py-32" aria-labelledby="objectives-heading">
      <div className="absolute inset-y-0 left-0 w-64 bg-forest/6 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-16 max-w-2xl text-center">
          <SectionLabel>{strings.objectivesLabel}</SectionLabel>
          <h2
            id="objectives-heading"
            className="mt-3 font-serif text-deep dark:text-cream"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            {strings.objectivesTitle}
          </h2>
          <GoldDivider center className="mt-4" width="w-16" />
          <p className="mt-4 font-sans leading-relaxed text-muted">{strings.objectivesIntro}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((obj, i) => (
            <ObjectiveCard key={obj.slug} objective={obj} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
