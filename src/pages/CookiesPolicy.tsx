import React from 'react'

export default function CookiesPolicy(){
  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Cookies Policy</h1>
      <p className='text-gray-700'>This demo uses browser LocalStorage to persist the shopping cart and demo messages. The site does not set tracking cookies by default.</p>

      <section className='mt-4'>
        <h3 className='font-semibold'>Essential Storage</h3>
        <p className='text-gray-700 mt-2'>LocalStorage entries used by this site include cart contents (`zwanski_cart_v1`) and demo messages (`zwanski_messages_v1`). These are stored only in the user's browser and are not transmitted to servers by the demo application.</p>
      </section>

      <p className='text-sm text-gray-600 mt-6'>For production, implement appropriate cookie consent and a cookie policy that reflects your analytics, ads, or third-party services.</p>
    </div>
  )
}
