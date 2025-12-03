import React from 'react'

export default function ShippingPolicy(){
  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Shipping Policy</h1>
      <p className='text-gray-700'>Most offerings on Zwanski Tech are digital services or downloadable licenses, and do not require physical shipping. For any physical goods (if offered), shipping costs and timelines will be disclosed at purchase.</p>

      <section className='mt-4'>
        <h3 className='font-semibold'>Digital Products</h3>
        <p className='text-gray-700 mt-2'>Digital products are delivered electronically; delivery details will be provided after purchase.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Physical Goods (if any)</h3>
        <p className='text-gray-700 mt-2'>If physical items become available, shipping regions, rates, and estimated delivery times will be shown during checkout.</p>
      </section>
    </div>
  )
}
