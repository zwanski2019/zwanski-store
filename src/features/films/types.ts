export type License = 'public-domain' | 'cc' | 'proprietary'

export type FilmSource = {
  type: 'internet-archive' | 'youtube-cc' | 'r2'
  url: string
  license: License
  licenseLabel: string
  subtitles?: string
}

export type FilmItem = {
  id: string
  title: string
  year?: string
  synopsis?: string
  poster?: string
  genres?: string[]
  sources: FilmSource[]
  license: License
  licenseLabel: string
  tags?: string[]
}
