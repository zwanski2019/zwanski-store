// Blogger API service
// Use Cloudflare Worker proxy to avoid CORS issues
// For local dev, set VITE_API_BASE_URL=http://localhost:8787
// For production, the worker should be deployed on the same domain
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const BLOGGER_API_URL = `${API_BASE_URL}/api/blog/posts`

export interface BloggerPost {
  id: string
  title: string
  content: string
  published: string
  updated: string
  url: string
  selfLink?: string
  author?: {
    displayName: string
    url: string
    image?: {
      url: string
    }
  }
  labels?: string[]
  images?: string[]
  etag?: string
}

export interface BloggerResponse {
  items: BloggerPost[]
  nextPageToken?: string
}

/**
 * Fetch blog posts from Blogger API
 */
export async function fetchBlogPosts(maxResults: number = 10): Promise<BloggerPost[]> {
  try {
    // Use relative URL to hit Cloudflare Worker proxy
    const url = `${BLOGGER_API_URL}?maxResults=${maxResults}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Blogger API error response:', errorText)
      throw new Error(`Blogger API error: ${response.status} ${response.statusText}`)
    }
    
    const items: BloggerPost[] = await response.json()
    
    if (!Array.isArray(items)) {
      console.warn('Unexpected Blogger API response format:', items)
      return []
    }
    
    return items.map(post => ({
      ...post,
      // Ensure author object exists
      author: post.author || {
        displayName: 'Zwanski Tech',
        url: ''
      }
    }))
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
}

/**
 * Extract first image from HTML content
 */
export function extractFirstImage(html: string): string | null {
  const imgMatch = html.match(/<img[^>]+src="([^"]+)"/i)
  return imgMatch ? imgMatch[1] : null
}

/**
 * Strip HTML tags and get excerpt
 */
export function getExcerpt(html: string, maxLength: number = 150): string {
  const text = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
