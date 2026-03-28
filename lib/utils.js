import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

/**
 * Merge Tailwind classes safely
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString, pattern = 'MMMM d, yyyy') {
  try {
    return format(parseISO(dateString), pattern)
  } catch {
    return dateString
  }
}

/**
 * Truncate text to a given length
 */
export function truncate(text, length = 120) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}

/**
 * Generate a slug from a string
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Get category colour for badges
 */
export function getCategoryColor(category) {
  const map = {
    'Research Paper': 'bg-sage text-cream',
    'Policy Brief':   'bg-gold text-deep',
    'Report':         'bg-forest text-cream',
    'Toolkit':        'bg-body text-cream',
    'Working Paper':  'bg-muted text-cream',
    'Press Release':  'bg-gold text-deep',
    'Blog':           'bg-sage text-cream',
    'In The Media':   'bg-forest text-cream',
    'Event Report':   'bg-deep text-cream',
    'Conference':     'bg-sage text-cream',
    'Workshop':       'bg-forest text-cream',
    'Webinar':        'bg-gold text-deep',
    'Training':       'bg-body text-cream',
  }
  return map[category] || 'bg-muted text-cream'
}
