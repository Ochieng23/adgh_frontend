'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Handshake, Heart, Network, CheckCircle } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import Button from '@/components/ui/Button'

const tabs = [
  { id: 'partner', label: 'Partner With Us', icon: Handshake },
  { id: 'support', label: 'Support Our Work', icon: Heart },
  { id: 'network', label: 'Join Our Network', icon: Network },
]

const partnerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organisation: z.string().min(2),
  type: z.enum(['Government', 'Civil Society', 'Academic', 'Private Sector', 'International Organisation', 'Media', 'Other']),
  message: z.string().min(20),
})

const networkSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(2),
  expertise: z.string().min(2),
  motivation: z.string().min(20),
})

function SimpleForm({ schema, fields, submitLabel, successMessage }) {
  const [success, setSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) })

  async function onSubmit(data) {
    // Simulate submission
    await new Promise((r) => setTimeout(r, 800))
    setSuccess(true)
    reset()
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-12 h-12 text-gold mx-auto mb-3" aria-hidden="true" />
        <p className="font-serif text-xl text-deep dark:text-cream">{successMessage}</p>
      </div>
    )
  }

  const inputClass = (err) => `w-full px-4 py-3 rounded-xl bg-warm dark:bg-forest/50 border text-sm font-sans text-body dark:text-cream placeholder-muted focus:outline-none focus:ring-2 focus:ring-gold transition-colors ${err ? 'border-red-400' : 'border-body/20 dark:border-gold/20'}`

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {fields.map(({ name, label, type = 'text', placeholder, options }) => (
        <div key={name}>
          <label htmlFor={name} className="block text-sm font-sans font-medium text-body dark:text-cream mb-1.5">
            {label} <span className="text-gold" aria-hidden="true">*</span>
          </label>
          {type === 'select' ? (
            <select id={name} className={inputClass(errors[name])} {...register(name)}>
              <option value="">Select…</option>
              {options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : type === 'textarea' ? (
            <textarea id={name} rows={4} placeholder={placeholder} className={`${inputClass(errors[name])} resize-y`} {...register(name)} />
          ) : (
            <input id={name} type={type} placeholder={placeholder} className={inputClass(errors[name])} {...register(name)} />
          )}
          {errors[name] && <p role="alert" className="mt-1 text-xs text-red-500 font-sans">{errors[name]?.message}</p>}
        </div>
      ))}
      <Button type="submit" variant="primary" size="lg" loading={isSubmitting}>{submitLabel}</Button>
    </form>
  )
}

export default function GetInvolvedPage() {
  const [activeTab, setActiveTab] = useState('partner')

  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel light>Take Action</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Get Involved
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <p className="mt-4 text-cream/70 font-sans max-w-xl leading-relaxed">
            Join the pan-African movement for democratic governance. There are multiple ways to engage with ADGH&apos;s mission.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tabs */}
        <AnimatedSection>
          <div role="tablist" aria-label="Ways to get involved" className="flex flex-wrap gap-3 mb-10">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                aria-controls={`panel-${id}`}
                onClick={() => setActiveTab(id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-medium transition-all focus-visible:ring-2 focus-visible:ring-gold ${
                  activeTab === id
                    ? 'bg-gold text-deep shadow-sm'
                    : 'bg-white dark:bg-forest text-muted hover:text-gold border border-body/20 dark:border-gold/20'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          {/* Partner form */}
          {activeTab === 'partner' && (
            <div id="panel-partner" role="tabpanel" aria-label="Partner With Us" className="bg-white dark:bg-forest rounded-2xl p-8 border border-body/10 dark:border-gold/10">
              <h2 className="font-serif text-2xl font-light text-deep dark:text-cream mb-2">Partner With Us</h2>
              <p className="text-sm font-sans text-muted mb-6 leading-relaxed">
                We welcome institutional partnerships with governments, civil society organisations, academic institutions, and international bodies committed to democratic governance in Africa.
              </p>
              <SimpleForm
                schema={partnerSchema}
                submitLabel="Submit Partnership Enquiry"
                successMessage="Thank you! We will review your enquiry and be in touch within 5 business days."
                fields={[
                  { name: 'name', label: 'Full Name', placeholder: 'Your full name' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { name: 'organisation', label: 'Organisation', placeholder: 'Organisation name' },
                  { name: 'type', label: 'Organisation Type', type: 'select', options: ['Government', 'Civil Society', 'Academic', 'Private Sector', 'International Organisation', 'Media', 'Other'] },
                  { name: 'message', label: 'Partnership Proposal', type: 'textarea', placeholder: 'Describe the potential partnership…' },
                ]}
              />
            </div>
          )}

          {/* Support */}
          {activeTab === 'support' && (
            <div id="panel-support" role="tabpanel" aria-label="Support Our Work" className="bg-white dark:bg-forest rounded-2xl p-8 border border-body/10 dark:border-gold/10">
              <h2 className="font-serif text-2xl font-light text-deep dark:text-cream mb-4">Support Our Work</h2>
              <p className="text-sm font-sans text-muted mb-6 leading-relaxed">
                Your support enables ADGH to continue advancing democratic governance across Africa. We accept institutional grants, philanthropic gifts, and programme sponsorships.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { title: 'Institutional Grants', desc: 'Multi-year programmatic funding for strategic priorities' },
                  { title: 'Programme Sponsorship', desc: 'Targeted support for specific programme areas or events' },
                  { title: 'Research Funding', desc: 'Sponsor original research and publications' },
                  { title: 'Capacity Building', desc: 'Fund training and technical assistance programmes' },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-xl bg-warm dark:bg-deep/50 border border-body/10 dark:border-gold/10">
                    <h3 className="font-sans font-semibold text-deep dark:text-cream text-sm mb-1">{item.title}</h3>
                    <p className="text-xs font-sans text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Button href="/contact?subject=Partnership" variant="primary" size="lg">
                Discuss Funding Opportunities
              </Button>
            </div>
          )}

          {/* Network */}
          {activeTab === 'network' && (
            <div id="panel-network" role="tabpanel" aria-label="Join Our Network" className="bg-white dark:bg-forest rounded-2xl p-8 border border-body/10 dark:border-gold/10">
              <h2 className="font-serif text-2xl font-light text-deep dark:text-cream mb-2">Join Our Network</h2>
              <p className="text-sm font-sans text-muted mb-6 leading-relaxed">
                Join our growing continental network of governance practitioners, researchers, civil society activists, and democratic governance advocates.
              </p>
              <SimpleForm
                schema={networkSchema}
                submitLabel="Join the Network"
                successMessage="Welcome to the ADGH Network! We will be in touch with onboarding information."
                fields={[
                  { name: 'name', label: 'Full Name', placeholder: 'Your full name' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { name: 'country', label: 'Country', placeholder: 'Country of residence' },
                  { name: 'expertise', label: 'Area of Expertise', placeholder: 'e.g. Electoral systems, constitutional law…' },
                  { name: 'motivation', label: 'Why do you want to join?', type: 'textarea', placeholder: 'Tell us about your interest in democratic governance…' },
                ]}
              />
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  )
}
