import React, { useEffect } from 'react'

type Props = {
  title?: string
  description?: string
  image?: string
  url?: string
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setProperty(prop: string, content: string) {
  let el = document.querySelector(`meta[property="${prop}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', prop)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function SEO({ title, description, image, url }: Props) {
  useEffect(() => {
    if (title) document.title = title + ' — Zwanski Tech'
    if (description) setMeta('description', description)
    setProperty('og:site_name', 'Zwanski Tech')
    if (title) setProperty('og:title', title)
    if (description) setProperty('og:description', description)
    if (url) setProperty('og:url', url)
    // Resolve image paths so they work with Vite base when deployed to GitHub Pages
    let resolvedImage: string | undefined = undefined
    if (image) {
      if (/^https?:/.test(image)) resolvedImage = image
      else {
        const base = (import.meta as any).env?.BASE_URL || '/'
        resolvedImage = base + image.replace(/^\//, '')
      }
    }

    if (resolvedImage) setProperty('og:image', resolvedImage)
    setProperty('og:type', 'website')
    setMeta('twitter:card', 'summary_large_image')
    if (title) setMeta('twitter:title', title)
    if (description) setMeta('twitter:description', description)
    if (resolvedImage) setMeta('twitter:image', resolvedImage)
  }, [title, description, image, url])

  useEffect(()=>{
    // Inject basic Organization structured data
    const base = (import.meta as any).env?.BASE_URL || '/'
    const org = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Zwanski Tech",
      "url": "https://zwanski01.github.io/zwanski-store/",
      "logo": base + 'logo.svg',
      "sameAs": [
        "https://github.com/zwanski01"
      ]
    }
    let el = document.querySelector('script[type="application/ld+json"][data-generated-by="seo"]')
    if (!el) {
      el = document.createElement('script')
      el.setAttribute('type','application/ld+json')
      el.setAttribute('data-generated-by','seo')
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(org)
  }, [])

  return null
}
