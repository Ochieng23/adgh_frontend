import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'

const sdgs = [
  {
    number: 16,
    title: 'Peace, Justice & Strong Institutions',
    description:
      'Our primary mandate. ADGH works to build transparent, accountable, and inclusive institutions at every level of Kenyan governance — from ward committees to the national parliament.',
    colour: 'bg-[#00689D]',
    primary: true,
  },
  {
    number: 10,
    title: 'Reduced Inequalities',
    description:
      'We deliberately work in Kenya\'s marginalised and ASAL regions to ensure that democracy reaches citizens who are too often left behind by formal governance structures.',
    colour: 'bg-[#DD1367]',
    primary: false,
  },
  {
    number: 5,
    title: 'Gender Equality',
    description:
      'We champion women\'s political participation and the implementation of Kenya\'s constitutional two-thirds gender principle across all levels of government.',
    colour: 'bg-[#FF3A21]',
    primary: false,
  },
  {
    number: 4,
    title: 'Quality Education',
    description:
      'Through civic education programmes in schools and communities, we build the democratic literacy that sustains a healthy and participatory citizenry.',
    colour: 'bg-[#C5192D]',
    primary: false,
  },
]

export default function SdgSection() {
  return (
    <section className="py-20 bg-white dark:bg-forest" aria-labelledby="sdg-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <SectionLabel>Global Goals</SectionLabel>
          <h2 id="sdg-heading" className="mt-2 font-serif font-light text-deep dark:text-cream" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            UN Sustainable Development Goals We Address
          </h2>
          <GoldDivider className="mt-4" width="w-16" />
          <p className="mt-4 font-sans text-sm text-muted max-w-2xl leading-relaxed">
            ADGH's work is directly aligned with the United Nations 2030 Agenda. Our primary focus is <strong className="text-deep dark:text-cream">SDG 16</strong>, with our programmes contributing across four goals in total.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sdgs.map((sdg, i) => (
            <AnimatedSection key={sdg.number} delay={i * 0.08}>
              <div className={`relative rounded-2xl overflow-hidden h-full flex flex-col ${sdg.primary ? 'ring-2 ring-gold ring-offset-2' : ''}`}>
                <div className={`${sdg.colour} px-5 py-4 flex items-center gap-3`}>
                  <span className="font-serif font-bold text-white text-3xl leading-none">{sdg.number}</span>
                  <div>
                    {sdg.primary && (
                      <span className="inline-block text-[10px] font-sans font-semibold uppercase tracking-widest text-white/80 bg-white/20 rounded-full px-2 py-0.5 mb-1">
                        Primary
                      </span>
                    )}
                    <p className="font-sans font-semibold text-white text-sm leading-tight">{sdg.title}</p>
                  </div>
                </div>
                <div className="bg-warm dark:bg-deep p-5 flex-1">
                  <p className="font-sans text-xs text-muted leading-relaxed">{sdg.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
