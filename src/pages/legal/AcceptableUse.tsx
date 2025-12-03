import React from 'react'
import SEO from '../../components/SEO'

export default function AcceptableUse(){
  return (
    <div>
      <SEO title="Acceptable Use Policy" description="Acceptable use of Zwanski Tech services and resources. Prohibited actions and enforcement." image={`${(import.meta as any).env?.BASE_URL || '/'}logo.svg`.replace(/\/\//g,'/')} url={'https://zwanski01.github.io/zwanski-store/legal/acceptable-use'} />
      <h1 className='text-3xl font-bold mb-4'>Acceptable Use Policy</h1>

      <section className='mt-4'>
        <h3 className='font-semibold'>Overview</h3>
        <p className='text-gray-700 mt-2'>This Acceptable Use Policy (AUP) sets out prohibited activities when using Zwanski Tech services. It supplements our terms and is designed to protect users and infrastructure.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Prohibited Uses</h3>
        <ul className='list-disc ml-6 text-gray-700 mt-2'>
          <li>Unauthorized access or scanning of third-party networks</li>
          <li>Distribution of malware, phishing or social engineering campaigns</li>
          <li>Use of services for harassment, hate or other illegal activities</li>
          <li>Bypassing security controls, rate limits or fair usage policies</li>
        </ul>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Enforcement</h3>
        <p className='text-gray-700 mt-2'>Violations of this policy may result in service suspension, termination and reporting to relevant authorities if required.</p>
      </section>
    </div>
  )
}
