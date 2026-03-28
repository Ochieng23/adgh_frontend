import { cn } from '@/lib/utils'

export default function SectionLabel({ children, className, light = false }) {
  return (
    <p
      className={cn(
        'section-label text-[10px] tracking-[0.3em] uppercase font-sans font-medium',
        light ? 'text-gold-light' : 'text-gold',
        className
      )}
    >
      {children}
    </p>
  )
}
