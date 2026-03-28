export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://adgh.org'}/sitemap.xml`,
  }
}
