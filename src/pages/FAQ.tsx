import React from 'react'

const FAQS = [
  { q: 'How do I buy a service?', a: 'Add to cart and checkout with PayPal sandbox or external checkout.' },
  { q: 'Do you provide refunds?', a: 'See our refund policy page for details.' },
  { q: 'Can you host my site?', a: 'We provide consultancy and migration support; hosting depends on your provider.' }
]

export default function FAQ(){
  return (
    <div>
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
