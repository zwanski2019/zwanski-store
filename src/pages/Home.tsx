import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <section className='bg-gradient-to-r from-indigo-600 to-sky-500 text-white rounded-lg p-8 mb-8'>
        <h1 className='text-4xl font-bold'>Zwanski Tech — WebDev, SEO, Cybersecurity</h1>
        <p className='mt-2'>Modern solutions, open-source tools, and training for individuals and businesses.</p>
        <div className='mt-4'>
          <Link to='/shop' className='bg-white text-indigo-700 px-4 py-2 rounded shadow'>Shop Products</Link>
        </div>
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-4'>Featured Products</h2>
        <div id='featured' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='p-4 border rounded'>
            <h3 className='font-bold'>Tech Support — 1 Hour</h3>
            <p className='mt-2'>Remote troubleshooting and security review.</p>
            <Link to='/shop' className='text-indigo-600 hover:underline mt-2 inline-block'>View Shop</Link>
          </div>
        </div>
      </section>
    </div>
  )
}