import React from 'react'
export default function Terms(){
  return (
    <div>
      <SEO title="Terms & Conditions" description="Terms and conditions for using the Zwanski Tech demo storefront." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/terms'} />
      <h1 className='text-3xl font-bold mb-4'>Terms & Conditions</h1>
      <p className='text-gray-700'>These terms govern the use of the Zwanski Tech demo storefront. This site is a static demo intended to show a client-side store and does not represent a final production commerce agreement.</p>

      <section className='mt-4'>
        <h3 className='font-semibold'>Use of Site</h3>
        <p className='text-gray-700 mt-2'>You may browse and use the site for demonstration and evaluation purposes. Purchases made in this demo (if enabled) are client-side only and require integration with payment processors for production sales.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Limitation of Liability</h3>
        <p className='text-gray-700 mt-2'>The maintainers provide this demo "as-is" without warranties. Zwanski Tech is not liable for data loss, service interruption, or other damages arising from use of this demo site.</p>
      </section>

      <p className='text-sm text-gray-600 mt-6'>For real commercial usage, consult legal counsel and replace this template with legally reviewed terms.</p>
    </div>
  )
}