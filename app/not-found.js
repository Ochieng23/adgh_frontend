import Link from 'next/link'
import Button from '@/components/ui/Button'
import GoldDivider from '@/components/ui/GoldDivider'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-deep flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="font-serif text-gold text-8xl font-light leading-none mb-4" aria-hidden="true">404</div>
        <GoldDivider center className="mb-6" width="w-16" />
        <h1 className="font-serif text-3xl font-light text-cream mb-4">Page Not Found</h1>
        <p className="font-sans text-muted leading-relaxed mb-8">
          The page you are looking for may have moved or doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href="/" variant="primary">Return Home</Button>
          <Button href="/our-work" variant="outline">Explore Our Work</Button>
        </div>
      </div>
    </div>
  )
}
