import { Target, Eye, Users, Globe, BookOpen } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import { strings } from '@/lib/strings'

const pillars = [
  { icon: Users, label: 'Citizen-Centered' },
  { icon: Globe, label: 'Pan-African' },
  { icon: BookOpen, label: 'Evidence-Based' },
]

export default function MissionVisionSection() {
  return (
    <section className="section-shell py-24 dark:bg-deep lg:py-32" aria-labelledby="mission-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16 text-center">
          <SectionLabel>{strings.missionLabel}</SectionLabel>
          <GoldDivider center className="mt-4" width="w-24" />
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted">
            {strings.missionIntro}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <AnimatedSection delay={0.1}>
            <article className="relative h-full overflow-hidden rounded-[2rem] border border-forest/20 bg-[linear-gradient(180deg,rgba(248,251,249,0.98),rgba(255,255,255,0.98))] p-8 shadow-[0_28px_70px_-52px_rgba(14,26,20,0.45)] dark:bg-forest lg:p-10">
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/10" aria-hidden="true" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
                    <Target className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <h2 id="mission-heading" className="font-serif text-2xl font-light text-deep dark:text-cream">
                    {strings.missionTitle}
                  </h2>
                </div>
                <p className="font-sans text-base leading-relaxed text-body/80 dark:text-cream/80">
                  {strings.missionText}
                </p>
              </div>
            </article>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <article className="relative h-full overflow-hidden rounded-[2rem] border border-forest/20 bg-[linear-gradient(180deg,rgba(242,248,244,0.98),rgba(255,255,255,0.98))] p-8 dark:bg-deep lg:p-10">
              <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/12" aria-hidden="true" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/10">
                    <Eye className="h-5 w-5 text-forest" aria-hidden="true" />
                  </div>
                  <h2 className="font-serif text-2xl font-light italic text-deep dark:text-cream">
                    {strings.visionTitle}
                  </h2>
                </div>
                <blockquote className="border-l-2 border-gold/30 pl-4 font-serif text-lg italic leading-relaxed text-body/80 dark:text-cream/80">
                  &ldquo;{strings.visionText}&rdquo;
                </blockquote>
              </div>
            </article>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3} className="mt-12">
          <div className="flex flex-wrap justify-center gap-6" role="list" aria-label="Core pillars">
            {pillars.map(({ icon: Icon, label }) => (
              <div
                key={label}
                role="listitem"
                className="flex items-center gap-3 rounded-xl border border-forest/20 bg-[linear-gradient(180deg,rgba(244,248,245,0.98),rgba(255,255,255,0.98))] px-6 py-4 shadow-sm dark:bg-forest"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest/10">
                  <Icon className="h-4 w-4 text-forest" aria-hidden="true" />
                </div>
                <span className="text-sm font-sans font-medium text-body dark:text-cream">{label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
