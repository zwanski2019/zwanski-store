import React from 'react'
import SEO from '../components/SEO'
export default function Terms(){
  return (
    <div>
      <SEO title="Terms & Conditions" description="Terms and conditions for using the Zwanski Tech demo storefront." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/terms'} />
      <h1 className='text-3xl font-bold mb-4'>Terms & Conditions</h1>
      <p className='text-gray-700'>These Terms and Conditions govern your use of Zwanski Tech's website and services. By using the site you agree to be bound by these terms. For commercial engagements, a separate services agreement will apply.</p>

      <section className='mt-4'>
        <h3 className='font-semibold'>Scope</h3>
        <p className='text-gray-700 mt-2'>These terms apply to the use of the website, any digital products purchased through the storefront, and information provided on this site. They do not substitute a contract for bespoke professional services.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Ordering & Payment</h3>
        <p className='text-gray-700 mt-2'>Orders completed through the demo require integration with a payment processor for actual payment capture. Prices are quoted in USD. For production commerce, Zwanski Tech will provide order confirmations, invoices and agreed payment terms.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Intellectual Property</h3>
        <p className='text-gray-700 mt-2'>All site content, logos and materials are the property of Zwanski Tech or its licensors. Use of materials requires prior written permission. Open-source components used in our projects are governed by their respective licenses.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Limitation of Liability</h3>
        <p className='text-gray-700 mt-2'>Except where prohibited by law, Zwanski Tech's liability for any claim arising out of or in connection with these terms is limited to the total fees paid for the services giving rise to the claim. The site and content are provided "as-is" for demonstration purposes.</p>
      </section>

      <p className='text-sm text-gray-600 mt-6'>This is a template and should be reviewed by legal counsel for production usage.</p>
    </div>
  )
}