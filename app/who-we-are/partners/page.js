import { buildMetadata } from '@/lib/metadata'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import { partners } from '@/lib/data/partners'

export const metadata = buildMetadata({
  title: 'Partners',
  description: 'The institutional partners, funding bodies, and collaborating organisations of the African Democracy and Governance Hub.',
  path: '/who-we-are/partners',
})

const partnerTypes = [
  { id: 'institutional', label: 'Institutional Partners' },
  { id: 'international', label: 'International Partners' },
  { id: 'civil-society', label: 'Civil Society Partners' },
  { id: 'philanthropy', label: 'Philanthropic Partners' },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Who We Are', href: '/who-we-are' }, { label: 'Partners' }]} className="mb-6 [&_*]:text-muted" />
          <SectionLabel light>Our Ecosystem</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Partners & Supporters
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <p className="mt-4 text-cream/70 font-sans max-w-xl leading-relaxed">
            ADGH works in partnership with leading African and global institutions committed to democratic governance, the rule of law, and sustainable development.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {partnerTypes.map((type, ti) => {
          const typePartners = partners.filter((p) => p.type === type.id)
          if (typePartners.length === 0) return null

          return (
            <AnimatedSection key={type.id} delay={ti * 0.1}>
              <h2 className="font-serif text-2xl font-light text-deep dark:text-cream mb-6">{type.label}</h2>
              <GoldDivider className="mb-8" width="w-16" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {typePartners.map((partner) => (
                  <div
                    key={partner.acronym}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-forest border border-body/10 dark:border-gold/10 hover:border-gold/30 transition-colors group text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-3">
                      <span className="font-serif font-semibold text-gold text-sm">{partner.acronym.slice(0, 2)}</span>
                    </div>
                    <p className="font-sans font-semibold text-deep dark:text-cream text-sm group-hover:text-gold transition-colors">{partner.acronym}</p>
                    <p className="text-xs font-sans text-muted mt-1 leading-tight">{partner.name}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )
        })}
      </div>
    </div>
  )
}
