/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'

const logoSrc = '/Teal%20Corporate%20Consulting%20Logo.svg'

export default function BrandLogo({ className, alt = 'African Democracy & Governance Hub', priority = false }) {
  return (
    <img
      src={logoSrc}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable="false"
      className={cn('block h-auto w-full select-none object-contain', className)}
    />
  )
}
