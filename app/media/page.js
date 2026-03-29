import Link from 'next/link'
import { FileText, Mic, Camera, ArrowRight, Download } from 'lucide-react'
import { buildMetadata } from '@/lib/metadata'
import { getAllContent } from '@/lib/content'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'

export const metadata = buildMetadata({
  title: 'Media',
  description: 'Press room, media kit, and contact details for journalists covering African democratic governance.',
  path: '/media',
})

export default function MediaPage() {
  const pressReleases = getAllContent('news')
    .filter((item) => item.category === 'Press Release')
    .slice(0, 4)
  const mediaAssets = getAllContent('media')

  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Media', href: '/media' }]} className="mb-6 [&_*]:text-muted" />
          <SectionLabel light>Press Room</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Media Centre
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <p className="mt-4 text-cream/70 font-sans max-w-xl leading-relaxed">
            Resources, assets, and contact details for journalists and media professionals covering African governance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Press releases */}
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gold" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-2xl font-light text-deep dark:text-cream">Recent Press Releases</h2>
              </div>
              <div className="space-y-3">
                {pressReleases.length > 0 ? (
                  pressReleases.map((pr) => (
                    <Link
                      key={pr.slug}
                      href={`/news/${pr.slug}`}
                      className="flex flex-col items-start gap-4 rounded-xl border border-body/10 bg-white p-5 transition-colors group hover:border-gold/30 focus-visible:ring-2 focus-visible:ring-gold sm:flex-row sm:items-center sm:justify-between dark:border-gold/10 dark:bg-forest"
                    >
                      <div>
                        <p className="font-sans font-medium text-body dark:text-cream text-sm group-hover:text-gold transition-colors">{pr.title}</p>
                        <time dateTime={pr.date} className="text-xs font-sans text-muted mt-0.5 block">
                          {new Date(pr.date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
                    </Link>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-body/15 bg-white px-5 py-6 text-sm font-sans text-muted dark:border-gold/10 dark:bg-forest">
                    No press releases yet. Add the first one from the admin dashboard under News.
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Link href="/news?category=Press+Release" className="text-gold hover:text-gold-light text-sm font-sans flex items-center gap-1.5 group focus-visible:ring-2 focus-visible:ring-gold rounded">
                  View all press releases
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Media assets */}
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Download className="w-5 h-5 text-gold" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-2xl font-light text-deep dark:text-cream">Media Kit</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mediaAssets.length > 0 ? (
                  mediaAssets.map((asset) => (
                    <div key={asset.slug} className="flex flex-col items-start gap-3 rounded-xl border border-body/10 bg-white p-4 transition-colors hover:border-gold/30 sm:flex-row dark:border-gold/10 dark:bg-forest">
                      <FileText className="w-6 h-6 text-muted flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-sans font-medium text-body dark:text-cream line-clamp-2">{asset.title}</p>
                        <p className="text-xs font-sans text-muted mt-0.5">
                          {asset.type}
                          {asset.size ? ` · ${asset.size}` : ''}
                        </p>
                        {asset.excerpt && (
                          <p className="mt-1.5 text-xs font-sans leading-relaxed text-muted line-clamp-2">{asset.excerpt}</p>
                        )}
                      </div>
                      {asset.assetUrl ? (
                        <a
                          href={asset.assetUrl}
                          aria-label={`Download ${asset.title}`}
                          className="text-gold hover:text-gold-light flex-shrink-0 focus-visible:ring-2 focus-visible:ring-gold rounded"
                        >
                          <Download className="w-4 h-4" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="flex-shrink-0 text-[11px] font-sans uppercase tracking-[0.18em] text-muted">
                          On Request
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="sm:col-span-2 rounded-xl border border-dashed border-body/15 bg-white px-5 py-6 text-sm font-sans text-muted dark:border-gold/10 dark:bg-forest">
                    No media assets yet. Add downloadable files from the admin dashboard under Media Kit.
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Media contacts */}
          <AnimatedSection delay={0.2} className="space-y-6">
            <div className="bg-forest rounded-2xl p-6 border border-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <Mic className="w-5 h-5 text-gold" aria-hidden="true" />
                <h2 className="font-serif text-lg font-semibold text-cream">Media Contact</h2>
              </div>
              <div className="space-y-3 text-sm font-sans">
                <div>
                  <p className="text-gold/70 text-xs uppercase tracking-wide">Press Enquiries</p>
                  <a href="mailto:media@adgh.org" className="text-cream hover:text-gold transition-colors">media@adgh.org</a>
                </div>
                <div>
                  <p className="text-gold/70 text-xs uppercase tracking-wide">Interview Requests</p>
                  <a href="mailto:media@adgh.org" className="text-cream hover:text-gold transition-colors">media@adgh.org</a>
                </div>
              </div>
              <div className="mt-6">
                <Button href="/contact?subject=Media" variant="primary" size="sm" className="w-full justify-center">
                  Contact Media Team
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-forest rounded-2xl p-6 border border-body/10 dark:border-gold/10">
              <Camera className="w-5 h-5 text-gold mb-3" aria-hidden="true" />
              <h2 className="font-serif text-lg font-semibold text-deep dark:text-cream mb-2">Speaking Requests</h2>
              <p className="text-sm font-sans text-muted leading-relaxed mb-4">
                Request ADGH leadership for panels, conferences, or media commentary on African governance.
              </p>
              <Button href="/contact?subject=Speaking+Request" variant="outline" size="sm">
                Submit Request
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
