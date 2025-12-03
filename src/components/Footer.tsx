import React from 'react'
export default function Footer(){
  return (
    <footer className='bg-gray-100 text-gray-700 mt-8'>
      <div className='container mx-auto p-6 text-center'>
        <p>© 2025 Zwanski Tech – All rights reserved</p>
        <p>Contact: contact@zwanski.org</p>
        <div className='mt-2 space-x-4'>
          <a href='/privacy'>Privacy</a>
          <a href='/terms'>Terms</a>
        </div>
      </div>
    </footer>
  )
}