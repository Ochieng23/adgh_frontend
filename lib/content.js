import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = (type) => path.join(process.cwd(), 'content', type)

export function getAllContent(type) {
  const dir = contentDir(type)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data, content } = matter(raw)
      return { ...data, content, slug: data.slug || file.replace('.md', '') }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getContentBySlug(type, slug) {
  const file = path.join(contentDir(type), `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  return { ...data, content }
}

export function getFeaturedContent(type, limit = 3) {
  return getAllContent(type)
    .filter((item) => item.featured)
    .slice(0, limit)
}

export function getRelatedContent(type, currentSlug, tags = [], limit = 3) {
  return getAllContent(type)
    .filter((item) => item.slug !== currentSlug)
    .filter((item) => item.tags?.some((t) => tags.includes(t)))
    .slice(0, limit)
}
