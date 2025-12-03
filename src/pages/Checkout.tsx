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


  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Checkout</h1>
      <p className='mb-4'>Total: <strong>${cart.total().toFixed(2)}</strong></p>
      {cart.items.length === 0 ? (
        <div className='text-gray-600'>Your cart is empty. Add items in the <a className='text-indigo-600' href='/shop'>shop</a>.</div>
      ) : (
        <div className='space-y-4'>
          <div>
            <h2 className='font-semibold mb-2'>Pay with PayPal (Sandbox)</h2>
            <p className='text-sm text-gray-600 mb-2'>This checkout uses PayPal client-side buttons only. For testing, the demo uses PayPal sandbox. Replace the client id in `src/pages/Checkout.tsx` with your own PayPal client id when ready.</p>
            <div id='paypal-button-container'></div>
          </div>
        </div>
      )}
    </div>
  )
}