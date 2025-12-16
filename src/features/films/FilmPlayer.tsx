import React from 'react'
import type { FilmItem } from './types'

type Props = {
  film: FilmItem
}

const badgeClass: Record<string, string> = {
  'public-domain': 'bg-[#00c853]/10 text-[#00c853] border-[#00c853]/30',
  cc: 'bg-[#2196f3]/10 text-[#2196f3] border-[#2196f3]/30',
  proprietary: 'bg-[#ff9800]/10 text-[#ff9800] border-[#ff9800]/30',
}

export default function FilmPlayer({ film }: Props) {
  const primary = film.sources[0]

  return (
    <div className='glass rounded-xl overflow-hidden border-[#e2e8f0]'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-2/3 bg-black aspect-video'>
          {primary?.type === 'internet-archive' || primary?.type === 'youtube-cc' ? (
            <iframe
              src={primary.url}
              title={film.title}
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='w-full h-full'
            />
          ) : (
            <video className='w-full h-full' controls src={primary?.url}>
              {primary?.subtitles && <track kind='subtitles' src={primary.subtitles} />}
            </video>
          )}
        </div>
        <div className='lg:w-1/3 p-6 space-y-3 bg-white'>
          <div className='flex items-center gap-3'>
            {film.poster && (
              <img
                src={film.poster}
                alt={film.title}
                className='w-20 h-28 object-cover rounded-lg border-2 border-[#e2e8f0]'
              />
            )}
            <div>
              <h3 className='text-xl font-semibold text-[#0F172A]'>{film.title}</h3>
              <p className='text-[#0F172A] text-sm'>{film.synopsis}</p>
            </div>
          </div>
          <div className='flex flex-wrap gap-2'>
            <span
              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${
                badgeClass[film.license]
              }`}
            >
              {film.licenseLabel}
            </span>
            {film.genres?.map((g) => (
              <span key={g} className='text-xs px-2 py-1 rounded-full bg-[#f8fafc] text-[#0F172A] border border-[#e2e8f0]'>
                {g}
              </span>
            ))}
          </div>
          <div>
            <div className='text-sm font-semibold text-[#0F172A] mb-1'>Sources</div>
            <ul className='text-sm space-y-1'>
              {film.sources.map((src) => (
                <li key={src.url} className='flex items-center gap-2 text-[#0F172A]'>
                  <span className='font-semibold capitalize'>{src.type}</span>
                  <a
                    href={src.url}
                    className='text-[#ff6b35] hover:text-[#ff5722] hover:underline break-all transition'
                    target='_blank'
                    rel='noreferrer'
                  >
                    View source
                  </a>
                  <span className='text-xs text-[#0F172A] opacity-70'>{src.licenseLabel}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
