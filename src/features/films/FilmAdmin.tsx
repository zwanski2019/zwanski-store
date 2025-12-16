import React, { useState } from 'react'
import type { License } from './types'

type UploadPayload = {
  id: string
  title: string
  license: License
  sourceUrl: string
  notes?: string
}

export default function FilmAdmin() {
  const [token, setToken] = useState('')
  const [payload, setPayload] = useState<UploadPayload>({
    id: '',
    title: '',
    license: 'public-domain',
    sourceUrl: '',
  })
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    setError(null)
    setStatus(null)
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Upload request failed')
      setStatus('Submitted for review.')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className='glass rounded-xl p-6 space-y-4 border-[#e2e8f0]'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-[#0F172A]'>Admin / Intake</h3>
        <p className='text-sm text-[#0F172A] opacity-70'>
          Uploads require rights declaration and manual approval.
        </p>
      </div>
      {status && <div className='text-[#00c853] bg-[#d1fae5] border-2 border-[#00c853] px-4 py-2 rounded-lg font-medium'>{status}</div>}
      {error && <div className='text-[#dc2626] bg-[#fee2e2] border-2 border-[#fca5a5] px-4 py-2 rounded-lg font-medium'>{error}</div>}
      <div className='grid gap-3 md:grid-cols-2'>
        <label className='space-y-1'>
          <span className='text-sm font-semibold text-[#0F172A]'>Admin token</span>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className='w-full rounded-lg bg-[#f8fafc] border-2 border-[#e2e8f0] px-4 py-2 text-[#0F172A] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]'
            placeholder='Bearer token'
          />
        </label>
        <label className='space-y-1'>
          <span className='text-sm font-semibold text-[#0F172A]'>Film ID (slug)</span>
          <input
            value={payload.id}
            onChange={(e) => setPayload({ ...payload, id: e.target.value })}
            className='w-full rounded-lg bg-[#f8fafc] border-2 border-[#e2e8f0] px-4 py-2 text-[#0F172A] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]'
            placeholder='night-of-the-living-dead-1968'
          />
        </label>
        <label className='space-y-1'>
          <span className='text-sm font-semibold text-[#0F172A]'>Title</span>
          <input
            value={payload.title}
            onChange={(e) => setPayload({ ...payload, title: e.target.value })}
            className='w-full rounded-lg bg-[#f8fafc] border-2 border-[#e2e8f0] px-4 py-2 text-[#0F172A] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]'
            placeholder='Night of the Living Dead'
          />
        </label>
        <label className='space-y-1'>
          <span className='text-sm font-semibold text-[#0F172A]'>License</span>
          <select
            value={payload.license}
            onChange={(e) =>
              setPayload({ ...payload, license: e.target.value as License })
            }
            className='w-full rounded-lg bg-[#f8fafc] border-2 border-[#e2e8f0] px-4 py-2 text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]'
          >
            <option value='public-domain'>Public Domain</option>
            <option value='cc'>Creative Commons</option>
            <option value='proprietary'>Proprietary (with rights)</option>
          </select>
        </label>
        <label className='space-y-1 md:col-span-2'>
          <span className='text-sm font-semibold text-[#0F172A]'>Source URL</span>
          <input
            value={payload.sourceUrl}
            onChange={(e) => setPayload({ ...payload, sourceUrl: e.target.value })}
            className='w-full rounded-lg bg-[#f8fafc] border-2 border-[#e2e8f0] px-4 py-2 text-[#0F172A] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]'
            placeholder='https://archive.org/embed/...'
          />
        </label>
        <label className='space-y-1 md:col-span-2'>
          <span className='text-sm font-semibold text-[#0F172A]'>Notes / license proof</span>
          <textarea
            value={payload.notes || ''}
            onChange={(e) => setPayload({ ...payload, notes: e.target.value })}
            className='w-full rounded-lg bg-[#f8fafc] border-2 border-[#e2e8f0] px-4 py-2 text-[#0F172A] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-[#ff6b35]'
            placeholder='Describe license, grant, uploader permission, or link to proof.'
          />
        </label>
      </div>
      <button
        onClick={submit}
        className='inline-flex w-full md:w-auto justify-center rounded-lg bg-[#ff6b35] hover:bg-[#ff5722] px-6 py-2 text-white font-semibold transition shadow-lg'
      >
        Submit for review
      </button>
    </div>
  )
}
