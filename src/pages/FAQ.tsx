import React from 'react'
import SEO from '../components/SEO'

const FAQS = [
  { q: 'How do I buy a service?', a: 'Add to cart and checkout with PayPal sandbox or external checkout.' },
  { q: 'Do you provide refunds?', a: 'See our refund policy page for details.' },
  { q: 'Can you host my site?', a: 'We provide consultancy and migration support; hosting depends on your provider.' }
]

export default function FAQ(){
  return (
    <div>
      <SEO title="FAQ" description="Frequently asked questions about Zwanski Tech services, purchases, and policies." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/faq'} />
      <h1 className='text-3xl font-bold mb-4'>FAQ</h1>
      <div className='space-y-4'>
        {FAQS.map((f,i)=>(
          <div key={i} className='p-4 border rounded'>
            <h4 className='font-semibold'>{f.q}</h4>
            <p className='text-gray-700 mt-2'>{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
