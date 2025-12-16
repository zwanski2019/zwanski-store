import React from 'react'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'

const SERVICES = [
  {
    id: 's1',
    title: 'Web Development',
    desc: 'Modern responsive websites built with React and Vite. We focus on performance, accessibility, and maintainability.',
    features: ['Starter: 5-page site, contact form, deployment', 'Pro: Product pages, cart, analytics, performance tuning', 'Enterprise: Custom integrations and SLAs'],
    icon: '🌐'
  },
  {
    id: 's2',
    title: 'SEO & Content Strategy',
    desc: 'Technical SEO audits and ongoing content strategies to help your site rank and convert.',
    features: ['Technical fixes, Core Web Vitals improvements', 'Keyword research and content guidance', 'Monthly reporting and A/B testing suggestions'],
    icon: '📈'
  },
  {
    id: 's3',
    title: 'Cybersecurity',
    desc: 'Security assessments, configuration reviews, and prioritized remediation steps to harden your systems.',
    features: ['External scans and penetration-lite reviews', 'Configuration & dependency hardening', 'Actionable remediation roadmap'],
    icon: '🔒'
  },
  {
    id: 's4',
    title: 'IT Support',
    desc: 'Managed remote IT support for small teams including troubleshooting, patch guidance, and priority response.',
    features: ['24/7 monitoring and incident response', 'Patch management and updates', 'Priority support with SLAs'],
    icon: '💻'
  },
  {
    id: 's5',
    title: 'Performance Optimization',
    desc: 'We identify performance bottlenecks and implement caching, image optimization, and bundle-splitting techniques.',
    features: ['Lighthouse audits and Core Web Vitals', 'Caching strategies and CDN setup', 'Bundle optimization and code splitting'],
    icon: '⚡'
  },
  {
    id: 's6',
    title: 'Training & Workshops',
    desc: 'Hands-on workshops and training sessions for teams on React, web performance, and security practices.',
    features: ['React fundamentals and best practices', 'Web performance optimization', 'Security awareness and hardening'],
    icon: '🎓'
  }
]

export default function Services(){
  return (
    <div className='text-[#0F172A]'>
      <SEO title="Services" description="Zwanski Tech services: Web Development, SEO, Cybersecurity, IT Support, and Performance Optimization." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/services'} />
      
      <header className='mb-8'>
        <h1 className='text-4xl font-extrabold text-[#0F172A] mb-3'>Our Services</h1>
        <p className='text-[#0F172A] opacity-70 max-w-3xl'>
          Professional solutions for web development, security, performance, and IT support. Tailored packages for startups to enterprise.
        </p>
      </header>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {SERVICES.map((service) => (
          <div key={service.id} className='card-neo rounded-xl p-6 border-[#e2e8f0] hover:border-[#ff6b35] transition hover:-translate-y-1'>
            <div className='flex items-start gap-4 mb-4'>
              <div className='text-4xl'>{service.icon}</div>
              <div className='flex-1'>
                <h3 className='font-semibold text-xl text-[#0F172A] mb-2'>{service.title}</h3>
                <p className='text-[#0F172A] opacity-80 text-sm'>{service.desc}</p>
              </div>
            </div>
            <ul className='space-y-2 mb-4'>
              {service.features.map((feature, idx) => (
                <li key={idx} className='text-sm text-[#0F172A] flex items-start gap-2'>
                  <span className='text-[#ff6b35] mt-1'>•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              to='/contact'
              className='inline-flex items-center text-[#ff6b35] hover:text-[#ff5722] font-semibold text-sm transition'
            >
              Get started →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
