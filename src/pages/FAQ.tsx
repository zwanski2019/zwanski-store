import React, { useState } from 'react'
import SEO from '../components/SEO'

const FAQS = [
  { q: 'How do I buy a service?', a: 'Add to cart and checkout with PayPal sandbox or external checkout. For production, integrate with your preferred payment processor.' },
  { q: 'Do you provide refunds?', a: 'See our refund policy page for details. Digital goods and delivered work are generally non-refundable once delivered, but we review valid requests case-by-case.' },
  { q: 'Can you host my site?', a: 'We provide consultancy and migration support; hosting depends on your provider. We can help you deploy to Cloudflare Pages, Vercel, Netlify, or your own infrastructure.' },
  { q: 'What technologies do you use?', a: 'React, Vite, TypeScript, TailwindCSS for frontend. Cloudflare Workers, Node.js, Python for backend. We choose the best stack for each project.' },
  { q: 'Do you offer ongoing support?', a: 'Yes, we offer maintenance packages, security monitoring, and performance optimization on a monthly or annual basis. Contact us for custom support plans.' },
  { q: 'How long does a typical project take?', a: 'Starter sites: 1-2 weeks. E-commerce builds: 3-6 weeks. Enterprise projects: varies based on scope. We provide timelines during initial consultation.' }
]

export default function FAQ(){
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className='text-[#0F172A]'>
      <SEO title="FAQ" description="Frequently asked questions about Zwanski Tech services, purchases, and policies." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/faq'} />
      <header className='mb-8'>
        <h1 className='text-4xl font-extrabold text-[#0F172A] mb-3'>Frequently Asked Questions</h1>
        <p className='text-[#0F172A] opacity-70'>Find answers to common questions about our services, policies, and processes.</p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        {FAQS.map((f,i)=>(
          <div 
            key={i} 
            className='card-neo rounded-xl p-5 border-[#e2e8f0] hover:border-[#ff6b35] transition cursor-pointer'
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className='flex items-start justify-between gap-3'>
              <h4 className='font-semibold text-[#0F172A] flex-1'>{f.q}</h4>
              <button className='text-[#ff6b35] font-bold text-xl leading-none'>
                {openIndex === i ? '−' : '+'}
              </button>
            </div>
            {openIndex === i && (
              <p className='text-[#0F172A] mt-3 pt-3 border-t border-[#e2e8f0]'>{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
