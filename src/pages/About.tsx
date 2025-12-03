import React from 'react'
import SEO from '../components/SEO'

export default function About(){
  return (
    <div>
      <SEO title="About" description="About Zwanski Tech — mission, team, and approach to performance-first web development, security, and SEO." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/about'} />
      <h1 className='text-3xl font-bold mb-4'>About Zwanski Tech</h1>
      <p className='text-gray-700 mb-4'>Zwanski Tech was founded with a single mission: help businesses and creators build fast, secure, and high-converting digital experiences using modern, open web technologies. We combine engineering rigor with practical business sense to deliver results that matter.</p>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold'>Mission & Values</h2>
        <p className='text-gray-700 mt-2'>Our mission is to empower small businesses, startups, and freelancers with reliable, performance-focused web products and services. We value professionalism, innovation, and reliability.</p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold'>Team</h2>
        <p className='text-gray-700 mt-2'>We are a small team of engineers, designers, and security specialists. Our processes emphasize clear deliverables, transparent pricing, and measurable outcomes.</p>
      </section>

      <section>
        <h2 className='text-2xl font-semibold'>Approach</h2>
        <ul className='list-disc ml-6 text-gray-700 mt-2'>
          <li>Performance-first development and accessibility</li>
          <li>Security best-practices and audits</li>
          <li>SEO & content strategies aligned with growth goals</li>
          <li>Practical, maintainable code and straightforward handover documentation</li>
        </ul>
      </section>
    </div>
  )
}