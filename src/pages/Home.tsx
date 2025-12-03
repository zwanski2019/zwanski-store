import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

type Product = { id:string; title:string; price:number; description:string; image?:string }

export default function Home(){
  const [featured, setFeatured] = useState<Product[]>([])
  useEffect(()=>{
    fetch('/products.json').then(r=>r.json()).then((list:Product[])=> setFeatured(list.slice(0,3))).catch(()=>setFeatured([]))
  },[])

  return (
    <div>
      <SEO title="Home" description="Zwanski Tech — web development, SEO, cybersecurity and IT support for small businesses and startups." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/'} />
      <section className='bg-gradient-to-r from-indigo-600 to-sky-500 text-white rounded-lg p-8 mb-8'>
        <div className='container mx-auto'>
          <h1 className='text-4xl font-bold'>Zwanski Tech</h1>
          <p className='mt-3 max-w-2xl'>We help small businesses and startups build fast, secure, and search-optimized digital experiences. From modern websites to security audits and managed IT support — we bring reliability and performance together.</p>
          <div className='mt-6 flex gap-3'>
            <Link to='/services' className='bg-white text-indigo-700 px-4 py-2 rounded shadow'>Our Services</Link>
            <Link to='/shop' className='bg-transparent border border-white px-4 py-2 rounded'>Shop</Link>
          </div>
        </div>
      </section>

      <section className='container mx-auto mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>Featured Services & Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {featured.map(p=> (
            <div key={p.id} className='p-4 border rounded-lg hover:shadow-lg transition'>
              <Link to={`/product/${p.id}`}>
                <img src={p.image || '/placeholder.png'} alt={p.title} className='h-40 w-full object-contain mb-3' />
                <h3 className='font-semibold'>{p.title}</h3>
              </Link>
              <p className='text-sm text-gray-600 mt-2'>{p.description}</p>
              <div className='mt-4 flex items-center justify-between'>
                <div className='font-bold'>${p.price.toFixed(2)}</div>
                <Link to={`/product/${p.id}`} className='text-indigo-600'>View</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='container mx-auto'>
        <h2 className='text-2xl font-semibold mb-4'>Why Zwanski Tech</h2>
        <div className='grid sm:grid-cols-3 gap-6'>
          <div className='p-4'>
            <h4 className='font-semibold'>Performance First</h4>
            <p className='text-gray-600 mt-2'>We optimize front-end performance and user experience to increase conversions and engagement.</p>
          </div>
          <div className='p-4'>
            <h4 className='font-semibold'>Security & Reliability</h4>
            <p className='text-gray-600 mt-2'>Security audits and best practices keep your users and data safe.</p>
          </div>
          <div className='p-4'>
            <h4 className='font-semibold'>Transparent Pricing</h4>
            <p className='text-gray-600 mt-2'>Clear package pricing with options for growth and enterprise needs.</p>
          </div>
        </div>
      </section>
    </div>
  )
}