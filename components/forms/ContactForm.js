'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { strings } from '@/lib/strings'
import Button from '@/components/ui/Button'

const schema = z.object({
  name:         z.string().min(2, 'Name must be at least 2 characters'),
  email:        z.string().email('Please enter a valid email address'),
  organisation: z.string().optional(),
  subject:      z.enum(['General Enquiry', 'Partnership', 'Media', 'Research Collaboration', 'Speaking Request', 'Other'], {
    errorMap: () => ({ message: 'Please select a subject' }),
  }),
  message:      z.string().min(20, 'Message must be at least 20 characters'),
})

const subjects = ['General Enquiry', 'Partnership', 'Media', 'Research Collaboration', 'Speaking Request', 'Other']

function Field({ label, id, error, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-sans font-medium text-body dark:text-cream mb-1.5">
        {label}{required && <span className="text-gold ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-500 font-sans flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = (hasError) => cn(
  'w-full px-4 py-3 rounded-xl bg-warm dark:bg-forest/50 border text-sm font-sans',
  'text-body dark:text-cream placeholder-muted',
  'focus:outline-none focus:ring-2 focus:ring-gold transition-colors',
  hasError ? 'border-red-400' : 'border-body/20 dark:border-gold/20 focus:border-gold'
)

export default function ContactForm() {
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(data) {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
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
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-gold" aria-hidden="true" />
        </div>
        <h3 className="font-serif text-xl text-deep dark:text-cream">Message Received</h3>
        <p className="text-muted text-sm font-sans max-w-sm">{strings.formSuccess} We will be in touch within 2-3 business days.</p>
        <button
          onClick={() => setSuccess(false)}
          className="text-gold text-sm font-sans hover:underline focus-visible:ring-2 focus-visible:ring-gold rounded"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" id="name" error={errors.name?.message} required>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
            {...register('name')}
          />
        </Field>

        <Field label="Email Address" id="email" error={errors.email?.message} required>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
            {...register('email')}
          />
        </Field>
      </div>

      <Field label="Organisation / Affiliation" id="organisation" error={errors.organisation?.message}>
        <input
          id="organisation"
          type="text"
          autoComplete="organization"
          placeholder="Your organisation (optional)"
          className={inputClass(false)}
          {...register('organisation')}
        />
      </Field>

      <Field label="Subject" id="subject" error={errors.subject?.message} required>
        <select
          id="subject"
          aria-required="true"
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          aria-invalid={!!errors.subject}
          className={inputClass(!!errors.subject)}
          {...register('subject')}
        >
          <option value="">Select a subject</option>
          {subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>

      <Field label="Message" id="message" error={errors.message?.message} required>
        <textarea
          id="message"
          rows={6}
          placeholder="How can we help you? (minimum 20 characters)"
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          className={cn(inputClass(!!errors.message), 'resize-y')}
          {...register('message')}
        />
      </Field>

      {serverError && (
        <p role="alert" className="text-sm text-red-500 font-sans flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          {serverError}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
