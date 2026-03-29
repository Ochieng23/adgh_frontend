import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react'
import { buildMetadata } from '@/lib/metadata'
import { getContentBySlug, getAllContent } from '@/lib/content'
import { formatDate } from '@/lib/utils'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false })

export async function generateStaticParams() {
  return getAllContent('events').map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }) {
  const event = getContentBySlug('events', params.slug)
  if (!event) return {}
  return buildMetadata({
    title: event.title,
    description: event.excerpt,
    path: `/events/${params.slug}`,
  })
}

export default function EventPage({ params }) {
  const event = getContentBySlug('events', params.slug)
  if (!event) notFound()

  const isPast = event.status === 'past'

  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: 'Events', href: '/events' }, { label: event.title }]}
            className="mb-6 [&_*]:text-muted"
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {event.type && <Badge auto>{event.type}</Badge>}
            {isPast && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans bg-muted/20 text-muted">Past Event</span>}
          </div>
          <h1 className="font-serif font-light text-cream" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            {event.title}
          </h1>
          <GoldDivider className="mt-4" width="w-16" />

          <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted font-sans">
            {event.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
                {event.endDate
                  ? `${formatDate(event.date, 'MMM d')} – ${formatDate(event.endDate, 'MMM d, yyyy')}`
                  : formatDate(event.date)}
              </span>
            )}
            {event.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
                {event.location}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {event.excerpt && (
                <blockquote className="border-l-4 border-gold pl-6 mb-8 font-serif text-xl italic text-body dark:text-cream/80 leading-relaxed">
                  {event.excerpt}
                </blockquote>
              )}
              {event.content && (
                <div className="prose prose-lg prose-adgh dark:prose-invert max-w-none">
                  <ReactMarkdown>{event.content}</ReactMarkdown>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-forest rounded-2xl p-6 border border-body/10 dark:border-gold/10">
                <h2 className="font-serif text-lg font-semibold text-deep dark:text-cream mb-4">Event Details</h2>
                <dl className="space-y-3 text-sm font-sans">
                  {event.type && <div><dt className="text-muted text-xs uppercase tracking-wide">Type</dt><dd className="text-body dark:text-cream mt-0.5">{event.type}</dd></div>}
                  {event.date && <div><dt className="text-muted text-xs uppercase tracking-wide">Date</dt><dd className="text-body dark:text-cream mt-0.5">{formatDate(event.date)}{event.endDate ? ` – ${formatDate(event.endDate)}` : ''}</dd></div>}
                  {event.location && <div><dt className="text-muted text-xs uppercase tracking-wide">Location</dt><dd className="text-body dark:text-cream mt-0.5">{event.location}</dd></div>}
                </dl>
                <div className="mt-5">
                  {isPast ? (
                    <Button href="/contact" variant="outline" size="sm" className="w-full justify-center">Request Recording</Button>
                  ) : (
                    <Button href="/contact" variant="primary" size="sm" className="w-full justify-center">Register Interest</Button>
                  )}
                </div>
              </div>
              <Button href="/events" variant="ghost" size="sm" className="w-full justify-center">
                ← Back to Events
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
