import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import { buildMetadata } from '@/lib/metadata'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'
import { objectives } from '@/lib/data/objectives'

export const metadata = buildMetadata({
  title: 'Our Work',
  description: 'Explore the six strategic programme areas of the African Democracy and Governance Hub - from democratic principles to information exchange.',
  path: '/our-work',
})

export default function OurWorkPage() {
  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Our Work', href: '/our-work' }]} className="mb-6 [&_*]:text-muted" />
          <SectionLabel light>Programme Areas</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Our Work
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <p className="mt-4 text-cream/70 font-sans max-w-2xl leading-relaxed">
            ADGH&apos;s work is organised across six interconnected programme areas, each grounded in the ACDEG framework and aligned with AU Agenda 2063&apos;s democratic governance aspirations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          {objectives.map((obj, i) => {
            const Icon = Icons[obj.icon] || Icons.Circle
            const isEven = i % 2 === 0

            return (
              <AnimatedSection key={obj.slug} delay={i * 0.08}>
                <Link
                  href={`/our-work/${obj.slug}`}
                  className={`group flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden border border-body/10 dark:border-gold/10 hover:border-gold/30 hover:shadow-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none ${isEven ? 'bg-white dark:bg-forest' : 'bg-warm dark:bg-deep'}`}
                >
                  {/* Number / icon */}
                  <div className={`flex-shrink-0 w-full md:w-48 flex flex-col items-center justify-center p-8 gap-3 ${isEven ? 'bg-forest' : 'bg-deep'}`}>
                    <span className="font-serif text-gold text-5xl font-light" aria-hidden="true">{obj.number}</span>
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col items-start gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-deep dark:text-cream group-hover:text-gold transition-colors mb-3">
                        {obj.title}
                      </h2>
                      <p className="font-sans text-muted leading-relaxed max-w-2xl">{obj.description}</p>
                    </div>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-all group-hover:bg-gold group-hover:text-deep md:ml-4">
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </div>
  )
}
