import { Shield } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import NewsletterForm from '@/components/forms/NewsletterForm'
import { strings } from '@/lib/strings'

export default function NewsletterBanner() {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-deep lg:py-28" aria-labelledby="newsletter-heading">
      <div className="absolute left-10 top-4 h-40 w-40 rounded-full bg-gold/8 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-8 h-48 w-48 rounded-full bg-forest/14 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="rounded-[2rem] border border-forest/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,248,246,0.98))] px-6 py-10 text-center shadow-[0_34px_80px_-60px_rgba(14,26,20,0.45)] dark:bg-forest/70 sm:px-10 lg:px-16 lg:py-14">
            <SectionLabel>Stay Connected</SectionLabel>
            <h2
              id="newsletter-heading"
              className="mt-4 font-serif text-deep dark:text-cream"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              {strings.newsletterTitle}
            </h2>
            <GoldDivider center className="mt-4" width="w-16" />
            <p className="mt-4 font-sans leading-relaxed text-body/80 dark:text-cream/70">
              {strings.newsletterSubtext}
            </p>

            <div className="mx-auto mt-8 max-w-md">
              <NewsletterForm tone="light" />
            </div>

            <p className="mt-4 flex items-center justify-center gap-2 font-sans text-xs text-muted">
              <Shield className="h-3.5 w-3.5" aria-hidden="true" />
              {strings.newsletterPrivacy}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
