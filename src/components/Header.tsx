import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/services', label: 'Services' },
  { to: '/films', label: 'Films' },
  { to: '/blog', label: 'Insights' },
  { to: '/academy', label: 'Academy' },
  { to: '/faq', label: 'FAQ' },
]

const demoLinks = [
  { to: '/cybersecurity-demo', label: 'Cybersecurity Demo' },
  { to: '/permission-demo', label: 'Permission Trap Demo' },
]

const legalLinks = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms' },
  { to: '/refund-policy', label: 'Refund Policy' },
  { to: '/cookies-policy', label: 'Cookies Policy' },
  { to: '/shipping-policy', label: 'Shipping Policy' },
  { to: '/legal/acceptable-use', label: 'Acceptable Use' },
  { to: '/legal/data-protection', label: 'Data Protection' },
]

export default function Header(){
  const cart = useCart()
  const count = cart.items.reduce((s,i)=> s + i.quantity, 0)
  const [open, setOpen] = useState(false)
  const [legalOpen, setLegalOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className='sticky top-0 z-30 bg-[#0F172A] backdrop-blur-md border-b border-[#1E293B] shadow-lg'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-3'>
          <img src={`${(import.meta as any).env?.BASE_URL || '/'}logo.svg`.replace(/\/\//g,'/')} alt='logo' className='h-10 w-10 rounded-full border-2 border-[#ff6b35] shadow-lg' />
          <div>
            <div className='text-lg font-bold text-white tracking-tight'>Zwanski Tech</div>
            <div className='text-xs text-[#94a3b8] uppercase tracking-[0.2em]'>Security • Cloud • Media</div>
          </div>
        </Link>

        <nav className='hidden md:flex items-center gap-2 text-sm'>
          {links.map(link => {
            const isActive = link.to === '/' ? pathname === '/' || pathname === '' : pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? 'bg-[#ff6b35] text-white font-semibold shadow-lg'
                    : 'text-[#cbd5e1] hover:bg-[#1E293B] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link to='/about' className={`px-3 py-2 rounded-lg transition ${
            pathname === '/about'
              ? 'bg-[#ff6b35] text-white font-semibold shadow-lg'
              : 'text-[#cbd5e1] hover:text-white hover:bg-[#1E293B]'
          }`}>About</Link>
          <Link to='/contact' className={`px-3 py-2 rounded-lg transition ${
            pathname === '/contact'
              ? 'bg-[#ff6b35] text-white font-semibold shadow-lg'
              : 'text-[#cbd5e1] hover:text-white hover:bg-[#1E293B]'
          }`}>Contact</Link>
          
          {/* Security Demos Dropdown */}
          <div className='relative group'>
            <button className={`px-3 py-2 rounded-lg transition ${
              demoLinks.some(link => pathname === link.to)
                ? 'bg-[#ff6b35] text-white font-semibold shadow-lg'
                : 'text-[#cbd5e1] hover:text-white hover:bg-[#1E293B]'
            }`}>
              Security Demos <span className='text-xs'>▼</span>
            </button>
            <div className='absolute left-0 mt-1 w-56 bg-[#1E293B] border border-[#334155] rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
              {demoLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-2 text-sm transition ${
                    pathname === link.to
                      ? 'bg-[#ff6b35] text-white font-semibold'
                      : 'text-[#cbd5e1] hover:bg-[#334155] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Legal Dropdown */}
          <div className='relative' onMouseEnter={() => setLegalOpen(true)} onMouseLeave={() => setLegalOpen(false)}>
            <button className={`px-3 py-2 rounded-lg transition ${
              legalLinks.some(link => pathname === link.to)
                ? 'bg-[#ff6b35] text-white font-semibold shadow-lg'
                : 'text-[#cbd5e1] hover:text-white hover:bg-[#1E293B]'
            }`}>
              Legal <span className='text-xs'>▼</span>
            </button>
            {legalOpen && (
              <div className='absolute top-full left-0 mt-1 w-48 bg-[#1E293B] border border-[#334155] rounded-lg shadow-xl z-50'>
                {legalLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-2 text-sm transition ${
                      pathname === link.to
                        ? 'bg-[#ff6b35] text-white font-semibold'
                        : 'text-[#cbd5e1] hover:bg-[#334155] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link
            to='/cart'
            className='pill bg-[#ff6b35] hover:bg-[#ff5722] text-white font-semibold flex items-center gap-2 shadow-lg transition'
          >
            Cart <span className='rounded-full bg-white/20 px-2 py-0.5 text-xs'>{count}</span>
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className='md:hidden text-white border border-[#1E293B] rounded-lg px-3 py-2 hover:bg-[#1E293B] transition bg-[#0F172A]'
        >
          Menu
        </button>
      </div>

      {open && (
        <div className='md:hidden px-4 pb-4 space-y-2 bg-[#0F172A] border-t border-[#1E293B]'>
          {links.map(link => {
            const isActive = link.to === '/' ? pathname === '/' || pathname === '' : pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-3 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-[#ff6b35] text-white font-semibold'
                    : 'hover:bg-[#1E293B] text-white'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
          <Link 
            to='/about' 
            className={`block px-3 py-2 rounded-lg transition ${
              pathname === '/about'
                ? 'bg-[#ff6b35] text-white font-semibold'
                : 'hover:bg-[#1E293B] text-white'
            }`} 
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link 
            to='/contact' 
            className={`block px-3 py-2 rounded-lg transition ${
              pathname === '/contact'
                ? 'bg-[#ff6b35] text-white font-semibold'
                : 'hover:bg-[#1E293B] text-white'
            }`} 
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          
          {/* Security Demos Section in Mobile */}
          <div className='pt-2 border-t border-[#1E293B]'>
            <div className='px-3 py-2 text-xs text-[#94a3b8] uppercase tracking-wider font-semibold'>Security Demos</div>
            {demoLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-3 py-2 rounded-lg transition text-sm ${
                  pathname === link.to
                    ? 'bg-[#ff6b35] text-white font-semibold'
                    : 'hover:bg-[#1E293B] text-white'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Legal Section in Mobile */}
          <div className='pt-2 border-t border-[#1E293B]'>
            <div className='px-3 py-2 text-xs text-[#94a3b8] uppercase tracking-wider font-semibold'>Legal</div>
            {legalLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-3 py-2 rounded-lg transition text-sm ${
                  pathname === link.to
                    ? 'bg-[#ff6b35] text-white font-semibold'
                    : 'hover:bg-[#1E293B] text-white'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <Link 
            to='/cart' 
            className='block px-3 py-2 rounded-lg bg-[#ff6b35] text-white font-semibold mt-2' 
            onClick={() => setOpen(false)}
          >
            Cart ({count})
          </Link>
        </div>
      )}
    </header>
  )
}