import React, { useMemo, useState } from 'react'
import FilmSearch from '../features/films/FilmSearch'
import FilmBrowse from '../features/films/FilmBrowse'
import FilmDetail from '../features/films/FilmDetail'
import FilmAdmin from '../features/films/FilmAdmin'
import type { FilmItem } from '../features/films/types'

function seedFilms(): FilmItem[] {
  return [
    {
      id: 'night-of-the-living-dead-1968',
      title: 'Night of the Living Dead',
      year: '1968',
      synopsis:
        'Public-domain classic horror where a group shelters in a farmhouse during a zombie outbreak.',
      poster:
        'https://archive.org/services/img/night_of_the_living_dead/night_of_the_living_dead',
      genres: ['Horror', 'Classic'],
      sources: [
        {
          type: 'internet-archive',
          url: 'https://archive.org/embed/night_of_the_living_dead',
          license: 'public-domain',
          licenseLabel: 'Public Domain (US)',
        },
      ],
      license: 'public-domain',
      licenseLabel: 'Public Domain (US)',
      tags: ['public-domain', 'classic'],
    },
    {
      id: 'charade-1963',
      title: 'Charade',
      year: '1963',
      synopsis:
        'Cary Grant and Audrey Hepburn in a stylish thriller; public-domain in the US.',
      poster: 'https://archive.org/services/img/Charade_489',
      genres: ['Thriller', 'Classic'],
      sources: [
        {
          type: 'internet-archive',
          url: 'https://archive.org/embed/Charade_489',
          license: 'public-domain',
          licenseLabel: 'Public Domain (US)',
        },
      ],
      license: 'public-domain',
      licenseLabel: 'Public Domain (US)',
      tags: ['public-domain', 'classic', 'thriller'],
    },
  ]
}

export default function Films() {
  const [selected, setSelected] = useState<string | null>(null)
  const films = useMemo(() => seedFilms(), [])

  return (
    <div className='space-y-10 text-[#0F172A]'>
      <header className='section-pad pb-4'>
        <div className='container mx-auto px-4 grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center'>
          <div className='space-y-3'>
            <p className='text-sm uppercase tracking-[0.2em] text-emerald-200 font-semibold'>
              Zwanski Films — Legal Movie Library
            </p>
            <h1 className='text-4xl font-extrabold text-white leading-tight'>
              Stream only what you’re allowed to stream.
            </h1>
            <p className='text-slate-300 max-w-2xl'>
              Public-domain classics and Creative Commons films, verified sources only. Internet Archive and YouTube CC embeds plus Cloudflare-hosted assets for rights-cleared uploads.
            </p>
            <div className='flex gap-3 flex-wrap'>
              <button
                onClick={() => setSelected(films[0]?.id || null)}
                className='pill bg-[#ff6b35] hover:bg-[#ff5722] text-white font-semibold hover:-translate-y-0.5 transition shadow-lg'
              >
                Start with a classic
              </button>
              <a href='https://developer.themoviedb.org/reference/search-movie' target='_blank' rel='noreferrer' className='pill border-2 border-[#e2e8f0] text-[#0F172A] hover:bg-[#f1f5f9] hover:text-[#0F172A] hover:border-[#ff6b35] transition'>
                TMDb metadata usage
              </a>
            </div>
          </div>
          <div className='glass rounded-2xl p-5 border border-[#e2e8f0] shadow-2xl'>
            <div className='flex items-center justify-between mb-3'>
              <span className='text-xs uppercase tracking-[0.2em] text-[#ff6b35] font-semibold'>Compliance</span>
              <span className='pill bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30 text-xs font-semibold'>DMCA ready</span>
            </div>
            <ul className='space-y-2 text-sm text-[#0F172A]'>
              <li>• License badge on every title.</li>
              <li>• Only Internet Archive, YouTube CC, or owned Cloudflare R2/Stream.</li>
              <li>• Admin review required for uploads with proof of rights.</li>
              <li>• Takedown form routes to Worker for fast action.</li>
            </ul>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 space-y-8'>
        <FilmSearch onSelect={(id) => setSelected(id)} />

        <FilmBrowse films={films} onSelect={(id) => setSelected(id)} />

        {selected && (
          <section className='space-y-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-[#0F172A]'>Now viewing</h2>
              <button
                className='text-sm text-[#ff6b35] hover:text-[#ff5722] transition font-medium'
                onClick={() => setSelected(null)}
              >
                Clear
              </button>
            </div>
            <FilmDetail filmId={selected} />
          </section>
        )}

        <section className='space-y-3'>
          <h2 className='text-xl font-semibold text-[#0F172A]'>Admin & Intake</h2>
          <FilmAdmin />
        </section>
      </div>
    </div>
  )
}
