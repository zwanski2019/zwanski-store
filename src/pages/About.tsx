import React from 'react'
import SEO from '../components/SEO'

export default function About(){
  return (
    <div>
      <SEO title="About" description={`Mohamed Zwanski Ibrahim — Founder & Chief Engineer at Zwanski Tech. Cybersecurity, cloud and performance-focused solutions for modern organisations.`} image={`${(import.meta as any).env?.BASE_URL || '/'}logo.svg`.replace(/\/\//g,'/')} url={'https://zwanski01.github.io/zwanski-store/about'} />

      <header className='mb-6'>
        <h1 className='text-3xl font-bold'>Mohamed “Zwanski” Ibrahim</h1>
        <p className='text-gray-700 mt-2 max-w-3xl'>Mohamed Ibrahim (known professionally as Zwanski) is an experienced security engineer, entrepreneur and technologist specializing in cloud security, threat intelligence and performance-driven web platforms. With more than a decade of hands-on experience across startups and enterprise teams, Mohamed blends engineering rigor with a product-driven mindset to deliver secure, resilient and high-performing digital experiences.</p>
      </header>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold'>Professional Background</h2>
        <p className='text-gray-700 mt-2'>Mohamed began his career as a full-stack developer before diving into infrastructure and security. He has led initiatives to modernize deployment pipelines, conducted large-scale security audits for SaaS platforms, and advised C-level stakeholders on risk reduction and secure architecture. His work spans secure application design, incident response, and automation of security operations.</p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold'>Expertise & Focus Areas</h2>
        <ul className='list-disc ml-6 text-gray-700 mt-2'>
          <li>Cloud security and secure migration strategies</li>
          <li>Threat intelligence and detection engineering</li>
          <li>Secure software development lifecycle (SSDLC)</li>
          <li>Performance engineering and Core Web Vitals</li>
          <li>Device diagnostics and secure provisioning workflows</li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold'>Mission, Values & Philosophy</h2>
        <p className='text-gray-700 mt-2'>Zwanski Tech exists to make robust security and high-performance software accessible to organisations of all sizes. We believe in transparent pricing, reproducible outcomes, and engineering that supports business goals. Our philosophy is pragmatic: secure and performant first, then delight with features that matter.</p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold'>Global Impact & Clients</h2>
        <p className='text-gray-700 mt-2'>Zwanski has worked with international clients across finance, healthcare, and SaaS — helping teams reduce attack surface, improve uptime, and scale secure systems. Our engagements range from security advisories and audits through to full migration and managed services.</p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold'>Timeline & Milestones</h2>
        <ol className='list-decimal ml-6 text-gray-700 mt-2'>
          <li><strong>2015</strong> — Started as a freelance web developer and began focusing on application security.</li>
          <li><strong>2017</strong> — Led security improvements and incident response for a mid-size SaaS company.</li>
          <li><strong>2019</strong> — Launched consulting services focusing on cloud migration and threat intel.</li>
          <li><strong>2022</strong> — Built first large-scale automated security audit tooling and internal detection playbooks.</li>
          <li><strong>2024</strong> — Founded Zwanski Tech to provide integrated security and performance services for SMBs and enterprises.</li>
        </ol>
      </section>

      <section>
        <h2 className='text-2xl font-semibold'>Contact & Speaking</h2>
        <p className='text-gray-700 mt-2'>Mohamed is available for consulting, speaking and workshops. Reach out via the contact page for engagements, training and enterprise workshops.</p>
      </section>
    </div>
  )
}