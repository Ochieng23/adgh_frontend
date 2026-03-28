import Link from 'next/link'
import { Download, ArrowRight, Calendar, User } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { formatDate, truncate } from '@/lib/utils'
import { strings } from '@/lib/strings'
import { cn } from '@/lib/utils'

const categoryColors = {
  'Research Paper': 'bg-sage/80',
  'Policy Brief':   'bg-gold/80',
  'Report':         'bg-forest',
  'Toolkit':        'bg-body',
  'Working Paper':  'bg-muted',
}

export default function PublicationCard({
  title,
  category,
  author,
  date,
  excerpt,
  slug,
  downloadUrl,
  featured = false,
  className,
}) {
  const bg = categoryColors[category] || 'bg-forest'

  return (
    <article
      className={cn(
        'group flex flex-col h-full rounded-2xl overflow-hidden border border-body/10 dark:border-gold/10',
        'hover:border-gold/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
        'bg-white dark:bg-forest',
        className
      )}
    >
      {/* Cover / category strip */}
      <div className={cn('relative h-2 w-full', bg)} aria-hidden="true" />

      <div className="flex flex-col flex-1 p-6">
        {/* Category + date */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <Badge auto>{category}</Badge>
          {date && (
            <time
              dateTime={date}
              className="flex items-center gap-1.5 text-xs font-sans text-muted"
            >
              <Calendar className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              {formatDate(date, 'MMM d, yyyy')}
            </time>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-deep dark:text-cream group-hover:text-gold transition-colors leading-snug mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Author */}
        {author && (
          <div className="flex items-center gap-1.5 mb-3">
            <User className="w-3 h-3 text-muted flex-shrink-0" aria-hidden="true" />
            <span className="text-xs font-sans text-muted">{author}</span>
          </div>
        )}

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm font-sans text-muted leading-relaxed flex-1 mb-4">
            {truncate(excerpt, 120)}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-body/10 dark:border-gold/10">
          <Link
            href={`/publications/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-gold hover:text-gold-light transition-colors group/link focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            {strings.publicationReadMore}
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-sans text-muted hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
              aria-label={`Download PDF: ${title}`}
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              {strings.publicationDownload}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
