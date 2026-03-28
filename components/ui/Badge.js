import { cn } from '@/lib/utils'
import { getCategoryColor } from '@/lib/utils'

export default function Badge({ children, className, auto = false }) {
  const colorClass = auto ? getCategoryColor(children) : ''

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-medium',
        auto ? colorClass : 'bg-gold text-deep',
        className
      )}
    >
      {children}
    </span>
  )
}
