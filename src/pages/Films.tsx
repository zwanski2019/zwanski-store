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
    {
      id: 'his-girl-friday-1940',
      title: 'His Girl Friday',
      year: '1940',
      synopsis:
        'Fast-talking newspaper editor tries to win back his star reporter ex-wife before she remarries.',
      poster: 'https://archive.org/services/img/his_girl_friday/his_girl_friday',
      genres: ['Comedy', 'Romance'],
      sources: [
        {
          type: 'internet-archive',
          url: 'https://archive.org/embed/his_girl_friday',
          license: 'public-domain',
          licenseLabel: 'Public Domain (US)',
        },
      ],
      license: 'public-domain',
      licenseLabel: 'Public Domain (US)',
      tags: ['public-domain', 'classic', 'comedy'],
    },
    {
      id: 'house-on-haunted-hill-1959',
      title: 'House on Haunted Hill',
      year: '1959',
      synopsis:
        'Vincent Price hosts a haunted house party where guests must survive the night for a cash prize.',
      poster:
        'https://archive.org/services/img/House_on_Haunted_Hill/House_on_Haunted_Hill',
      genres: ['Horror', 'Classic'],
      sources: [
        {
          type: 'internet-archive',
          url: 'https://archive.org/embed/House_on_Haunted_Hill',
          license: 'public-domain',
          licenseLabel: 'Public Domain (US)',
        },
      ],
      license: 'public-domain',
      licenseLabel: 'Public Domain (US)',
      tags: ['public-domain', 'classic', 'horror'],
    },
    {
      id: 'plan-9-from-outer-space-1959',
      title: 'Plan 9 from Outer Space',
      year: '1959',
      synopsis:
        'Infamous cult classic where aliens resurrect the dead to stop humans from creating a doomsday weapon.',
      poster:
        'https://archive.org/services/img/Plan_9_from_Outer_Space_1959/Plan_9_from_Outer_Space_1959',
      genres: ['Sci-Fi', 'Cult'],
      sources: [
        {
          type: 'internet-archive',
          url: 'https://archive.org/embed/Plan_9_from_Outer_Space_1959',
          license: 'public-domain',
          licenseLabel: 'Public Domain (US)',
        },
      ],
      license: 'public-domain',
      licenseLabel: 'Public Domain (US)',
      tags: ['public-domain', 'classic', 'sci-fi'],
    },
    {
      id: 'the-brain-that-wouldnt-die-1962',
      title: "The Brain That Wouldn't Die",
      year: '1962',
      synopsis:
        'A scientist keeps his fiancée’s head alive while searching for a new body in seedy nightclubs.',
      poster:
        'https://archive.org/services/img/TheBrainThatWouldntDie/TheBrainThatWouldntDie',
      genres: ['Horror', 'Sci-Fi'],
      sources: [
        {
          type: 'internet-archive',
          url: 'https://archive.org/embed/TheBrainThatWouldntDie',
          license: 'public-domain',
          licenseLabel: 'Public Domain (US)',
        },
      ],
      license: 'public-domain',
      licenseLabel: 'Public Domain (US)',
      tags: ['public-domain', 'classic', 'horror'],
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
                Start watching now
              </button>
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
