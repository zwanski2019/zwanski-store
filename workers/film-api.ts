export interface Env {
  FILM_CACHE: KVNamespace
  R2_ASSETS: R2Bucket
  ADMIN_TOKEN: string
  ORIGIN_ALLOWED?: string
  BLOGGER_API_KEY?: string
  BLOGGER_BLOG_ID?: string
}

const JSON_HEADERS = { 'content-type': 'application/json' }

type License = 'public-domain' | 'cc' | 'proprietary'

interface FilmSource {
  type: 'internet-archive' | 'youtube-cc' | 'r2'
  url: string
  license: License
  licenseLabel: string
  subtitles?: string
}

interface FilmItem {
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

const notFound = () =>
  new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: JSON_HEADERS,
  })

const json = (data: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: { ...JSON_HEADERS, ...(init?.headers || {}) },
  })

const withCors = (req: Request, res: Response) => {
  const origin = req.headers.get('origin')
  const headers = new Headers(res.headers)
  if (origin) {
    headers.set('access-control-allow-origin', origin)
    headers.set('vary', 'Origin')
  }
  headers.set('access-control-allow-methods', 'GET,POST,OPTIONS')
  headers.set('access-control-allow-headers', 'content-type,authorization')
  headers.set('access-control-max-age', '86400')
  return new Response(res.body, { ...res, headers })
}

async function cachedFetch(
  cache: KVNamespace,
  key: string,
  fetcher: () => Promise<unknown>,
  ttlSeconds = 3600
) {
  const cached = await cache.get(key, 'json')
  if (cached) return cached
  const fresh = await fetcher()
  await cache.put(key, JSON.stringify(fresh), { expirationTtl: ttlSeconds })
  return fresh
}

async function searchInternetArchive(query: string) {
  const url = new URL('https://archive.org/advancedsearch.php')
  url.searchParams.set('q', `${query} AND mediatype:(movies)`)
  url.searchParams.set('output', 'json')
  url.searchParams.set('rows', '5')
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Internet Archive error')
  const data = await res.json()
  return data?.response?.docs || []
}

function buildSeed(): FilmItem[] {
  // Curated public-domain / clearly licensed classics from Internet Archive.
  // These are embeds only; no external API keys required.
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

async function handleSearch(req: Request, env: Env) {
  const query = new URL(req.url).searchParams.get('q')
  if (!query) return json({ error: 'Missing q' }, { status: 400 })
  return json({
    query,
    seed: buildSeed().filter((f) =>
      f.title.toLowerCase().includes(query.toLowerCase())
    ),
  })
}

async function handleMovie(req: Request, env: Env, id: string) {
  const seed = buildSeed().find((f) => f.id === id)
  if (!seed) return notFound()
  return json({ item: seed })
}

async function handleUpload(req: Request, env: Env) {
  const token = req.headers.get('authorization')
  if (!token || token !== `Bearer ${env.ADMIN_TOKEN}`)
    return json({ error: 'Unauthorized' }, { status: 401 })
  const payload = await req.json().catch(() => null)
  if (!payload?.id || !payload?.title || !payload?.license)
    return json({ error: 'Missing fields' }, { status: 400 })
  await env.FILM_CACHE.put(`upload:${payload.id}`, JSON.stringify(payload), {
    expirationTtl: 86400,
  })
  return json({ ok: true, review: 'pending' })
}

async function handleTakedown(req: Request, env: Env) {
  const payload = await req.json().catch(() => null)
  if (!payload?.itemId || !payload?.contact)
    return json({ error: 'Missing fields' }, { status: 400 })
  const reportId = crypto.randomUUID()
  await env.FILM_CACHE.put(`dmca:${reportId}`, JSON.stringify(payload), {
    expirationTtl: 7 * 86400,
  })
  return json({ ok: true, reportId })
}

async function handleBlogPosts(req: Request, env: Env) {
  if (!env.BLOGGER_API_KEY || !env.BLOGGER_BLOG_ID) {
    return json(
      { error: 'Blogger integration is not configured on this environment' },
      { status: 500 }
    )
  }

  const apiKey = env.BLOGGER_API_KEY
  const blogId = env.BLOGGER_BLOG_ID
  const url = new URL(req.url)
  const maxResults = parseInt(url.searchParams.get('maxResults') || '12')
  
  const bloggerUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=${maxResults}&fetchBodies=true&fetchImages=true&orderBy=published&status=published`
  
  return cachedFetch(env.FILM_CACHE, `blogger:posts:${maxResults}`, async () => {
    const res = await fetch(bloggerUrl)
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Blogger API error: ${res.status} ${errorText}`)
    }
    const data = await res.json()
    return data?.items || []
  }, 1800) // Cache for 30 minutes
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method === 'OPTIONS')
      return withCors(req, new Response(null, { status: 204 }))

    try {
      const url = new URL(req.url)
      const path = url.pathname

      if (path === '/api/search' && req.method === 'GET')
        return withCors(req, await handleSearch(req, env))

      if (path.startsWith('/api/movie/') && req.method === 'GET') {
        const id = path.replace('/api/movie/', '')
        return withCors(req, await handleMovie(req, env, id))
      }

      if (path === '/api/admin/upload' && req.method === 'POST')
        return withCors(req, await handleUpload(req, env))

      if (path === '/api/takedown' && req.method === 'POST')
        return withCors(req, await handleTakedown(req, env))

      if (path === '/api/blog/posts' && req.method === 'GET')
        return withCors(req, await handleBlogPosts(req, env))

      return withCors(
        req,
        new Response(JSON.stringify({ error: 'Route not found' }), {
          status: 404,
          headers: JSON_HEADERS,
        })
      )
    } catch (err) {
      return withCors(
        req,
        json(
          { error: 'Internal error', message: (err as Error).message },
          { status: 500 }
        )
      )
    }
  },
}
