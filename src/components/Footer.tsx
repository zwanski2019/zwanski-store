import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className='bg-gray-100 text-gray-700 mt-8'>
      <div className='container mx-auto p-6 text-center'>
        <p>© 2025 Zwanski Tech – All rights reserved</p>
        <p>Contact: contact@zwanski.org</p>
        <div className='mt-2 space-x-4'>
          <Link to='/privacy' className='hover:underline'>Privacy Policy</Link>
          <span>|</span>
          <Link to='/terms' className='hover:underline'>Terms</Link>
          <span>|</span>
          <Link to='/cookies-policy' className='hover:underline'>Cookies</Link>
          <span>|</span>
          <Link to='/refund-policy' className='hover:underline'>Refunds</Link>
        </div>
      </div>
    </footer>
  )
}