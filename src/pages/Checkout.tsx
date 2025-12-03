import React, { useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function Checkout(){
  const cart = useCart()

  useEffect(()=>{
    // load PayPal SDK (sandbox) - replace client-id with your sandbox id in README before production
    const id = 'sb' // 'sb' uses sandbox default for PayPal demo; replace with real client-id to accept payments
    const s = document.createElement('script')
    s.src = `https://www.paypal.com/sdk/js?client-id=${id}&currency=USD`
    s.async = true
    document.body.appendChild(s)
    s.onload = () => {
      // @ts-ignore
      if(window.paypal){
        // @ts-ignore
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: cart.total().toFixed(2) } }]
            })
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              alert('Payment completed by ' + details.payer.name.given_name)
              cart.clear()
            })
          }
        }).render('#paypal-button-container')
      }
    }
    return () => {}
  }, [])

  const startStripe = async ()=>{
    // call serverless endpoint to create Stripe Checkout Session
    try {
      const resp = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({items: cart.items})
      })
      const data = await resp.json()
      if(data.url){
        window.location.href = data.url
      } else {
        alert('Stripe session creation failed: ' + JSON.stringify(data))
      }
    } catch(e){
      alert('Error contacting Stripe endpoint. Make sure you deploy functions and set STRIPE_SECRET_KEY.')
    }
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Checkout</h1>
      <p className='mb-4'>Total: <strong>${cart.total().toFixed(2)}</strong></p>
      <div className='space-y-4'>
        <div>
          <h2 className='font-semibold mb-2'>Pay with PayPal (Sandbox)</h2>
          <div id='paypal-button-container'></div>
        </div>
        <div>
          <h2 className='font-semibold mb-2'>Or pay with Stripe</h2>
          <p>Stripe Checkout will open in a new tab/window. (Serverless example included for Vercel/Netlify)</p>
          <button onClick={startStripe} className='bg-blue-600 text-white px-4 py-2 rounded'>Pay with Stripe</button>
        </div>
      </div>
    </div>
  )
}