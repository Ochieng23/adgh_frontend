import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { formatDate, truncate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function NewsCard({ title, category, date, excerpt, slug, image, className }) {
  return (
    <article
      className={cn(
        'group flex flex-col h-full rounded-2xl overflow-hidden border border-body/10 dark:border-gold/10',
        'hover:border-gold/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
        'bg-white dark:bg-forest',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] bg-forest overflow-hidden">
        <Image
          src={image || 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=75'}
          alt={title || ''}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute bottom-3 left-3">
          <Badge auto>{category}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {date && (
          <time dateTime={date} className="flex items-center gap-1.5 text-xs font-sans text-muted mb-3">
            <Calendar className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {formatDate(date)}
          </time>
        )}
        <h3 className="font-serif text-lg font-semibold text-deep dark:text-cream group-hover:text-gold transition-colors leading-snug mb-3 line-clamp-2 flex-1">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm font-sans text-muted leading-relaxed line-clamp-2 mb-4">
            {truncate(excerpt, 100)}
          </p>
        )}
        <Link
          href={`/news/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-gold hover:text-gold-light transition-colors group/link mt-auto focus-visible:ring-2 focus-visible:ring-gold rounded"
        >
          Read More
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
