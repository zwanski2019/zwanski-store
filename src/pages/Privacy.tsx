import React from 'react'
import SEO from '../components/SEO'
export default function Privacy(){
  return (
    <div>
      <SEO title="Privacy Policy" description="Zwanski Tech privacy policy — describes how the demo stores data locally and uses third-party SDKs like PayPal." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/privacy'} />
      <h1 className='text-3xl font-bold mb-4'>Privacy Policy</h1>
      <p className='text-gray-700'>Effective date: December 3, 2025</p>

      <section className='mt-4'>
        <h2 className='font-semibold'>Overview</h2>
        <p className='text-gray-700 mt-2'>Zwanski Tech operates this website and respects your privacy. This site is a demonstration static storefront and stores limited data in your browser LocalStorage (for example cart contents and demo contact messages). We do not collect personal information server-side in this demo application.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Data stored in this demo</h3>
        <ul className='list-disc ml-6 text-gray-700 mt-2'>
          <li>Cart contents (LocalStorage) to persist shopping state between visits.</li>
          <li>Optional demo contact messages stored locally in your browser.</li>
        </ul>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Third-party services</h3>
        <p className='text-gray-700 mt-2'>The demo includes the PayPal client SDK for browser-based checkout. When using real services, review their privacy policies. This static demo does not send data to third-party servers by default.</p>
      </section>

      <h3 className='font-semibold mt-6'>GDPR & Data Subject Rights</h3>
        <p className='text-gray-700 mt-2'>If you are located in the EU, you have certain rights under the GDPR. This includes the right to access, rectify, erase, restrict processing, and port your personal data. Because this demo stores data only in your browser by default, rights are exercised by clearing local data or contacting the site owner for exported copies where applicable.</p>

        <h3 className='font-semibold mt-4'>CCPA / CPRA</h3>
        <p className='text-gray-700 mt-2'>California residents have rights under the CCPA/CPRA including the right to know personal information collected, delete personal information, and opt-out of sale of personal information. This demo does not sell personal information.</p>

        <p className='text-sm text-gray-600 mt-6'>This privacy statement is for demonstration only. For production use, create a privacy policy appropriate to your legal obligations and operational model.</p>
    </div>
  )
}