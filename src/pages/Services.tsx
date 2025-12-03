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
      <div className='grid sm:grid-cols-2 gap-6'>
        {SERVICES.map(s=> (
          <div key={s.id} className='p-6 border rounded-lg shadow-sm'>
            <h3 className='font-semibold text-xl'>{s.title}</h3>
            <p className='mt-2 text-gray-700'>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
