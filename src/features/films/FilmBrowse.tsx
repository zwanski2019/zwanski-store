import React from 'react'
import type { FilmItem } from './types'

type Props = {
  films: FilmItem[]
  onSelect: (id: string) => void
}

export default function FilmBrowse({ films, onSelect }: Props) {
  return (
    <section className='glass rounded-xl p-6 border-[#e2e8f0]'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold text-[#0F172A]'>Browse seed titles</h2>
        <span className='text-sm text-[#0F172A] opacity-70'>{films.length} titles</span>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {films.map((film) => (
          <button
            key={film.id}
            onClick={() => onSelect(film.id)}
            className='text-left card-neo rounded-lg hover:border-[#ff6b35] transition overflow-hidden border-[#e2e8f0]'
          >
            {film.poster ? (
              <img src={film.poster} alt={film.title} className='w-full h-44 object-cover' />
            ) : (
              <div className='h-44 w-full bg-[#f8fafc]' />
            )}
            <div className='p-3 space-y-1'>
              <div className='text-xs uppercase text-[#0F172A] opacity-70'>{film.year}</div>
              <div className='font-semibold text-[#0F172A]'>{film.title}</div>
              <div className='text-xs text-[#00c853] bg-[#00c853]/10 border border-[#00c853]/30 inline-flex px-2 py-1 rounded-full mt-2 font-medium'>
                {film.licenseLabel}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
