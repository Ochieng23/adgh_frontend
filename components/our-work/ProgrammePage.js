import Link from 'next/link'
import Image from 'next/image'
import * as Icons from 'lucide-react'
import { CheckCircle, ArrowRight, Users } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function ProgrammePage({ objective }) {
  const Icon = Icons[objective.icon] || Icons.Circle

  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      {/* Hero */}
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Our Work', href: '/our-work' },
              { label: objective.title },
            ]}
            className="mb-6 [&_*]:text-muted"
          />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-gold" aria-hidden="true" />
            </div>
            <span className="font-serif text-gold text-3xl font-light">{objective.number}</span>
          </div>
          <SectionLabel light>Programme Area</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {objective.title}
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <p className="mt-4 text-cream/70 font-sans max-w-2xl leading-relaxed">
            {objective.description}
          </p>
        </div>
      </div>

      {/* Main content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <AnimatedSection className="lg:col-span-2 space-y-8">
              <div>
                <SectionLabel>Overview</SectionLabel>
                <p className="mt-4 font-sans text-body dark:text-cream/80 leading-relaxed text-lg">
                  {objective.fullDescription}
                </p>
              </div>

              {/* Activities */}
              <div>
                <h2 className="font-serif text-2xl font-light text-deep dark:text-cream mb-4">Key Activities</h2>
                <GoldDivider className="mb-6" width="w-12" />
                <ul className="space-y-3" role="list">
                  {objective.activities?.map((activity) => (
                    <li key={activity} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-sans text-body dark:text-cream/80">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div>
                <h2 className="font-serif text-2xl font-light text-deep dark:text-cream mb-4">Expected Outcomes</h2>
                <GoldDivider className="mb-6" width="w-12" />
                <ul className="space-y-3" role="list">
                  {objective.outcomes?.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-forest border border-body/10 dark:border-gold/10">
                      <ArrowRight className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-sans text-body dark:text-cream/80 text-sm">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Sidebar */}
            <AnimatedSection delay={0.2} className="space-y-6">
              {/* Other programmes */}
              <div className="bg-white dark:bg-forest rounded-2xl p-6 border border-body/10 dark:border-gold/10">
                <h2 className="font-serif text-lg font-semibold text-deep dark:text-cream mb-4">All Programme Areas</h2>
                <nav aria-label="Programme areas">
                  <ul className="space-y-2" role="list">
                    {[
                      { slug: 'democratic-principles', label: 'Democratic Principles' },
                      { slug: 'institutional-capacity', label: 'Institutional Capacity' },
                      { slug: 'civic-engagement', label: 'Civic Engagement' },
                      { slug: 'conflict-prevention', label: 'Conflict Prevention' },
                      { slug: 'governance-accountability', label: 'Governance & Accountability' },
                      { slug: 'information-exchange', label: 'Information Exchange' },
                    ].map((prog) => (
                      <li key={prog.slug}>
                        <Link
                          href={`/our-work/${prog.slug}`}
                          className={`text-sm font-sans block px-3 py-2 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-gold ${
                            prog.slug === objective.slug
                              ? 'bg-gold/10 text-gold font-medium'
                              : 'text-muted hover:text-gold hover:bg-warm dark:hover:bg-deep/50'
                          }`}
                        >
                          {prog.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* CTA */}
              <div className="bg-forest rounded-2xl p-6 text-center border border-gold/20">
                <Users className="w-8 h-8 text-gold mx-auto mb-3" aria-hidden="true" />
                <h2 className="font-serif text-lg font-semibold text-cream mb-2">Partner With Us</h2>
                <p className="text-sm font-sans text-muted leading-relaxed mb-4">
                  Interested in collaborating on this programme area?
                </p>
                <Button href="/contact?subject=Partnership" variant="primary" size="sm" className="w-full justify-center">
                  Get in Touch
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
