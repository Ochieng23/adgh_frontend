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
                    src={ceo.image}
                    alt={`${ceo.name} - ${ceo.role}`}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.08} className="h-full">
                <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-body/10 dark:border-gold/10 bg-warm dark:bg-deep shadow-md">
                  <div className="relative aspect-[3/4] w-full">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gold/10 font-serif text-gold font-semibold text-4xl">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" aria-hidden="true" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-deep dark:text-cream">{member.name}</h3>
                    <p className="text-xs font-sans text-gold mt-1 leading-relaxed">{member.role}</p>
                  </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor, i) => (
              <AnimatedSection key={advisor.name} delay={i * 0.06} className="h-full">
                <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-body/10 dark:border-gold/10 bg-white dark:bg-forest shadow-md">
                  <div className="relative aspect-[3/4] w-full">
                    {advisor.image ? (
                      <Image
                        src={advisor.image}
                        alt={advisor.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-sage/20 font-serif text-gold font-semibold text-4xl">
                        {advisor.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" aria-hidden="true" />
                  </div>
                  <div className="p-5">
                    <p className="font-serif font-semibold text-deep dark:text-cream">{advisor.name}</p>
                    <p className="font-sans text-xs text-gold mt-1 leading-relaxed">{advisor.role}</p>
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
