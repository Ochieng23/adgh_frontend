import 'server-only'

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { slugify } from '@/lib/utils'
import { ADMIN_CONTENT_CONFIG, getAdminContentConfig } from '@/lib/admin/content-config'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

function assertType(type) {
  const config = getAdminContentConfig(type)
  if (!config) {
    throw new Error(`Unsupported content type: ${type}`)
  }
  return config
}

function getDirectory(type) {
  const config = assertType(type)
  return path.join(CONTENT_ROOT, config.directory)
}

function getEntryPath(type, slug) {
  if (!slug || /[/\\]/.test(slug) || slug.includes('..')) {
    throw new Error('Invalid slug.')
  }
  return path.join(getDirectory(type), `${slug}.md`)
}

async function ensureDirectory(type) {
  await fs.mkdir(getDirectory(type), { recursive: true })
}

function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }
  if (!value) return []
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizeCheckbox(value) {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value === 'true' || value === 'on' || value === '1'
  return false
}

function normalizeInput(type, input, existingSlug = '') {
  const config = assertType(type)
  const record = { ...config.defaults }

  for (const field of config.fields) {
    const raw = input?.[field.name]
    if (field.type === 'checkbox') {
      record[field.name] = normalizeCheckbox(raw)
      continue
    }

    if (field.type === 'tags') {
      record[field.name] = normalizeTags(raw)
      continue
    }

    record[field.name] = raw == null ? '' : String(raw).trim()
  }

  const slugSource = record.slug || record.title || existingSlug
  record.slug = slugify(slugSource)

  if (!record.slug) {
    throw new Error('A title or slug is required to generate a valid slug.')
  }

  for (const field of config.fields) {
    const value = record[field.name]
    const isEmptyArray = Array.isArray(value) && value.length === 0
    if (field.required && (value === '' || value == null || isEmptyArray)) {
      throw new Error(`${field.label} is required.`)
    }
  }

  if (record.endDate && record.date && record.endDate < record.date) {
    throw new Error('End date cannot be earlier than the start date.')
  }

  return record
}

function buildFrontmatter(type, record) {
  const config = assertType(type)
  const frontmatter = {}

  for (const field of config.fields) {
    if (field.name === 'content') continue
    const value = record[field.name]

    if (field.type === 'checkbox') {
      frontmatter[field.name] = value
      continue
    }

    if (field.type === 'tags') {
      if (value.length > 0) {
        frontmatter[field.name] = value
      }
      continue
    }

    if (value !== '') {
      frontmatter[field.name] = value
    }
  }

  frontmatter.slug = record.slug

  return frontmatter
}

export async function listAdminContent(type) {
  await ensureDirectory(type)
  const dir = getDirectory(type)
  const files = (await fs.readdir(dir)).filter((file) => file.endsWith('.md'))
  const items = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(dir, file), 'utf8')
      const { data, content } = matter(raw)
      return {
        ...ADMIN_CONTENT_CONFIG[type].defaults,
        ...data,
        content,
        slug: data.slug || file.replace(/\.md$/, ''),
        tags: Array.isArray(data.tags) ? data.tags : [],
        featured: Boolean(data.featured),
      }
    })
  )

  return items.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date) - new Date(a.date)
    }
    return String(a.title || '').localeCompare(String(b.title || ''))
  })
}

export async function getAdminContentEntry(type, slug) {
  const filePath = getEntryPath(type, slug)
  const raw = await fs.readFile(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    ...ADMIN_CONTENT_CONFIG[type].defaults,
    ...data,
    content,
    slug: data.slug || slug,
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured),
  }
}

export async function saveAdminContent(type, payload, currentSlug = '') {
  await ensureDirectory(type)
  const normalized = normalizeInput(type, payload, currentSlug)
  const nextPath = getEntryPath(type, normalized.slug)
  const currentPath = currentSlug ? getEntryPath(type, currentSlug) : null

  if (!currentSlug || currentSlug !== normalized.slug) {
    try {
      await fs.access(nextPath)
      throw new Error(`An item with slug "${normalized.slug}" already exists.`)
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }
  }

  const output = matter.stringify(normalized.content || '', buildFrontmatter(type, normalized))
  await fs.writeFile(nextPath, output, 'utf8')

  if (currentPath && currentPath !== nextPath) {
    await fs.unlink(currentPath).catch((error) => {
      if (error.code !== 'ENOENT') throw error
    })
  }

  return normalized
}

export async function deleteAdminContent(type, slug) {
  await fs.unlink(getEntryPath(type, slug))
}
