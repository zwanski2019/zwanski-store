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
    if (image) setProperty('og:image', image)
    setProperty('og:type', 'website')
    setMeta('twitter:card', 'summary_large_image')
    if (title) setMeta('twitter:title', title)
    if (description) setMeta('twitter:description', description)
    if (image) setMeta('twitter:image', image)
  }, [title, description, image, url])

  return null
}
