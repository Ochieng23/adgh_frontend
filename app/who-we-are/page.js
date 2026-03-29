import Image from 'next/image'
import { buildMetadata } from '@/lib/metadata'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import { strings } from '@/lib/strings'
import { BookOpen, Scale, Users, Lightbulb } from 'lucide-react'

export const metadata = buildMetadata({
  title: 'Who We Are',
  description: 'Learn about the African Democracy and Governance Hub — our story, mission, vision, and the pillars that guide our work.',
  path: '/who-we-are',
})

const pillars = [
  {
    icon: Scale,
    title: 'Legal & Policy Frameworks',
    desc: 'Rooted in ACDEG, AU Agenda 2063, and SDG 16 — our work is anchored in the continent\'s foremost democratic governance instruments.',
  },
  {
    icon: BookOpen,
    title: 'Core Governance Issues',
    desc: 'We address constitutionalism, separation of powers, the rule of law, and democratic processes as foundational governance imperatives.',
  },
  {
    icon: Users,
    title: 'Democratic Processes & Reforms',
    desc: 'From elections and civil society to institutional reform — we support the full spectrum of democratic governance transformation.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation & Participation',
    desc: 'Civic technology, digital democracy, youth empowerment, and women\'s leadership as catalysts for a new democratic generation.',
  },
]

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      {/* Hero */}
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Who We Are', href: '/who-we-are' }]} className="mb-6 [&_*]:text-muted" />
          <SectionLabel light>Our Story</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Who We Are
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <p className="mt-4 text-cream/70 font-sans max-w-2xl leading-relaxed">
            The African Democracy and Governance Hub is an independent, non-profit pan-African NGO dedicated to advancing democratic governance, civic participation, and accountable institutions across the continent.
          </p>
        </div>
      </div>

      {/* Origin story */}
      <section className="py-20 lg:py-28" aria-labelledby="story-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <SectionLabel>Our Origin</SectionLabel>
              <h2 id="story-heading" className="mt-3 font-serif font-light text-deep dark:text-cream clamp-h2">
                Born from Africa, for Africa
              </h2>
              <GoldDivider className="mt-4 mb-6" width="w-16" />
              <div className="space-y-4 font-sans text-body dark:text-cream/80 leading-relaxed">
                <p>
                  The African Democracy and Governance Hub was founded with a singular conviction: that democratic governance in Africa must be championed, sustained, and advanced by Africans — drawing on the continent&apos;s rich traditions of community governance, consensus-building, and collective accountability.
                </p>
                <p>
                  Established as an independent, non-partisan institution, ADGH was created to fill a critical gap in the African governance landscape — an organisation with deep continental roots, rigorous research capabilities, and the convening power to bring together governments, civil society, academia, and citizens around shared democratic governance goals.
                </p>
                <p>
                  Our founding mandate aligns fully with the African Charter on Democracy, Elections and Governance (ACDEG) and the African Union&apos;s Agenda 2063 vision of &ldquo;An Africa of good governance, democracy, respect for human rights, justice and the rule of law.&rdquo;
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
                  alt="African governance leaders in dialogue"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-deep/40 to-transparent" aria-hidden="true" />
              </div>
              <div className="mt-4 inline-block rounded-xl bg-gold px-5 py-3 text-deep shadow-lg sm:absolute sm:-bottom-6 sm:-left-6 sm:mt-0 sm:px-6 sm:py-4">
                <p className="font-serif text-2xl font-semibold">100%</p>
                <p className="font-sans text-xs font-medium">African-Led</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission card */}
      <section className="bg-forest py-16" aria-labelledby="mission-card-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <SectionLabel light>Our Mission</SectionLabel>
            <h2 id="mission-card-heading" className="sr-only">Mission Statement</h2>
            <blockquote className="mt-6 font-serif text-cream gold-border-left text-left max-w-3xl mx-auto">
              <p className="text-xl font-light leading-relaxed" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}>
                &ldquo;{strings.missionText}&rdquo;
              </p>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-deep py-16" aria-labelledby="vision-card-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <SectionLabel light>Our Vision</SectionLabel>
            <h2 id="vision-card-heading" className="sr-only">Vision Statement</h2>
            <blockquote className="mt-6 font-serif italic text-cream/90 text-center mx-auto" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
              <p className="font-light leading-relaxed">&ldquo;{strings.visionText}&rdquo;</p>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* Four pillars */}
      <section className="py-20 lg:py-28 bg-warm dark:bg-deep" aria-labelledby="pillars-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionLabel>Our Foundation</SectionLabel>
            <h2 id="pillars-heading" className="mt-3 font-serif font-light text-deep dark:text-cream clamp-h2">
              Four Background Pillars
            </h2>
            <GoldDivider center className="mt-4" width="w-16" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <AnimatedSection key={pillar.title} delay={i * 0.1}>
                  <div className="h-full rounded-2xl border border-body/10 bg-white p-6 transition-colors hover:border-gold/30 sm:p-8 dark:border-gold/10 dark:bg-forest">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-gold" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-deep dark:text-cream mb-3">{pillar.title}</h3>
                    <p className="font-sans text-sm text-muted leading-relaxed">{pillar.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
