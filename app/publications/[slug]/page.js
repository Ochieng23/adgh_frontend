import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Download, ArrowLeft, Calendar, User, Tag, Share2, Link as LinkIcon } from 'lucide-react'
import { buildArticleMetadata } from '@/lib/metadata'
import { getContentBySlug, getAllContent, getRelatedContent } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GoldDivider from '@/components/ui/GoldDivider'
import PublicationCard from '@/components/publications/PublicationCard'

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false })

export async function generateStaticParams() {
  const publications = getAllContent('publications')
  return publications.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const pub = getContentBySlug('publications', params.slug)
  if (!pub) return {}
  return buildArticleMetadata({
    title: pub.title,
    description: pub.excerpt,
    path: `/publications/${params.slug}`,
    author: pub.author,
    publishedTime: pub.date,
    tags: pub.tags,
  })
}

export default function PublicationPage({ params }) {
  const pub = getContentBySlug('publications', params.slug)
  if (!pub) notFound()

  const related = getRelatedContent('publications', params.slug, pub.tags || [], 3)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adgh.org'
  const pageUrl = `${siteUrl}/publications/${params.slug}`

  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      {/* Header */}
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Publications', href: '/publications' },
              { label: pub.title },
            ]}
            className="mb-6 [&_*]:text-muted"
          />
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge auto>{pub.category}</Badge>
            {pub.tags?.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-sans bg-forest text-muted border border-gold/10">
                <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-serif font-light text-cream max-w-3xl" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            {pub.title}
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted font-sans">
            {pub.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" aria-hidden="true" />
                {pub.author}
              </span>
            )}
            {pub.date && (
              <time dateTime={pub.date} className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {formatDate(pub.date)}
              </time>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <AnimatedSection>
              <article className="prose prose-lg prose-adgh dark:prose-invert max-w-none">
                {pub.excerpt && (
                  <blockquote className="not-prose border-l-4 border-gold pl-6 mb-8 font-serif text-xl italic text-body dark:text-cream/80 leading-relaxed">
                    {pub.excerpt}
                  </blockquote>
                )}
                <ReactMarkdown>{pub.content}</ReactMarkdown>
              </article>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Download */}
            {pub.downloadUrl && (
              <div className="bg-white dark:bg-forest rounded-2xl p-6 border border-body/10 dark:border-gold/10">
                <h2 className="font-serif text-lg font-semibold text-deep dark:text-cream mb-4">Download</h2>
                <a
                  href={pub.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 rounded-xl bg-gold text-deep font-sans font-medium text-sm hover:bg-gold-light transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download PDF
                </a>
              </div>
            )}

            {/* Citation */}
            <div className="bg-white dark:bg-forest rounded-2xl p-6 border border-body/10 dark:border-gold/10">
              <h2 className="font-serif text-lg font-semibold text-deep dark:text-cream mb-3">Citation</h2>
              <p className="text-xs font-sans text-muted leading-relaxed font-mono bg-warm dark:bg-deep/50 p-3 rounded-lg">
                {pub.author}. ({pub.date ? new Date(pub.date).getFullYear() : 'n.d.'}). <em>{pub.title}</em>. African Democracy and Governance Hub.
              </p>
            </div>

            {/* Share */}
            <div className="bg-white dark:bg-forest rounded-2xl p-6 border border-body/10 dark:border-gold/10">
              <h2 className="font-serif text-lg font-semibold text-deep dark:text-cream mb-4">Share</h2>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pub.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-warm dark:bg-deep/50 text-xs font-sans text-muted hover:text-gold transition-colors"
                  aria-label="Share on Twitter/X"
                >
                  Twitter/X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-warm dark:bg-deep/50 text-xs font-sans text-muted hover:text-gold transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related publications */}
        {related.length > 0 && (
          <AnimatedSection className="mt-20">
            <h2 className="font-serif text-2xl font-light text-deep dark:text-cream mb-8">Related Publications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((pub) => (
                <PublicationCard key={pub.slug} {...pub} />
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  )
}
