import { objectives } from '@/lib/data/objectives'
import ProgrammePage from '@/components/our-work/ProgrammePage'
import { buildMetadata } from '@/lib/metadata'

const obj = objectives.find((o) => o.slug === 'information-exchange')

export const metadata = buildMetadata({
  title: obj.title,
  description: obj.description,
  path: `/our-work/${obj.slug}`,
})

export default function Page() {
  return <ProgrammePage objective={obj} />
}
