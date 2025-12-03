import React, {useEffect, useState} from 'react'
import ProductCard from '../components/ProductCard'

type Product = {
  id:string; title:string; price:number; description:string; image?:string;
}

export default function Shop(){
  const [products, setProducts] = useState<Product[]>([])
  useEffect(()=>{
    fetch('/products.json').then(r=>r.json()).then(setProducts).catch(()=>setProducts([]))
  },[])
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Shop</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {products.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}