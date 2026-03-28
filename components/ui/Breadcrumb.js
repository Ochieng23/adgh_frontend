import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Breadcrumb({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm font-sans" role="list">
        <li>
          <Link
            href="/"
            className="text-muted hover:text-gold transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.href || i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3 text-muted/50" aria-hidden="true" />
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-muted hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gold font-medium" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
