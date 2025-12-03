import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header(){
  const cart = useCart()
  const count = cart.items.reduce((s,i)=> s + i.quantity, 0)
  return (
    <header className='bg-gradient-to-r from-indigo-700 to-sky-500 text-white'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        <Link to='/' className='flex items-center gap-3'>
          <img src='/placeholder.png' alt='logo' className='h-8 w-8 rounded' />
          <span className='text-xl font-bold'>Zwanski Tech</span>
        </Link>
        <nav className='space-x-4'>
          <Link to='/shop' className='hover:underline'>Shop</Link>
          <Link to='/services' className='hover:underline'>Services</Link>
          <Link to='/academy' className='hover:underline'>Academy</Link>
          <Link to='/faq' className='hover:underline'>FAQ</Link>
          <Link to='/about' className='hover:underline'>About</Link>
          <Link to='/contact' className='hover:underline'>Contact</Link>
          <Link to='/cart' className='hover:underline'>Cart ({count})</Link>
        </nav>
      </div>
    </header>
  )
}