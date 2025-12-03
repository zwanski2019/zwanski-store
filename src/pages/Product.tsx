import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import SEO from '../components/SEO'

type Product = { id:string; title:string; price:number; description:string; image?:string }

export default function ProductPage(){
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const cart = useCart()

  useEffect(()=>{
    if(!id) return
    const base = (import.meta as any).env?.BASE_URL || '/'
    fetch(base + 'products.json').then(r=>r.json()).then((list:Product[])=>{
      const p = list.find(x=> x.id === id)
      setProduct(p || null)
    }).catch(()=>setProduct(null))
  },[id])

  if(!product) return <div>Product not found. <Link to='/shop' className='text-zwanski-blue'>Back to shop</Link></div>

  const add = ()=>{
    cart.add({ id: product.id, title: product.title, price: Number(product.price) }, 1)
    alert('Added to cart')
  }

  const base = (import.meta as any).env?.BASE_URL || '/'
  const seoImage = product.image ? (base + product.image.replace(/^\//, '')) : (base + 'logo.svg')

  return (
    <div>
      <SEO title={product.title} description={product.description} image={seoImage} url={typeof window !== 'undefined' ? `${window.location.origin}/product/${product.id}` : '/product/' + product.id} />
      <div className='grid md:grid-cols-2 gap-6'>
        <div>
          <img src={product.image ? (base + product.image.replace(/^\//, '')) : (base + 'placeholder.png')} alt={product.title} className='w-full h-80 object-contain rounded' />
        </div>
        <div>
          <h1 className='text-3xl font-bold'>{product.title}</h1>
          <p className='mt-4 text-gray-700'>{product.description}</p>
          <p className='mt-4 text-2xl font-semibold'>${product.price.toFixed(2)}</p>
          <div className='mt-6'>
            <button onClick={add} className='bg-zwanski-blue text-white px-4 py-2 rounded'>Add to cart</button>
            <Link to='/checkout' className='ml-4 text-sm text-zwanski-blue'>Go to checkout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
