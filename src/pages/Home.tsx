import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Counters from '../components/Counters'

type Product = { id:string; title:string; price:number; description:string; image?:string }

export default function Home(){
  const [featured, setFeatured] = useState<Product[]>([])
  useEffect(()=>{
    const base = (import.meta as any).env?.BASE_URL || '/'
    fetch(base + 'products.json').then(r=>r.json()).then((list:Product[])=> setFeatured(list.slice(0,3))).catch(()=>setFeatured([]))
  },[])

  return (
    <div className='text-[#0F172A]'>
      <SEO title="Home" description="Zwanski Tech — web development, SEO, cybersecurity and IT support for small businesses and startups." image={`${(import.meta as any).env?.BASE_URL || '/'}logo.svg`.replace(/\/\//g,'/')} url={'https://zwanski01.github.io/zwanski-store/'} />

      <section className='section-pad'>
        <div className='container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center'>
          <div className='space-y-6'>
            <div className='pill inline-flex bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/30 text-sm font-semibold'>
              Enterprise-grade security, delivered to SMB speed.
            </div>
            <h1 className='text-4xl sm:text-5xl font-extrabold leading-tight text-[#0F172A]'>
              Build faster. Stay secure. Ship experiences that convert.
            </h1>
            <p className='text-lg text-[#0F172A] max-w-2xl'>
              Zwanski Tech blends security-first engineering, headless commerce, and performance design to protect your brand and accelerate growth.
            </p>
            <div className='flex flex-wrap gap-4'>
              <Link to='/services' className='pill bg-[#ff6b35] hover:bg-[#ff5722] text-white font-semibold shadow-xl hover:-translate-y-0.5 transition'>
                Explore services
              </Link>
              <Link to='/films' className='pill border-2 border-[#e2e8f0] text-[#0F172A] hover:bg-[#f1f5f9] hover:text-[#0F172A] hover:border-[#ff6b35] transition'>
                Zwanski Films library
              </Link>
            </div>
            <div className='grid sm:grid-cols-3 gap-4 text-sm'>
              <div className='glass p-4 rounded-xl'>
                <div className='text-[#0F172A] font-semibold mb-1'>Web & Commerce</div>
                <p className='text-[#0F172A]'>React, Vite, Tailwind, conversion-first funnels.</p>
              </div>
              <div className='glass p-4 rounded-xl'>
                <div className='text-[#0F172A] font-semibold mb-1'>Security</div>
                <p className='text-[#0F172A]'>Hardening, monitoring, takedowns, compliance-ready.</p>
              </div>
              <div className='glass p-4 rounded-xl'>
                <div className='text-[#0F172A] font-semibold mb-1'>Media</div>
                <p className='text-[#0F172A]'>Legal streaming with Cloudflare Workers + R2/Stream.</p>
              </div>
            </div>
          </div>
          <div className='glass rounded-2xl p-6 border border-[#e2e8f0] shadow-2xl'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-sm uppercase tracking-[0.2em] text-[#ff6b35] font-semibold'>Security Pulse</span>
              <span className='pill bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30 text-xs font-semibold'>Live</span>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='card-neo rounded-xl p-4'>
                <div className='text-xs text-[#0F172A] mb-1 opacity-70'>PageSpeed</div>
                <div className='text-2xl font-bold text-[#0F172A]'>98</div>
                <p className='text-xs text-[#00c853] mt-1 font-medium'>Core Web Vitals ready</p>
              </div>
              <div className='card-neo rounded-xl p-4'>
                <div className='text-xs text-[#0F172A] mb-1 opacity-70'>Threats blocked</div>
                <div className='text-2xl font-bold text-[#0F172A]'>12.4K</div>
                <p className='text-xs text-[#00c853] mt-1 font-medium'>Cloud WAF + CSP</p>
              </div>
              <div className='card-neo rounded-xl p-4'>
                <div className='text-xs text-[#0F172A] mb-1 opacity-70'>Deploy time</div>
                <div className='text-2xl font-bold text-[#0F172A]'>3.2m</div>
                <p className='text-xs text-[#00c853] mt-1 font-medium'>Workers edge deploy</p>
              </div>
              <div className='card-neo rounded-xl p-4'>
                <div className='text-xs text-[#0F172A] mb-1 opacity-70'>Uptime</div>
                <div className='text-2xl font-bold text-[#0F172A]'>99.99%</div>
                <p className='text-xs text-[#00c853] mt-1 font-medium'>Global CDN mesh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='section-pad bg-white border-t border-b border-[#e2e8f0]'>
        <div className='container mx-auto px-4 space-y-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
            <div>
              <p className='text-[#ff6b35] text-sm uppercase tracking-[0.2em] font-semibold'>Featured stack</p>
              <h2 className='text-3xl font-bold text-[#0F172A]'>Featured services & products</h2>
            </div>
            <Link to='/shop' className='pill bg-[#ff6b35] hover:bg-[#ff5722] text-white font-semibold transition shadow-lg'>Visit shop</Link>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {featured.map(p=> (
              <div key={p.id} className='card-neo p-5 rounded-2xl hover:-translate-y-1 transition border-[#e2e8f0]'>
                <Link to={`/product/${p.id}`} className='space-y-3 block'>
                  <img src={p.image ? ((import.meta as any).env?.BASE_URL || '/') + p.image.replace(/^\//, '') : ((import.meta as any).env?.BASE_URL || '/') + 'placeholder.png'} alt={p.title} className='h-36 w-full object-contain bg-[#f8fafc] rounded-lg border border-[#e2e8f0]' />
                  <h3 className='font-semibold text-[#0F172A]'>{p.title}</h3>
                  <p className='text-sm text-[#0F172A]'>{p.description}</p>
                </Link>
                <div className='mt-3 flex items-center justify-between text-sm'>
                  <div className='font-bold text-[#0F172A]'>${p.price.toFixed(2)}</div>
                  <Link to={`/product/${p.id}`} className='text-[#ff6b35] hover:text-[#ff5722] font-semibold'>View</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='section-pad'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row lg:items-center gap-6'>
            <div className='lg:w-1/2 space-y-3'>
              <p className='text-[#ff6b35] text-sm uppercase tracking-[0.2em] font-semibold'>Impact</p>
              <h2 className='text-3xl font-bold text-[#0F172A]'>Proven delivery, measurable results.</h2>
              <p className='text-[#0F172A]'>Security-first engineering, monitoring, and rapid incident workflows to keep you online. When something breaks, we ship a fix in minutes, not days.</p>
            </div>
            <div className='lg:w-1/2 glass rounded-2xl p-6 border-[#e2e8f0]'>
              <Counters />
            </div>
          </div>
        </div>
      </section>

      <section className='section-pad bg-white border-t border-[#e2e8f0]'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-[#0F172A] mb-6'>Why Zwanski Tech</h2>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='card-neo rounded-2xl p-5 border-[#e2e8f0]'>
              <h4 className='font-semibold text-[#0F172A] mb-2'>Performance First</h4>
              <p className='text-[#0F172A]'>Headless builds tuned for Core Web Vitals, Lighthouse 95+ targets, and rapid edge rendering.</p>
            </div>
            <div className='card-neo rounded-2xl p-5 border-[#e2e8f0]'>
              <h4 className='font-semibold text-[#0F172A] mb-2'>Security & Reliability</h4>
              <p className='text-[#0F172A]'>CSP, rate limits, WAF-friendly patterns, and takedown workflows built in.</p>
            </div>
            <div className='card-neo rounded-2xl p-5 border-[#e2e8f0]'>
              <h4 className='font-semibold text-[#0F172A] mb-2'>Transparent Pricing</h4>
              <p className='text-[#0F172A]'>Clear packages with upgrade paths to Cloudflare enterprise features as you scale.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}