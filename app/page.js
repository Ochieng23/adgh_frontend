import { buildMetadata } from '@/lib/metadata'
import HeroSection from '@/components/home/HeroSection'
import MissionVisionSection from '@/components/home/MissionVisionSection'
import ObjectivesSection from '@/components/home/ObjectivesSection'
import ImpactNumbers from '@/components/home/ImpactNumbers'
import SdgSection from '@/components/home/SdgSection'
import FeaturedPublications from '@/components/home/FeaturedPublications'
import NewsPreview from '@/components/home/NewsPreview'
import PartnersStrip from '@/components/home/PartnersStrip'
import NewsletterBanner from '@/components/home/NewsletterBanner'

export const metadata = buildMetadata({
  title: 'ADGH - African Democracy and Governance Hub',
  description: 'Empowering citizens, strengthening democratic institutions, and promoting accountability through evidence-based advocacy across Africa.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionVisionSection />
      <ObjectivesSection />
      <ImpactNumbers />
      <SdgSection />
      <FeaturedPublications />
      <NewsPreview />
      <PartnersStrip />
      <NewsletterBanner />
    </>
  )
}
