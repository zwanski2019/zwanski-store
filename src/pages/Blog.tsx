import React, { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import { fetchBlogPosts, extractFirstImage, getExcerpt, formatDate, type BloggerPost } from '../services/blogger'

export default function Blog(){
  const base = (import.meta as any).env?.BASE_URL || '/'
  const [posts, setPosts] = useState<BloggerPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        const blogPosts = await fetchBlogPosts(12)
        setPosts(blogPosts)
        setError(null)
      } catch (err) {
        console.error('Failed to load blog posts:', err)
        setError('Failed to load blog posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    loadPosts()
  }, [])
  
  return (
    <div className='text-[#0F172A]'>
      <SEO 
        title="Blog | Zwanski Tech" 
        description="Zwanski Tech Blog and Tutorials - founder insights, coding, cybersecurity, and more." 
        image={`${base}logo.svg`.replace(/\/\//g,'/')} 
        url={'https://zwanski01.github.io/zwanski-store/blog'} 
      />
      
      <header className='mb-8'>
        <h1 className='text-4xl font-extrabold text-[#0F172A] mb-3'>Zwanski Tech Blog & Tutorials</h1>
        <p className='text-[#0F172A] opacity-70'>Insights, tutorials, and updates from the Zwanski Tech team.</p>
      </header>
      
      {loading && (
        <div className='flex items-center justify-center py-12'>
          <div className='text-center'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b35] mb-4'></div>
            <p className='text-[#0F172A] opacity-70'>Loading blog posts...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className='card-neo rounded-xl p-6 border-[#e2e8f0] bg-red-50 border-red-200'>
          <p className='text-red-600'>{error}</p>
        </div>
      )}
      
      {!loading && !error && posts.length === 0 && (
        <div className='card-neo rounded-xl p-8 border-[#e2e8f0] text-center'>
          <p className='text-[#0F172A] opacity-70'>No blog posts found. Check back soon for updates!</p>
        </div>
      )}
      
      {!loading && !error && posts.length > 0 && (
        <section className='space-y-6'>
          {/* Featured/Recent Posts Grid */}
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => {
              const imageUrl = extractFirstImage(post.content)
              const excerpt = getExcerpt(post.content, 120)
              
              return (
                <article
                  key={post.id}
                  className='card-neo rounded-xl overflow-hidden border-[#e2e8f0] hover:border-[#ff6b35] transition-all duration-300 hover:shadow-lg group'
                >
                  {imageUrl && (
                    <div className='relative h-48 overflow-hidden bg-gray-100'>
                      <img
                        src={imageUrl}
                        alt={post.title}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                    </div>
                  )}
                  
                  <div className='p-6'>
                    <div className='flex items-center gap-2 mb-3'>
                      <time className='text-xs text-[#0F172A] opacity-60 font-medium'>
                        {formatDate(post.published)}
                      </time>
                      {post.labels && post.labels.length > 0 && (
                        <span className='text-xs px-2 py-1 bg-[#ff6b35]/10 text-[#ff6b35] rounded-full'>
                          {post.labels[0]}
                        </span>
                      )}
                    </div>
                    
                    <h2 className='text-xl font-bold text-[#0F172A] mb-2 line-clamp-2 group-hover:text-[#ff6b35] transition-colors'>
                      <a
                        href={post.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:underline'
                      >
                        {post.title}
                      </a>
                    </h2>
                    
                    {excerpt && (
                      <p className='text-sm text-[#0F172A] opacity-70 mb-4 line-clamp-3'>
                        {excerpt}
                      </p>
                    )}
                    
                    <div className='flex items-center justify-between'>
                      <a
                        href={post.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm font-semibold text-[#ff6b35] hover:text-[#ff5722] flex items-center gap-1 group'
                      >
                        Read More
                        <span className='group-hover:translate-x-1 transition-transform'>→</span>
                      </a>
                      
                      {post.author && (
                        <div className='text-xs text-[#0F172A] opacity-60'>
                          {post.author.displayName}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          
          {/* Link to full blog */}
          <div className='text-center pt-6'>
            <a
              href='https://www.blogger.com/blog/1865195035349515836'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b35] hover:bg-[#ff5722] text-white font-semibold rounded-lg shadow-lg transition-colors'
            >
              View All Posts on Blogger
              <span>→</span>
            </a>
          </div>
        </section>
      )}
    </div>
  )
}

