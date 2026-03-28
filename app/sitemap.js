import { getAllContent } from '@/lib/content'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://adgh.org'

export default function sitemap() {
  const staticRoutes = [
    '/',
    '/who-we-are',
    '/who-we-are/leadership',
    '/who-we-are/partners',
    '/our-work',
    '/our-work/democratic-principles',
    '/our-work/institutional-capacity',
    '/our-work/civic-engagement',
    '/our-work/conflict-prevention',
    '/our-work/governance-accountability',
    '/our-work/information-exchange',
    '/publications',
    '/news',
    '/events',
    '/resources',
    '/media',
    '/contact',
    '/get-involved',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }))

  const publications = getAllContent('publications').map((p) => ({
    url: `${SITE_URL}/publications/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const news = getAllContent('news').map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    lastModified: n.date ? new Date(n.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const events = getAllContent('events').map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    lastModified: e.date ? new Date(e.date) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...publications, ...news, ...events]
}
