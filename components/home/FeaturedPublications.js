import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import PublicationCard from '@/components/publications/PublicationCard'
import { strings } from '@/lib/strings'
import { getFeaturedContent } from '@/lib/content'

export default function FeaturedPublications() {
  const publications = getFeaturedContent('publications', 3)

  if (publications.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(242,248,244,0.98),rgba(255,255,255,1))] dark:bg-deep py-24 lg:py-32" aria-labelledby="publications-heading">
      <div className="absolute right-0 top-12 h-56 w-56 rounded-full bg-forest/12 blur-3xl" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <SectionLabel>{strings.publicationsLabel}</SectionLabel>
            <h2
              id="publications-heading"
              className="mt-3 font-serif font-light text-deep dark:text-cream"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
            >
              {strings.publicationsTitle}
            </h2>
            <GoldDivider className="mt-3" width="w-16" />
            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted">
              {strings.publicationsIntro}
            </p>
          </div>
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-forest hover:text-gold font-sans text-sm font-medium transition-colors group focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            {strings.publicationsViewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((pub, i) => (
            <AnimatedSection key={pub.slug} delay={i * 0.1}>
              <PublicationCard {...pub} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
