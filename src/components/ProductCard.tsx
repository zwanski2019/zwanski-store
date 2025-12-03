import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({product}:{product:any}){
  const cart = useCart()
  const handleAdd = ()=> {
    cart.add({ id: product.id, title: product.title, price: Number(product.price) }, 1)
    alert(product.title + " added to cart")
  }
  return (
    <div className='border rounded p-4 flex flex-col'>
      <a href={`/product/${product.id}`} className='block mb-4'>
        <img src={product.image || '/placeholder.png'} alt={product.title} className='h-40 object-contain w-full' />
      </a>
      <h3 className='font-semibold'><a href={`/product/${product.id}`} className='hover:underline'>{product.title}</a></h3>
      <p className='mt-2 flex-grow'>{product.description}</p>
      <div className='mt-4 flex items-center justify-between'>
        <span className='font-bold'>${product.price.toFixed(2)}</span>
        <button onClick={handleAdd} className='bg-indigo-600 text-white px-3 py-1 rounded'>Add</button>
      </div>
    </div>
  )
}