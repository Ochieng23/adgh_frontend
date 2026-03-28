import { cn } from '@/lib/utils'

export default function Card({ children, className, hover = false, dark = false }) {
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden',
        dark ? 'bg-forest text-cream' : 'bg-white dark:bg-forest text-body dark:text-cream',
        hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gold/40 border border-transparent',
        className
      )}
    >
      {children}
    </div>
  )
}
