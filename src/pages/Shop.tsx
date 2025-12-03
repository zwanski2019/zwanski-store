import React, {useEffect, useState} from 'react'
import ProductCard from '../components/ProductCard'
import SEO from '../components/SEO'

type Product = { id:string; title:string; price:number; description:string; image?:string; category?:string }

export default function Shop(){
  const [products, setProducts] = useState<Product[]>([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(()=>{
    fetch('/products.json').then(r=>r.json()).then(setProducts).catch(()=>setProducts([]))
  },[])

  const categories = Array.from(new Set(['all', ...products.map(p=> p.category || 'other')]))
  const shown = products.filter(p=> (category==='all' || (p.category||'other') === category) && (q === '' || (p.title + ' ' + p.description).toLowerCase().includes(q.toLowerCase())))

  return (
    <div>
      <SEO title="Shop" description="Browse Zwanski Tech services and digital products — web development, SEO, security audits, IT support, and tools." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/shop'} />
      <h1 className='text-2xl font-bold mb-4'>Shop</h1>

      <div className='mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
        <div className='flex gap-2'>
          <select value={category} onChange={e=>setCategory(e.target.value)} className='border rounded px-3 py-2'>
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Search products' className='border rounded px-3 py-2' />
        </div>
        <div className='text-sm text-gray-600'>Showing {shown.length} products</div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {shown.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}