'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { strings } from '@/lib/strings'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export default function NewsletterForm({ compact = false, tone = 'dark' }) {
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const isLight = tone === 'light'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(data) {
    setServerError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || strings.formError)
      setSuccess(true)
      reset()
    } catch (err) {
      setServerError(err.message)
    }
  }

  if (success) {
    return (
      <div className="flex items-center gap-2 text-gold font-sans text-sm">
        <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
        <span>{strings.newsletterSuccess}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={cn('flex gap-2', compact ? 'flex-row' : 'flex-col sm:flex-row')}>
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder={strings.newsletterPlaceholder}
            autoComplete="email"
            aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
            aria-invalid={!!errors.email}
            aria-required="true"
            className={cn(
              'w-full rounded-full px-4 py-2.5 text-sm font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-gold',
              isLight
                ? 'border border-gold/20 bg-white text-body placeholder:text-muted shadow-[0_16px_40px_-34px_rgba(14,26,20,0.45)]'
                : 'border border-gold/30 bg-white/10 text-cream placeholder:text-muted',
              errors.email && 'border-red-400'
            )}
            {...register('email')}
          />
          {errors.email && (
            <p id="newsletter-email-error" role="alert" className="mt-1 text-xs text-red-400 font-sans px-2">
              {errors.email.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-deep font-sans font-medium text-sm',
            'hover:bg-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
            'disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0'
          )}
        >
          {isSubmitting ? 'Subscribing…' : strings.newsletterCta}
          {!isSubmitting && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
        </button>
      </div>
      {serverError && (
        <p role="alert" className="mt-2 text-xs text-red-400 font-sans">
          {serverError}
        </p>
      )}
    </form>
  )
}
