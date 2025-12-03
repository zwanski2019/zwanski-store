import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart(){
  const cart = useCart()
  if(cart.items.length === 0) return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Cart</h1>
      <p>Your cart is empty. <Link to='/shop' className='text-indigo-600'>Shop now</Link></p>
    </div>
  )
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Cart</h1>
      <div className='space-y-4'>
        {cart.items.map(i=> (
          <div key={i.id} className='flex items-center justify-between border rounded p-4'>
            <div className='flex items-center gap-4'>
              <img src={`/images/${i.id}.svg`} alt={i.title} className='w-20 h-20 object-contain' onError={(e:any)=> e.target.src='/placeholder.png'} />
              <div>
                <div className='font-semibold'>{i.title}</div>
                <div className='text-sm text-gray-600'>${i.price.toFixed(2)} each</div>
              </div>
            </div>
            <div className='text-right'>
              <div className='flex items-center gap-2 justify-end'>
                <button onClick={()=>cart.update(i.id, i.quantity - 1)} className='px-2 py-1 border rounded'>−</button>
                <div className='px-3'>{i.quantity}</div>
                <button onClick={()=>cart.update(i.id, i.quantity + 1)} className='px-2 py-1 border rounded'>+</button>
              </div>
              <div className='font-bold mt-2'>${(i.price * i.quantity).toFixed(2)}</div>
              <button onClick={()=>cart.remove(i.id)} className='text-sm mt-2 text-red-600'>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-6 flex items-center justify-between'>
        <div className='text-xl font-bold'>Total: ${cart.total().toFixed(2)}</div>
        <div className='space-x-3'>
          <Link to='/checkout' className='bg-indigo-600 text-white px-4 py-2 rounded'>Go to Checkout</Link>
        </div>
      </div>
    </div>
  )
}