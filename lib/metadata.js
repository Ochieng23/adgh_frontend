const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://adgh.org'

export function buildMetadata({ title, description, path = '', image }) {
  const url = `${SITE_URL}${path}`
  const ogImage = image || `${SITE_URL}/og-image.jpg`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'African Democracy and Governance Hub',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export function buildArticleMetadata({ title, description, path, image, author, publishedTime, tags }) {
  const base = buildMetadata({ title, description, path, image })
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      authors: author ? [author] : undefined,
      publishedTime,
      tags,
    },
  }
}
