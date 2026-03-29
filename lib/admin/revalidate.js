import 'server-only'

import { revalidatePath } from 'next/cache'

export function revalidateAdminContent(type, slugs = []) {
  const uniqueSlugs = [...new Set(slugs.filter(Boolean))]

  revalidatePath('/')
  revalidatePath(`/${type}`)

  for (const slug of uniqueSlugs) {
    revalidatePath(`/${type}/${slug}`)
  }

  if (type === 'media') {
    revalidatePath('/media')
  }
}
