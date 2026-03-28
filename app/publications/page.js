import { Suspense } from 'react'
import { buildMetadata } from '@/lib/metadata'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import PublicationCard from '@/components/publications/PublicationCard'
import PublicationFilter from '@/components/publications/PublicationFilter'
import { getAllContent } from '@/lib/content'

export const metadata = buildMetadata({
  title: 'Publications',
  description: 'Research papers, policy briefs, reports, and toolkits on African democratic governance from the ADGH Knowledge Hub.',
  path: '/publications',
})

function filterPublications(publications, searchParams) {
  let results = [...publications]
  const q = searchParams?.q?.toLowerCase()
  const category = searchParams?.category
  const year = searchParams?.year

  if (q) results = results.filter((p) => p.title?.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q) || p.author?.toLowerCase().includes(q))
  if (category && category !== 'All') results = results.filter((p) => p.category === category)
  if (year && year !== 'All Years') results = results.filter((p) => p.date?.startsWith(year))
  return results
}

export default function PublicationsPage({ searchParams }) {
  const allPublications = getAllContent('publications')
  const filtered = filterPublications(allPublications, searchParams)

  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      {/* Page hero */}
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Publications', href: '/publications' }]} className="mb-6 [&_*]:text-muted" />
          <SectionLabel light>Knowledge Hub</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Publications
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <p className="mt-4 text-cream/70 font-sans max-w-xl leading-relaxed">
            Research papers, policy briefs, reports, and toolkits advancing evidence-based governance advocacy across Africa.
          </p>
        </div>
      </div>

      {/* Filter + grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatedSection className="mb-8">
          <Suspense>
            <PublicationFilter total={filtered.length} />
          </Suspense>
        </AnimatedSection>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-muted mb-2">No publications found</p>
            <p className="text-sm font-sans text-muted">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pub, i) => (
              <AnimatedSection key={pub.slug} delay={i * 0.05}>
                <PublicationCard {...pub} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
