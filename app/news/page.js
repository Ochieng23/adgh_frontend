import { buildMetadata } from '@/lib/metadata'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import NewsCard from '@/components/news/NewsCard'
import { getAllContent } from '@/lib/content'

export const metadata = buildMetadata({
  title: 'News & Updates',
  description: 'Latest news, press releases, and updates from the African Democracy and Governance Hub.',
  path: '/news',
})

const categories = ['All', 'Press Release', 'Blog', 'In The Media', 'Event Report']

export default function NewsPage({ searchParams }) {
  const allNews = getAllContent('news')
  const activeCategory = searchParams?.category || 'All'
  const filtered = activeCategory === 'All' ? allNews : allNews.filter((n) => n.category === activeCategory)
  const [featured, ...rest] = filtered

  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'News', href: '/news' }]} className="mb-6 [&_*]:text-muted" />
          <SectionLabel light>Latest Updates</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            News & Updates
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category filter */}
        <AnimatedSection className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by category">
          {categories.map((cat) => (
            <a
              key={cat}
              href={cat === 'All' ? '/news' : `/news?category=${encodeURIComponent(cat)}`}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all focus-visible:ring-2 focus-visible:ring-gold ${
                activeCategory === cat
                  ? 'bg-gold text-deep'
                  : 'bg-white dark:bg-forest text-muted hover:text-gold border border-body/20 dark:border-gold/20'
              }`}
            >
              {cat}
            </a>
          ))}
        </AnimatedSection>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-muted">No articles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <AnimatedSection key={article.slug} delay={i * 0.05}>
                <NewsCard {...article} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
