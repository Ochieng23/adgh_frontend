import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import { buildArticleMetadata } from '@/lib/metadata'
import { getContentBySlug, getAllContent } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GoldDivider from '@/components/ui/GoldDivider'
import NewsCard from '@/components/news/NewsCard'

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false })

export async function generateStaticParams() {
  return getAllContent('news').map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }) {
  const article = getContentBySlug('news', params.slug)
  if (!article) return {}
  return buildArticleMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${params.slug}`,
    author: article.author,
    publishedTime: article.date,
  })
}

export default function NewsArticlePage({ params }) {
  const article = getContentBySlug('news', params.slug)
  if (!article) notFound()

  const allNews = getAllContent('news')
  const related = allNews.filter((n) => n.slug !== params.slug).slice(0, 3)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adgh.org'
  const pageUrl = `${siteUrl}/news/${params.slug}`

  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      {/* Hero image */}
      <div className="relative bg-deep pt-16 min-h-[50vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80"
            alt={article.title}
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/70 to-transparent" aria-hidden="true" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
          <Breadcrumb
            items={[{ label: 'News', href: '/news' }, { label: article.title }]}
            className="mb-6 [&_*]:text-muted"
          />
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge auto>{article.category}</Badge>
          </div>
          <h1 className="font-serif font-light text-cream" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
            {article.title}
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted font-sans">
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" aria-hidden="true" />
                {article.author}
              </span>
            )}
            {article.date && (
              <time dateTime={article.date} className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {formatDate(article.date)}
              </time>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatedSection>
          <article className="prose prose-lg prose-adgh dark:prose-invert max-w-none">
            {article.excerpt && (
              <blockquote className="not-prose border-l-4 border-gold pl-6 mb-8 font-serif text-xl italic text-body dark:text-cream/80 leading-relaxed">
                {article.excerpt}
              </blockquote>
            )}
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </article>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-body/10 dark:border-gold/10 flex flex-wrap gap-3 items-center">
            <span className="text-sm font-sans font-medium text-muted">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full text-xs font-sans bg-warm dark:bg-forest text-muted hover:text-gold border border-body/20 dark:border-gold/20 hover:border-gold/30 transition-colors"
            >
              Twitter/X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full text-xs font-sans bg-warm dark:bg-forest text-muted hover:text-gold border border-body/20 dark:border-gold/20 hover:border-gold/30 transition-colors"
            >
              LinkedIn
            </a>
          </div>

          {/* Author bio */}
          {article.author && (
            <div className="mt-10 p-6 bg-white dark:bg-forest rounded-2xl border border-body/10 dark:border-gold/10 flex gap-4">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="font-serif font-semibold text-deep dark:text-cream">{article.author}</p>
                <p className="text-sm text-muted font-sans mt-1">African Democracy and Governance Hub Communications Team</p>
              </div>
            </div>
          )}
        </AnimatedSection>

        {/* Related articles */}
        {related.length > 0 && (
          <AnimatedSection className="mt-20">
            <h2 className="font-serif text-2xl font-light text-deep dark:text-cream mb-8">More News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((n) => (
                <NewsCard key={n.slug} {...n} />
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  )
}
