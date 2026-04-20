import { FileText, Download, ExternalLink, BookOpen, Wrench, Globe } from 'lucide-react'
import { buildMetadata } from '@/lib/metadata'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import GoldDivider from '@/components/ui/GoldDivider'

export const metadata = buildMetadata({
  title: 'Resources',
  description: 'Toolkits, guides, data, and reference materials on African democratic governance from ADGH.',
  path: '/resources',
})

const resources = [
  {
    category: 'Governance Toolkits',
    icon: Wrench,
    items: [
      { title: 'ACDEG Implementation Guide for National Parliaments', type: 'PDF', size: '2.4 MB' },
      { title: 'Electoral Integrity Assessment Framework', type: 'PDF', size: '1.8 MB' },
      { title: 'Civic Education Facilitator Handbook', type: 'PDF', size: '3.1 MB' },
    ],
  },
  {
    category: 'Reference Documents',
    icon: BookOpen,
    items: [
      { title: 'African Charter on Democracy, Elections and Governance (ACDEG)', type: 'PDF', size: '890 KB', external: true },
      { title: 'AU Agenda 2063: The Africa We Want', type: 'PDF', size: '1.2 MB', external: true },
      { title: 'SDG 16 Implementation Guidance for African States', type: 'PDF', size: '1.5 MB', external: true },
    ],
  },
  {
    category: 'Data & Research',
    icon: Globe,
    items: [
      { title: 'African Governance Indicators Dataset 2026', type: 'XLSX', size: '4.2 MB' },
      { title: 'Electoral Calendar Africa 2026', type: 'PDF', size: '650 KB' },
      { title: 'Governance Trends Report: Raw Data', type: 'CSV', size: '890 KB' },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-warm dark:bg-deep">
      <div className="bg-deep pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Resources', href: '/resources' }]} className="mb-6 [&_*]:text-muted" />
          <SectionLabel light>Knowledge Repository</SectionLabel>
          <h1 className="mt-3 font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Resources
          </h1>
          <GoldDivider className="mt-4" width="w-16" />
          <p className="mt-4 text-cream/70 font-sans max-w-xl leading-relaxed">
            Toolkits, reference documents, datasets, and guides to support democratic governance practitioners across Africa.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {resources.map((section, i) => {
          const Icon = section.icon
          return (
            <AnimatedSection key={section.category} delay={i * 0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gold" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-2xl font-light text-deep dark:text-cream">{section.category}</h2>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col items-start gap-4 rounded-xl border border-body/10 bg-white p-5 transition-colors group hover:border-gold/30 sm:flex-row sm:items-center dark:border-gold/10 dark:bg-forest"
                  >
                    <FileText className="w-8 h-8 text-muted flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="font-sans font-medium text-body dark:text-cream text-sm group-hover:text-gold transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs font-sans text-muted mt-0.5">{item.type} · {item.size}</p>
                    </div>
                    <a
                      href="#"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-gold/10 px-3 py-1.5 text-xs font-sans font-medium text-gold transition-colors hover:bg-gold hover:text-deep focus-visible:ring-2 focus-visible:ring-gold sm:w-auto"
                      aria-label={`Download ${item.title}`}
                    >
                      {item.external ? (
                        <><ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />View</>
                      ) : (
                        <><Download className="w-3.5 h-3.5" aria-hidden="true" />Download</>
                      )}
                    </a>
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
