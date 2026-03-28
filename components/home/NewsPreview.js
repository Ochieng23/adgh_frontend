import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import Badge from '@/components/ui/Badge'
import { strings } from '@/lib/strings'
import { getAllContent } from '@/lib/content'
import { formatDate } from '@/lib/utils'

export default function NewsPreview() {
  const articles = getAllContent('news').slice(0, 4)
  if (articles.length === 0) return null

  const [featured, ...rest] = articles

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(242,248,244,0.98))] dark:bg-forest py-24 lg:py-32" aria-labelledby="news-heading">
      <div className="absolute left-0 bottom-0 h-56 w-56 rounded-full bg-forest/12 blur-3xl" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <SectionLabel>{strings.newsLabel}</SectionLabel>
            <h2
              id="news-heading"
              className="mt-3 font-serif font-light text-deep dark:text-cream"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
            >
              {strings.newsTitle}
            </h2>
            <GoldDivider className="mt-3" width="w-16" />
            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-muted">
              {strings.newsIntro}
            </p>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-forest hover:text-gold font-sans text-sm font-medium transition-colors group focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            {strings.newsViewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured article */}
          <AnimatedSection className="lg:col-span-3">
            <Link
              href={`/news/${featured.slug}`}
              className="group block h-full rounded-2xl overflow-hidden border border-forest/15 dark:border-gold/10 hover:border-forest/30 transition-all duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
            >
              <div className="relative aspect-[16/9] bg-forest">
                <Image
                  src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80"
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-4 left-4">
                  <Badge auto>{featured.category}</Badge>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-deep">
                <time className="text-xs font-sans text-muted" dateTime={featured.date}>{formatDate(featured.date)}</time>
                <h3 className="mt-2 font-serif text-xl font-semibold text-deep dark:text-cream group-hover:text-forest transition-colors leading-snug">
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p className="mt-2 text-sm font-sans text-muted leading-relaxed line-clamp-2">{featured.excerpt}</p>
                )}
              </div>
            </Link>
          </AnimatedSection>

          {/* Stacked smaller articles */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((article, i) => (
              <AnimatedSection key={article.slug} delay={(i + 1) * 0.1}>
                <Link
                  href={`/news/${article.slug}`}
                  className="group flex gap-4 rounded-xl border border-forest/15 dark:border-gold/10 p-4 transition-all duration-200 hover:border-forest/30 hover:bg-forest/[0.06] dark:hover:bg-forest/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge auto className="text-[10px]">{article.category}</Badge>
                      <time className="text-xs font-sans text-muted" dateTime={article.date}>{formatDate(article.date, 'MMM d, yyyy')}</time>
                    </div>
                    <h3 className="font-serif text-base font-semibold text-deep dark:text-cream group-hover:text-forest transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
