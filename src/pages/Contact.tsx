import React, {useState} from 'react'
import SEO from '../components/SEO'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e:React.FormEvent)=>{
    e.preventDefault()
    // Client-side only: store message locally (demo) and show confirmation
    try{
      const existing = JSON.parse(localStorage.getItem('zwanski_messages_v1') || '[]')
      existing.push({ name, email, message, date: new Date().toISOString() })
      localStorage.setItem('zwanski_messages_v1', JSON.stringify(existing))
      setSent(true)
      setName(''); setEmail(''); setMessage('')
    }catch(e){
      alert('Unable to save message locally in this browser.')
    }
  }

  return (
    <div>
      <SEO title="Contact" description="Contact Zwanski Tech — get in touch for web development, SEO, cybersecurity and IT support." image={'/logo.svg'} url={'https://zwanski01.github.io/zwanski-store/contact'} />
      <h1 className='text-2xl font-bold mb-4'>Contact</h1>
      <div className='grid md:grid-cols-2 gap-6'>
        <div>
          <p className='mb-2'>Email: <a href='mailto:contact@zwanski.org' className='text-indigo-600'>contact@zwanski.org</a></p>
          <p>Phone: Not available</p>
          <div className='mt-6 border rounded p-4'>
            <div className='mb-2 font-semibold'>Office</div>
            <div className='text-sm text-gray-600'>Remote-first — we work with clients worldwide.</div>
            <div className='mt-4 bg-gray-100 h-48 flex items-center justify-center text-gray-500'>Map placeholder</div>
          </div>
        </div>
        <div>
          {sent ? (
            <div className='p-6 bg-green-50 border rounded'>
              <div className='font-semibold'>Thanks — your message was received.</div>
              <div className='text-sm text-gray-600 mt-2'>We will reply to {email || 'your email'} shortly.</div>
            </div>
          ) : (
            <form onSubmit={submit} className='space-y-3'>
              <div>
                <label className='block text-sm'>Name</label>
                <input className='w-full border rounded px-3 py-2' value={name} onChange={e=>setName(e.target.value)} required />
              </div>
              <div>
                <label className='block text-sm'>Email</label>
                <input type='email' className='w-full border rounded px-3 py-2' value={email} onChange={e=>setEmail(e.target.value)} required />
              </div>
              <div>
                <label className='block text-sm'>Message</label>
                <textarea className='w-full border rounded px-3 py-2' value={message} onChange={e=>setMessage(e.target.value)} rows={6} required />
              </div>
              <div>
                <button className='bg-indigo-600 text-white px-4 py-2 rounded'>Send Message</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}