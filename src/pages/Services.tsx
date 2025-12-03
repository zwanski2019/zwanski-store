import React from 'react'

const SERVICES = [
  { id: 's1', title: 'Web Development', desc: 'Modern responsive websites with React and performance-first architecture.' },
  { id: 's2', title: 'SEO & Content Strategy', desc: 'Technical SEO audits and content plans to increase organic traffic.' },
  { id: 's3', title: 'Cybersecurity', desc: 'Security assessments, hardening, and incident readiness.' },
  { id: 's4', title: 'IT Support', desc: 'Remote & On-site IT support and managed services.' },
  { id: 's5', title: 'Performance Optimization', desc: 'Speed, caching, and UX improvements for faster sites.' }
]

export default function Services(){
  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Services</h1>
      <div className='space-y-6'>
        <div className='p-6 border rounded-lg shadow-sm'>
          <h3 className='font-semibold text-xl'>Web Development</h3>
          <p className='mt-2 text-gray-700'>Modern, responsive websites built with React and Vite. We focus on performance, accessibility, and maintainability. Packages range from starter brochure sites to e-commerce-ready builds.</p>
          <ul className='list-disc ml-6 mt-2 text-gray-700'>
            <li>Starter: 5-page site, contact form, deployment.</li>
            <li>Pro: Product pages, cart, analytics, performance tuning.</li>
            <li>Enterprise: Custom integrations and SLAs.</li>
          </ul>
        </div>

        <div className='p-6 border rounded-lg shadow-sm'>
          <h3 className='font-semibold text-xl'>SEO & Content Strategy</h3>
          <p className='mt-2 text-gray-700'>Technical SEO audits and ongoing content strategies to help your site rank and convert.</p>
          <ul className='list-disc ml-6 mt-2 text-gray-700'>
            <li>Technical fixes, Core Web Vitals improvements.</li>
            <li>Keyword research and content guidance.</li>
            <li>Monthly reporting and A/B testing suggestions.</li>
          </ul>
        </div>

        <div className='p-6 border rounded-lg shadow-sm'>
          <h3 className='font-semibold text-xl'>Cybersecurity</h3>
          <p className='mt-2 text-gray-700'>Security assessments, configuration reviews, and prioritized remediation steps to harden your systems.</p>
          <ul className='list-disc ml-6 mt-2 text-gray-700'>
            <li>External scans and penetration-lite reviews.</li>
            <li>Configuration & dependency hardening.</li>
            <li>Actionable remediation roadmap.</li>
          </ul>
        </div>

        <div className='p-6 border rounded-lg shadow-sm'>
          <h3 className='font-semibold text-xl'>IT Support</h3>
          <p className='mt-2 text-gray-700'>Managed remote IT support for small teams including troubleshooting, patch guidance, and priority response.</p>
        </div>

        <div className='p-6 border rounded-lg shadow-sm'>
          <h3 className='font-semibold text-xl'>Performance Optimization</h3>
          <p className='mt-2 text-gray-700'>We identify performance bottlenecks and implement caching, image optimization, and bundle-splitting techniques to speed up your site.</p>
        </div>

        <div className='p-6 border rounded-lg shadow-sm'>
          <h3 className='font-semibold text-xl'>Training & Workshops</h3>
          <p className='mt-2 text-gray-700'>Hands-on workshops and training sessions for teams on topics like React fundamentals, web performance, and basic security practices.</p>
        </div>
      </div>
    </div>
  )
}
