import React, { useState, useEffect } from 'react'
import SEO from '../components/SEO'

type Resource = {
  title: string
  description: string
  url: string
  type: 'course' | 'documentation' | 'tutorial' | 'tool'
  source: string
  free: boolean
}

const OPEN_SOURCE_RESOURCES: Resource[] = [
  {
    title: 'freeCodeCamp',
    description: 'Free, self-paced coding bootcamp covering web development, Python, data science, and cybersecurity.',
    url: 'https://www.freecodecamp.org',
    type: 'course',
    source: 'freeCodeCamp',
    free: true
  },
  {
    title: 'MDN Web Docs',
    description: 'Comprehensive documentation for web technologies including HTML, CSS, JavaScript, and Web APIs.',
    url: 'https://developer.mozilla.org',
    type: 'documentation',
    source: 'Mozilla',
    free: true
  },
  {
    title: 'The Odin Project',
    description: 'Full-stack web development curriculum covering HTML, CSS, JavaScript, Node.js, and React.',
    url: 'https://www.theodinproject.com',
    type: 'course',
    source: 'The Odin Project',
    free: true
  },
  {
    title: 'Python.org Official Tutorial',
    description: 'Official Python tutorial covering basics to advanced topics, maintained by Python Software Foundation.',
    url: 'https://docs.python.org/3/tutorial/',
    type: 'tutorial',
    source: 'Python.org',
    free: true
  },
  {
    title: 'OWASP Web Security',
    description: 'Open Web Application Security Project resources, guides, and tools for secure development.',
    url: 'https://owasp.org',
    type: 'documentation',
    source: 'OWASP',
    free: true
  },
  {
    title: 'React Official Docs',
    description: 'Official React documentation with tutorials, API reference, and best practices.',
    url: 'https://react.dev',
    type: 'documentation',
    source: 'Meta',
    free: true
  },
  {
    title: 'Cloudflare Workers Docs',
    description: 'Learn to build serverless applications with Cloudflare Workers, KV, and R2.',
    url: 'https://developers.cloudflare.com/workers',
    type: 'documentation',
    source: 'Cloudflare',
    free: true
  },
  {
    title: 'GitHub Learning Lab',
    description: 'Interactive courses on Git, GitHub, and open source collaboration directly in GitHub.',
    url: 'https://lab.github.com',
    type: 'course',
    source: 'GitHub',
    free: true
  },
  {
    title: 'Khan Academy Computing',
    description: 'Free courses on computer programming, algorithms, and computer science fundamentals.',
    url: 'https://www.khanacademy.org/computing',
    type: 'course',
    source: 'Khan Academy',
    free: true
  },
  {
    title: 'W3Schools',
    description: 'Tutorials and references for web development technologies with interactive examples.',
    url: 'https://www.w3schools.com',
    type: 'tutorial',
    source: 'W3Schools',
    free: true
  },
  {
    title: 'Vite Documentation',
    description: 'Official Vite documentation for building fast, modern web applications.',
    url: 'https://vitejs.dev',
    type: 'documentation',
    source: 'Vite',
    free: true
  },
  {
    title: 'Tailwind CSS Docs',
    description: 'Complete documentation for Tailwind CSS utility-first framework.',
    url: 'https://tailwindcss.com/docs',
    type: 'documentation',
    source: 'Tailwind Labs',
    free: true
  }
]

const typeColors: Record<string, string> = {
  course: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  documentation: 'bg-green-500/10 text-green-600 border-green-500/30',
  tutorial: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
  tool: 'bg-orange-500/10 text-orange-600 border-orange-500/30'
}

export default function Academy(){
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' 
    ? OPEN_SOURCE_RESOURCES 
    : OPEN_SOURCE_RESOURCES.filter(r => r.type === filter)

  return (
    <div className='text-[#0F172A]'>
      <SEO title="Academy" description="Free open-source learning resources for web development, Python, cybersecurity, and cloud technologies." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/academy'} />
      
      <header className='mb-8'>
        <h1 className='text-4xl font-extrabold text-[#0F172A] mb-3'>Academy — Open Source Learning</h1>
        <p className='text-[#0F172A] opacity-70 max-w-3xl'>
          Curated collection of free, open-source learning resources for web development, Python, cybersecurity, and cloud technologies. All resources are free and maintained by their respective communities.
        </p>
      </header>

      <div className='mb-6 flex flex-wrap gap-2'>
        <button
          onClick={() => setFilter('all')}
          className={`pill transition ${
            filter === 'all'
              ? 'bg-[#ff6b35] text-white'
              : 'bg-white border-2 border-[#e2e8f0] text-[#0F172A] hover:border-[#ff6b35]'
          }`}
        >
          All Resources
        </button>
        <button
          onClick={() => setFilter('course')}
          className={`pill transition ${
            filter === 'course'
              ? 'bg-[#ff6b35] text-white'
              : 'bg-white border-2 border-[#e2e8f0] text-[#0F172A] hover:border-[#ff6b35]'
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setFilter('documentation')}
          className={`pill transition ${
            filter === 'documentation'
              ? 'bg-[#ff6b35] text-white'
              : 'bg-white border-2 border-[#e2e8f0] text-[#0F172A] hover:border-[#ff6b35]'
          }`}
        >
          Documentation
        </button>
        <button
          onClick={() => setFilter('tutorial')}
          className={`pill transition ${
            filter === 'tutorial'
              ? 'bg-[#ff6b35] text-white'
              : 'bg-white border-2 border-[#e2e8f0] text-[#0F172A] hover:border-[#ff6b35]'
          }`}
        >
          Tutorials
        </button>
        <button
          onClick={() => setFilter('tool')}
          className={`pill transition ${
            filter === 'tool'
              ? 'bg-[#ff6b35] text-white'
              : 'bg-white border-2 border-[#e2e8f0] text-[#0F172A] hover:border-[#ff6b35]'
          }`}
        >
          Tools
        </button>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {filtered.map((resource, i) => (
          <div key={i} className='card-neo rounded-xl p-5 border-[#e2e8f0] hover:border-[#ff6b35] transition hover:-translate-y-1'>
            <div className='flex items-start justify-between gap-2 mb-2'>
              <h3 className='font-semibold text-[#0F172A] flex-1'>{resource.title}</h3>
              {resource.free && (
                <span className='text-xs bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30 px-2 py-1 rounded-full font-medium'>
                  Free
                </span>
              )}
            </div>
            <p className='text-[#0F172A] text-sm mb-3 opacity-80'>{resource.description}</p>
            <div className='flex items-center justify-between mt-4 pt-3 border-t border-[#e2e8f0]'>
              <div className='flex items-center gap-2'>
                <span className={`text-xs px-2 py-1 rounded-full border ${typeColors[resource.type]}`}>
                  {resource.type}
                </span>
                <span className='text-xs text-[#0F172A] opacity-60'>{resource.source}</span>
              </div>
              <a
                href={resource.url}
                target='_blank'
                rel='noreferrer'
                className='text-[#ff6b35] hover:text-[#ff5722] font-semibold text-sm'
              >
                Visit →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}