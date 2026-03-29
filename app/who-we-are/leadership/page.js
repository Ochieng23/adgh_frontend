import Image from 'next/image'
import { Globe, Globe2, Quote } from 'lucide-react'
import { buildMetadata } from '@/lib/metadata'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import Badge from '@/components/ui/Badge'
import { leadership, boardMembers, advisors } from '@/lib/data/team'

export const metadata = buildMetadata({
  title: 'Leadership',
  description: 'Meet the leadership team, board of directors, and advisory panel of the African Democracy and Governance Hub.',
  path: '/who-we-are/leadership',
})

export default function LeadershipPage() {
  const ceo = leadership[0]

  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Who We Are', href: '/who-we-are' }, { label: 'Leadership' }]} className="mb-6 [&_*]:text-muted" />
          <SectionLabel light>Our People</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Leadership
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
        </div>
      </div>

      {/* CEO profile */}
      <section className="py-20 lg:py-28" aria-labelledby="ceo-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <SectionLabel>Executive Leadership</SectionLabel>
            <h2 id="ceo-heading" className="mt-2 font-serif font-light text-deep dark:text-cream" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Chief Executive Officer
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Photo */}
            <AnimatedSection className="lg:col-span-2">
              <div className="relative sm:pb-14">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80"
                    alt={`${ceo.name} — ${ceo.role}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/40 to-transparent" aria-hidden="true" />
                </div>
                <div className="mt-4 rounded-xl border border-gold/20 bg-forest p-4 shadow-xl sm:absolute sm:-bottom-4 sm:left-4 sm:right-4 sm:mt-0">
                  <p className="font-serif text-cream font-semibold">{ceo.name}</p>
                  <p className="font-sans text-gold text-xs font-medium mt-0.5">{ceo.role}</p>
                  <div className="flex gap-2 mt-3">
                    {ceo.linkedin && (
                      <a href={ceo.linkedin} aria-label="LinkedIn profile" className="text-muted hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded">
                        <Globe className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                    {ceo.twitter && (
                      <a href={ceo.twitter} aria-label="Twitter/X profile" className="text-muted hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded">
                        <Globe2 className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Bio */}
            <AnimatedSection delay={0.2} className="lg:col-span-3 pt-4">
              <div className="flex flex-wrap gap-2 mb-6">
                {ceo.credentials.map((c) => (
                  <span key={c} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-sans bg-gold/10 text-gold border border-gold/20">
                    {c}
                  </span>
                ))}
              </div>

              {ceo.quote && (
                <blockquote className="border-l-4 border-gold pl-6 mb-8 font-serif italic text-deep dark:text-cream/90 text-lg leading-relaxed">
                  <Quote className="w-5 h-5 text-gold/50 mb-2" aria-hidden="true" />
                  &ldquo;{ceo.quote}&rdquo;
                </blockquote>
              )}

              <div className="space-y-4 font-sans text-body dark:text-cream/80 leading-relaxed">
                {ceo.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="bg-white dark:bg-forest py-20" aria-labelledby="board-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10">
            <SectionLabel>Governance</SectionLabel>
            <h2 id="board-heading" className="mt-2 font-serif font-light text-deep dark:text-cream" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Board of Directors
            </h2>
            <GoldDivider className="mt-4" width="w-16" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {boardMembers.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.08}>
                <div className="bg-warm dark:bg-deep rounded-xl p-5 border border-body/10 dark:border-gold/10">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-3 font-serif text-gold font-semibold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-serif font-semibold text-deep dark:text-cream">{member.name}</h3>
                  <p className="text-xs font-sans text-gold mt-0.5">{member.role}</p>
                  <p className="text-xs font-sans text-muted mt-1">{member.affiliation}</p>
                  <p className="text-xs font-sans text-muted/70 mt-0.5">{member.country}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory panel */}
      <section className="py-16" aria-labelledby="advisory-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8">
            <SectionLabel>Expert Guidance</SectionLabel>
            <h2 id="advisory-heading" className="mt-2 font-serif font-light text-deep dark:text-cream" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Advisory Panel
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advisors.map((advisor, i) => (
              <AnimatedSection key={advisor.name} delay={i * 0.06}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-forest border border-body/10 dark:border-gold/10">
                  <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 font-serif text-gold text-sm font-semibold">
                    {advisor.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans font-medium text-deep dark:text-cream text-sm truncate">{advisor.name}</p>
                    <p className="font-sans text-xs text-muted truncate">{advisor.title}</p>
                    <p className="font-sans text-xs text-gold/70">{advisor.country}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
