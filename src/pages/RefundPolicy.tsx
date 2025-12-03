import React from 'react'

export default function RefundPolicy(){
  return (
    <div>
      <SEO title="Refund Policy" description="Refund policy for Zwanski Tech digital services and products." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/refund-policy'} />
      <h1 className='text-3xl font-bold mb-4'>Refund Policy</h1>
      <p className='text-gray-700'>Effective date: December 3, 2025</p>

      <section className='mt-4'>
        <h3 className='font-semibold'>Digital Products & Services</h3>
        <p className='text-gray-700 mt-2'>Digital goods, services, and delivered work are generally non-refundable once delivered. If you believe you have a valid reason for a refund (e.g., duplicated charge or failure to deliver), contact support.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>How to Request a Refund</h3>
        <ol className='list-decimal ml-6 text-gray-700 mt-2'>
          <li>Contact <a href='mailto:contact@zwanski.org' className='text-zwanski-blue'>contact@zwanski.org</a> with your order details.</li>
          <li>We will acknowledge within 5 business days and review the request.</li>
          <li>If approved, refunds will be processed via the original payment method.</li>
        </ol>
      </section>

      <p className='text-sm text-gray-600 mt-6'>This policy is a template. For production commerce, adopt a refund policy that complies with local consumer protection laws.</p>
    </div>
  )
}
