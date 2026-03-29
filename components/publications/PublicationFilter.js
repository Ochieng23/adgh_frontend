'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = ['All', 'Research Paper', 'Policy Brief', 'Report', 'Toolkit', 'Working Paper']
const years = ['All Years', '2025', '2024', '2023', '2022', '2021']

export default function PublicationFilter({ total }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(searchParams.get('q') || '')

  const activeCategory = searchParams.get('category') || 'All'
  const activeYear = searchParams.get('year') || 'All Years'

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams)
    if (value === 'All' || value === 'All Years') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    startTransition(() => router.push(`${pathname}?${params.toString()}`))
  }

  function handleSearch(e) {
    const val = e.target.value
    setSearch(val)
    const params = new URLSearchParams(searchParams)
    if (val) { params.set('q', val) } else { params.delete('q') }
    startTransition(() => router.push(`${pathname}?${params.toString()}`))
  }

  return (
    <div className={cn('space-y-4', isPending && 'opacity-60 transition-opacity')}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" aria-hidden="true" />
        <label htmlFor="pub-search" className="sr-only">Search publications</label>
        <input
          id="pub-search"
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search publications…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-warm dark:bg-forest border border-body/20 dark:border-gold/20 text-sm font-sans text-body dark:text-cream placeholder-muted focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {/* Category tabs */}
        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => updateParam('category', cat)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all focus-visible:ring-2 focus-visible:ring-gold',
                activeCategory === cat
                  ? 'bg-gold text-deep shadow-sm'
                  : 'bg-warm dark:bg-forest text-muted hover:text-gold border border-body/20 dark:border-gold/20'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Year filter */}
        <div className="relative sm:ml-auto">
          <label htmlFor="year-filter" className="sr-only">Filter by year</label>
          <select
            id="year-filter"
            value={activeYear}
            onChange={(e) => updateParam('year', e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-1.5 rounded-xl bg-warm dark:bg-forest border border-body/20 dark:border-gold/20 text-xs font-sans text-body dark:text-cream focus:outline-none focus:ring-2 focus:ring-gold"
          >
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted pointer-events-none" aria-hidden="true" />
        </div>

        {total !== undefined && (
          <p className="text-xs font-sans text-muted">{total} result{total !== 1 ? 's' : ''}</p>
        )}
      </div>
    </div>
  )
}
