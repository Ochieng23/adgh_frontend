import { Mail, MapPin, Phone, Globe, Globe2, Link2 } from 'lucide-react'
import { buildMetadata } from '@/lib/metadata'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import ContactForm from '@/components/forms/ContactForm'
import { strings } from '@/lib/strings'

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch with the African Democracy and Governance Hub for enquiries, partnerships, media, and research collaboration.',
  path: '/contact',
})

const contactDetails = [
  { icon: MapPin, label: 'Headquarters', value: 'Pan-African Headquarters\nNairobi, Kenya' },
  { icon: Mail, label: 'Email', value: 'info@adgh.org', href: 'mailto:info@adgh.org' },
  { icon: Mail, label: 'Media Enquiries', value: 'media@adgh.org', href: 'mailto:media@adgh.org' },
  { icon: Mail, label: 'Research', value: 'research@adgh.org', href: 'mailto:research@adgh.org' },
]

const socialLinks = [
  { icon: Globe, href: '#', label: 'Follow us on LinkedIn' },
  { icon: Globe2, href: '#', label: 'Follow us on Twitter/X' },
  { icon: Link2, href: '#', label: 'Follow us on Facebook' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Contact', href: '/contact' }]} className="mb-6 [&_*]:text-muted" />
          <SectionLabel light>Get In Touch</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {strings.contactTitle}
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <p className="mt-4 text-cream/70 font-sans max-w-xl leading-relaxed">{strings.contactSubtext}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact form */}
          <AnimatedSection className="lg:col-span-2">
            <div className="bg-white dark:bg-forest rounded-2xl p-8 border border-body/10 dark:border-gold/10 shadow-sm">
              <h2 className="font-serif text-2xl font-light text-deep dark:text-cream mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </AnimatedSection>

          {/* Contact details */}
          <AnimatedSection delay={0.2} className="space-y-6">
            <div className="bg-white dark:bg-forest rounded-2xl p-6 border border-body/10 dark:border-gold/10">
              <h2 className="font-serif text-lg font-semibold text-deep dark:text-cream mb-4">Contact Details</h2>
              <dl className="space-y-4">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-gold" aria-hidden="true" />
                    </div>
                    <div>
                      <dt className="text-xs font-sans font-medium text-muted uppercase tracking-wide">{label}</dt>
                      <dd className="text-sm font-sans text-body dark:text-cream mt-0.5 whitespace-pre-line">
                        {href ? (
                          <a href={href} className="hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded">
                            {value}
                          </a>
                        ) : value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-white dark:bg-forest rounded-2xl p-6 border border-body/10 dark:border-gold/10">
              <h2 className="font-serif text-lg font-semibold text-deep dark:text-cream mb-4">Follow Us</h2>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-body/20 dark:border-gold/20 flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white dark:bg-forest rounded-2xl overflow-hidden border border-body/10 dark:border-gold/10 aspect-video flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin className="w-8 h-8 text-gold mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm font-sans text-muted">Nairobi, Kenya</p>
                <p className="text-xs font-sans text-muted/70 mt-1">Pan-African Headquarters</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
