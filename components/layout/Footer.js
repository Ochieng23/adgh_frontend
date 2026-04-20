import Link from 'next/link'
import { Globe, Globe2, Link2, ExternalLink, Mail, MapPin } from 'lucide-react'
import { strings } from '@/lib/strings'
import NewsletterForm from '@/components/forms/NewsletterForm'

const footerLinks = {
  whoWeAre: [
    { label: 'About ADGH', href: '/who-we-are' },
    { label: 'Leadership', href: '/who-we-are/leadership' },
    { label: 'Partners', href: '/who-we-are/partners' },
  ],
  ourWork: [
    { label: 'Democratic Principles', href: '/our-work/democratic-principles' },
    { label: 'Institutional Capacity', href: '/our-work/institutional-capacity' },
    { label: 'Civic Engagement', href: '/our-work/civic-engagement' },
    { label: 'Conflict Prevention', href: '/our-work/conflict-prevention' },
    { label: 'Governance & Accountability', href: '/our-work/governance-accountability' },
    { label: 'Information Exchange', href: '/our-work/information-exchange' },
  ],
  quickLinks: [
    { label: 'Publications', href: '/publications' },
    { label: 'News', href: '/news' },
    { label: 'Events', href: '/events' },
    { label: 'Resources', href: '/resources' },
    { label: 'Media', href: '/media' },
    { label: 'Contact', href: '/contact' },
    { label: 'Get Involved', href: '/get-involved' },
  ],
}

const socialLinks = [
  { icon: Globe, href: '#', label: 'LinkedIn' },
  { icon: Globe2, href: '#', label: 'Twitter/X' },
  { icon: Link2, href: '#', label: 'Facebook' },
  { icon: ExternalLink, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gold/10 bg-[linear-gradient(180deg,rgba(27,51,38,0.98),rgba(14,26,20,1))] text-cream" role="contentinfo">
      {/* Newsletter banner */}
      <div className="border-b border-gold/10 bg-[radial-gradient(circle_at_top_right,rgba(46,94,65,0.28),transparent_35%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="mb-1 font-serif text-xl font-light text-cream">
                {strings.newsletterTitle}
              </h2>
              <p className="font-sans text-sm text-cream/65">{strings.newsletterSubtext}</p>
            </div>
            <div className="w-full md:w-auto md:min-w-[320px] lg:min-w-[380px]">
              <NewsletterForm compact tone="dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 - Brand */}
          <div>
            <Link
              href="/"
              className="mb-5 inline-block rounded-md focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="African Democracy & Governance Hub Home"
            >
              <div className="font-serif text-2xl font-light text-cream">
                African Democracy
              </div>
              <div className="font-serif text-2xl font-light italic text-gold-light">
                &amp; Governance Hub
              </div>
            </Link>
            <p className="mb-6 font-sans text-sm leading-relaxed text-cream/65">
              {strings.tagline}
            </p>
            <address className="mb-6 space-y-2 font-sans text-sm not-italic text-cream/65">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Pan-African Headquarters<br />Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
                <a href="mailto:info@adgh.org" className="hover:text-gold transition-colors">info@adgh.org</a>
              </div>
            </address>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/10 text-cream/55 transition-colors hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 - Who We Are */}
          <div>
            <h3 className="font-sans font-semibold text-sm text-gold/70 tracking-widest uppercase mb-4">
              Who We Are
            </h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.whoWeAre.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/65 hover:text-gold transition-colors font-sans focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Our Work */}
          <div>
            <h3 className="font-sans font-semibold text-sm text-gold/70 tracking-widest uppercase mb-4">
              Our Work
            </h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.ourWork.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/65 hover:text-gold transition-colors font-sans focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Quick Links */}
          <div>
            <h3 className="font-sans font-semibold text-sm text-gold/70 tracking-widest uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/65 hover:text-gold transition-colors font-sans focus-visible:ring-2 focus-visible:ring-gold rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream/55">
            © {currentYear} African Democracy and Governance Hub. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 font-sans text-xs text-cream/55">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Use</Link>
            <Link href="/cookies" className="hover:text-gold transition-colors">Cookie Policy</Link>
            <span className="text-gold/70">Designed in Africa</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
