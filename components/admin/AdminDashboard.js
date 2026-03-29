'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FilePlus2, LogOut, RefreshCcw, Save, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { getAdminContentConfig, getAdminContentTypes } from '@/lib/admin/content-config'
import { cn, formatDate } from '@/lib/utils'

const contentTypes = getAdminContentTypes()

function buildEmptyDraft(type) {
  const config = getAdminContentConfig(type)
  const draft = { ...config.defaults }
  if (Object.prototype.hasOwnProperty.call(draft, 'date') && !draft.date) {
    draft.date = new Date().toISOString().slice(0, 10)
  }
  return draft
}

function toDraft(type, item) {
  const config = getAdminContentConfig(type)
  return {
    ...config.defaults,
    ...item,
    tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
    featured: Boolean(item.featured),
    content: item.content || '',
  }
}

function summaryText(config, item) {
  return config.listSummary
    .map((key) => {
      if (!item[key]) return null
      if (key === 'date') return formatDate(item[key], 'MMM d, yyyy')
      return item[key]
    })
    .filter(Boolean)
    .join(' · ')
}

function Field({ field, value, onChange }) {
  if (field.type === 'checkbox') {
    return (
      <label className="flex items-center gap-3 rounded-xl border border-body/10 bg-warm px-4 py-3 text-sm font-sans text-body">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(field.name, event.target.checked)}
          className="h-4 w-4 rounded border-body/30 text-gold focus:ring-gold"
        />
        <span>{field.label}</span>
      </label>
    )
  }

  if (field.type === 'select') {
    return (
      <select
        value={value || ''}
        onChange={(event) => onChange(field.name, event.target.value)}
        className="w-full rounded-xl border border-body/15 bg-white px-4 py-3 text-sm font-sans text-body focus:outline-none focus:ring-2 focus:ring-gold"
      >
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  if (field.type === 'textarea' || field.type === 'markdown' || field.type === 'tags') {
    return (
      <textarea
        value={value || ''}
        onChange={(event) => onChange(field.name, event.target.value)}
        rows={field.rows || 4}
        className="w-full rounded-xl border border-body/15 bg-white px-4 py-3 text-sm font-sans text-body focus:outline-none focus:ring-2 focus:ring-gold"
      />
    )
  }

  return (
    <input
      type={field.type}
      value={value || ''}
      onChange={(event) => onChange(field.name, event.target.value)}
      className="w-full rounded-xl border border-body/15 bg-white px-4 py-3 text-sm font-sans text-body focus:outline-none focus:ring-2 focus:ring-gold"
    />
  )
}

export default function AdminDashboard({ username }) {
  const router = useRouter()
  const [activeType, setActiveType] = useState(contentTypes[0].type)
  const [entries, setEntries] = useState([])
  const [selectedSlug, setSelectedSlug] = useState(null)
  const [draft, setDraft] = useState(buildEmptyDraft(contentTypes[0].type))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const activeConfig = getAdminContentConfig(activeType)

  function resetEditor(type) {
    setSelectedSlug(null)
    setDraft(buildEmptyDraft(type))
    setError('')
    setMessage('')
  }

  useEffect(() => {
    let cancelled = false

    async function loadContent() {
      setLoading(true)
      resetEditor(activeType)

      try {
        const response = await fetch(`/api/admin/content/${activeType}`, { cache: 'no-store' })
        if (response.status === 401) {
          router.push('/admin/login')
          return
        }

        const payload = await response.json()
        if (!response.ok) {
          throw new Error(payload.error || 'Unable to load content.')
        }

        if (cancelled) return

        setEntries(payload.items)
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message)
          setEntries([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadContent()

    return () => {
      cancelled = true
    }
  }, [activeType, router])

  function handleChange(fieldName, value) {
    setDraft((current) => ({ ...current, [fieldName]: value }))
  }

  function handleSelect(item) {
    setSelectedSlug(item.slug)
    setDraft(toDraft(activeType, item))
    setError('')
    setMessage('')
  }

  function handleCreateNew() {
    resetEditor(activeType)
  }

  function handleTypeChange(nextType) {
    if (nextType === activeType) return
    setEntries([])
    setLoading(true)
    setActiveType(nextType)
    resetEditor(nextType)
  }

  async function refreshType(preferredSlug = null) {
    const response = await fetch(`/api/admin/content/${activeType}`, { cache: 'no-store' })
    const payload = await response.json()
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to refresh content.')
    }

    setEntries(payload.items)

    const nextSelected = preferredSlug
      ? payload.items.find((item) => item.slug === preferredSlug) || null
      : null

    if (nextSelected) {
      setSelectedSlug(nextSelected.slug)
      setDraft(toDraft(activeType, nextSelected))
    } else {
      resetEditor(activeType)
    }
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const url = selectedSlug
        ? `/api/admin/content/${activeType}/${selectedSlug}`
        : `/api/admin/content/${activeType}`
      const method = selectedSlug ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      })
      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to save content.')
      }

      await refreshType(payload.item.slug)
      setMessage(`${activeConfig.singular} saved.`)
      router.refresh()
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!selectedSlug) return
    if (!window.confirm(`Delete this ${activeConfig.singular.toLowerCase()}? This cannot be undone.`)) return

    setDeleting(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`/api/admin/content/${activeType}/${selectedSlug}`, {
        method: 'DELETE',
      })
      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to delete content.')
      }

      await refreshType()
      setMessage(`${activeConfig.singular} deleted.`)
      router.refresh()
    } catch (deleteError) {
      setError(deleteError.message)
    } finally {
      setDeleting(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-warm">
      <div className="border-b border-gold/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-sans uppercase tracking-[0.28em] text-gold">Content Admin</p>
            <h1 className="mt-2 font-serif text-3xl text-deep">Publishing Dashboard</h1>
            <p className="mt-1 text-sm font-sans text-muted">Signed in as {username}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-body/10 bg-white px-4 py-2 text-sm font-sans text-body transition-colors hover:border-gold/30 hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {contentTypes.map((type) => (
            <button
              key={type.type}
              type="button"
              onClick={() => handleTypeChange(type.type)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-sans font-medium transition-colors focus-visible:ring-2 focus-visible:ring-gold',
                activeType === type.type
                  ? 'bg-forest text-cream'
                  : 'border border-body/10 bg-white text-body hover:border-gold/20 hover:text-gold'
              )}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-[1.75rem] border border-body/10 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="font-serif text-xl text-deep">{activeConfig.label}</h2>
              <p className="mt-1 text-sm font-sans leading-relaxed text-muted">{activeConfig.description}</p>
            </div>

            <div className="mb-4 flex gap-2">
              <button
                type="button"
                onClick={handleCreateNew}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3 text-sm font-sans font-medium text-cream transition-colors hover:bg-sage focus-visible:ring-2 focus-visible:ring-gold"
              >
                <FilePlus2 className="h-4 w-4" aria-hidden="true" />
                New
              </button>
              <button
                type="button"
                onClick={() => refreshType(selectedSlug)}
                className="inline-flex items-center justify-center rounded-xl border border-body/10 bg-warm px-4 py-3 text-body transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-gold"
              >
                <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-2">
              {loading ? (
                <p className="rounded-xl border border-body/10 bg-warm px-4 py-3 text-sm font-sans text-muted">Loading…</p>
              ) : entries.length === 0 ? (
                <p className="rounded-xl border border-dashed border-body/15 bg-warm px-4 py-6 text-sm font-sans text-muted">
                  No {activeConfig.label.toLowerCase()} yet.
                </p>
              ) : (
                entries.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className={cn(
                      'w-full rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-gold',
                      selectedSlug === item.slug
                        ? 'border-forest/25 bg-forest/[0.06]'
                        : 'border-body/10 bg-warm hover:border-gold/20'
                    )}
                  >
                    <p className="font-serif text-base text-deep line-clamp-2">{item.title}</p>
                    <p className="mt-1 text-xs font-sans text-muted">
                      {summaryText(activeConfig, item) || item.slug}
                    </p>
                  </button>
                ))
              )}
            </div>
          </aside>

          <section className="rounded-[1.75rem] border border-body/10 bg-white p-6 shadow-sm lg:p-8">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-sans uppercase tracking-[0.24em] text-gold">
                  {selectedSlug ? `Editing ${activeConfig.singular}` : `Create ${activeConfig.singular}`}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-deep">
                  {draft.title || `Untitled ${activeConfig.singular}`}
                </h2>
              </div>
              <div className="flex gap-2">
                {selectedSlug && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-sans text-red-600 transition-colors hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-300 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-sans font-medium text-deep transition-colors hover:bg-gold-light focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50"
                >
                  <Save className="h-4 w-4" aria-hidden="true" />
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>

            {(error || message) && (
              <div className={cn('mb-6 rounded-2xl px-4 py-3 text-sm font-sans', error ? 'bg-red-50 text-red-700' : 'bg-forest/[0.08] text-forest')}>
                {error || message}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {activeConfig.fields.map((field) => (
                <div key={field.name} className={cn(field.type === 'markdown' || field.type === 'textarea' ? 'md:col-span-2' : '')}>
                  {field.type !== 'checkbox' && (
                    <label className="mb-1.5 block text-sm font-sans font-medium text-body">
                      {field.label}
                      {field.required && <span className="ml-1 text-gold">*</span>}
                    </label>
                  )}
                  <Field field={field} value={draft[field.name]} onChange={handleChange} />
                  {field.helper && <p className="mt-1.5 text-xs font-sans text-muted">{field.helper}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
