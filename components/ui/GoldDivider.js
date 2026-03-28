import { cn } from '@/lib/utils'

export default function GoldDivider({ className, width = 'w-16', center = false }) {
  return (
    <div className={cn('flex', center ? 'justify-center' : '', className)} aria-hidden="true">
      <div className={cn('h-px bg-gradient-to-r from-gold/60 via-gold to-gold/60', width)} />
    </div>
  )
}
