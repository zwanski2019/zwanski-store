import React, { useEffect, useState } from 'react'
import FilmPlayer from './FilmPlayer'
import type { FilmItem } from './types'

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || ''

type Props = {
  filmId: string
}

type MovieResponse = { item: FilmItem }

export default function FilmDetail({ filmId }: Props) {
  const [film, setFilm] = useState<FilmItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE_URL}/api/movie/${filmId}`)
        if (!res.ok) throw new Error('Could not load film')
        const data = (await res.json()) as MovieResponse
        if (mounted) setFilm(data.item)
      } catch (err) {
        if (mounted) setError((err as Error).message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [filmId])

  if (loading) return <div className='p-4 text-[#0F172A] opacity-70'>Loading film...</div>
  if (error) return <div className='p-4 text-[#dc2626]'>{error}</div>
  if (!film) return <div className='p-4 text-[#0F172A] opacity-70'>Film not found.</div>

  return (
    <div className='space-y-4'>
      <FilmPlayer film={film} />
      <div className='glass rounded-xl p-4 border-[#e2e8f0]'>
        <h3 className='font-semibold mb-2 text-[#0F172A]'>License & Compliance</h3>
        <p className='text-sm text-[#0F172A]'>
          Only public-domain or properly licensed Creative Commons sources are embedded. If you
          believe this item infringes rights, file a takedown request below.
        </p>
        <TakedownForm filmId={film.id} />
      </div>
    </div>
  )
}

function TakedownForm({ filmId }: { filmId: string }) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    setError(null)
    try {
      const res = await fetch('/api/takedown', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ itemId: filmId, contact: email, message }),
      })
      if (!res.ok) throw new Error('Unable to submit takedown')
      setSent(true)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  if (sent)
    return <div className='text-[#00c853] bg-[#d1fae5] border-2 border-[#00c853] px-4 py-2 rounded-lg font-medium'>Report sent.</div>

  return (
    <div className='space-y-2 mt-2'>
      {error && <div className='text-[#dc2626] bg-[#fee2e2] border-2 border-[#fca5a5] px-3 py-2 rounded-lg text-sm font-medium'>{error}</div>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Contact email'
        className='w-full rounded-lg bg-[#f8fafc] border-2 border-[#e2e8f0] px-4 py-2 text-[#0F172A] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]'
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Describe the rights concern or provide license proof.'
        className='w-full rounded-lg bg-[#f8fafc] border-2 border-[#e2e8f0] px-4 py-2 text-[#0F172A] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]'
      />
      <button
        onClick={submit}
        className='rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2 font-semibold transition shadow-lg'
      >
        Submit takedown
      </button>
    </div>
  )
}
