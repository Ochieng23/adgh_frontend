import Link from 'next/link'
import { Calendar, MapPin, ArrowRight, Video } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function EventCard({ title, type, date, endDate, location, excerpt, slug, status, className }) {
  const isPast = status === 'past'
  const dateObj = date ? new Date(date) : null

  return (
    <article
      className={cn(
        'group flex gap-6 p-6 rounded-2xl border border-body/10 dark:border-gold/10',
        'hover:border-gold/30 hover:shadow-lg transition-all duration-300',
        'bg-white dark:bg-forest',
        className
      )}
    >
      {/* Date badge */}
      {dateObj && (
        <div className="flex-shrink-0 w-16 text-center" aria-label={formatDate(date)}>
          <div className="bg-gold rounded-xl py-2 px-1">
            <div className="text-deep font-sans font-bold text-lg leading-none">
              {dateObj.getDate()}
            </div>
            <div className="text-deep font-sans text-xs font-medium uppercase tracking-wide mt-0.5">
              {dateObj.toLocaleDateString('en', { month: 'short' })}
            </div>
          </div>
          {dateObj.getFullYear() && (
            <div className="text-muted text-xs font-sans mt-1">{dateObj.getFullYear()}</div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap gap-2 mb-2">
          {type && <Badge auto>{type}</Badge>}
          {isPast && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-sans bg-muted/20 text-muted">Past</span>
          )}
        </div>
        <h3 className="font-serif text-lg font-semibold text-deep dark:text-cream group-hover:text-gold transition-colors leading-snug mb-2">
          {title}
        </h3>
        {location && (
          <p className="flex items-center gap-1.5 text-xs font-sans text-muted mb-2">
            <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {location}
          </p>
        )}
        {endDate && (
          <p className="text-xs font-sans text-muted mb-2">
            {formatDate(date, 'MMM d')} – {formatDate(endDate, 'MMM d, yyyy')}
          </p>
        )}
        {excerpt && (
          <p className="text-sm font-sans text-muted leading-relaxed line-clamp-2 mb-3">{excerpt}</p>
        )}
        <Link
          href={`/events/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-gold hover:text-gold-light transition-colors group/link focus-visible:ring-2 focus-visible:ring-gold rounded"
        >
          {isPast ? 'View Details' : 'Register'}
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
