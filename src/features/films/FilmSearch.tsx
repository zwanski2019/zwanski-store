import React, { useState } from 'react'
import type { FilmItem } from './types'

type Props = {
  onSelect: (id: string) => void
}

type SearchResult = {
  seed?: FilmItem[]
}

export default function FilmSearch({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      if (!res.ok) throw new Error('Search failed')
      const data = (await res.json()) as SearchResult
      setResults(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='glass rounded-xl p-6 space-y-4 border-[#e2e8f0]'>
      <div className='flex flex-col gap-3 md:flex-row md:items-center'>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search public-domain or CC films...'
          className='flex-1 rounded-lg bg-[#f8fafc] border-2 border-[#e2e8f0] px-4 py-2 text-[#0F172A] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]'
          onKeyDown={(e) => e.key === 'Enter' && runSearch()}
        />
        <button
          onClick={runSearch}
          className='inline-flex items-center justify-center rounded-lg bg-[#ff6b35] px-6 py-2 text-white font-semibold hover:bg-[#ff5722] disabled:bg-[#e2e8f0] disabled:text-[#94a3b8] transition shadow-lg'
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && (
        <div className='rounded-lg bg-[#fee2e2] border-2 border-[#fca5a5] text-[#dc2626] px-4 py-2 font-medium'>{error}</div>
      )}
      <div className='grid gap-3 md:grid-cols-2'>
        {results?.seed?.map((film) => (
          <button
            key={film.id}
            onClick={() => onSelect(film.id)}
            className='text-left card-neo rounded-lg p-4 hover:border-[#ff6b35] transition border-[#e2e8f0]'
          >
            <div className='text-sm text-[#0F172A] uppercase opacity-70'>{film.year}</div>
            <div className='font-semibold text-[#0F172A] mt-1'>{film.title}</div>
            <div className='text-[#0F172A] text-sm line-clamp-2 mt-1'>{film.synopsis}</div>
            <div className='mt-3 inline-flex items-center gap-2 text-xs text-[#00c853] bg-[#00c853]/10 border border-[#00c853]/30 px-3 py-1 rounded-full font-medium'>
              {film.licenseLabel}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
