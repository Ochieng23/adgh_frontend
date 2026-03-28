import { buildMetadata } from '@/lib/metadata'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import EventCard from '@/components/events/EventCard'
import { getAllContent } from '@/lib/content'

export const metadata = buildMetadata({
  title: 'Events',
  description: 'Conferences, workshops, webinars and training events from the African Democracy and Governance Hub.',
  path: '/events',
})

export default function EventsPage({ searchParams }) {
  const allEvents = getAllContent('events')
  const view = searchParams?.view || 'upcoming'
  const filtered = view === 'past'
    ? allEvents.filter((e) => e.status === 'past')
    : allEvents.filter((e) => e.status !== 'past')

  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Events', href: '/events' }]} className="mb-6 [&_*]:text-muted" />
          <SectionLabel light>Calendar</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Events
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatedSection className="flex gap-3 mb-10" role="tablist" aria-label="Event status">
          {[['upcoming', 'Upcoming'], ['past', 'Past']].map(([val, label]) => (
            <a
              key={val}
              href={`/events?view=${val}`}
              role="tab"
              aria-selected={view === val}
              className={`px-5 py-2 rounded-full text-sm font-sans font-medium transition-all focus-visible:ring-2 focus-visible:ring-gold ${
                view === val ? 'bg-gold text-deep' : 'bg-white dark:bg-forest text-muted hover:text-gold border border-body/20 dark:border-gold/20'
              }`}
            >
              {label}
            </a>
          ))}
        </AnimatedSection>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-muted">No {view} events</p>
            <p className="text-sm font-sans text-muted mt-2">Check back soon for upcoming events.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((event, i) => (
              <AnimatedSection key={event.slug} delay={i * 0.05}>
                <EventCard {...event} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
