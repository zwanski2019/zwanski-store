/**
 * Netlify Function for creating Stripe Checkout Session
 * Save this file as: netlify/functions/create-checkout-session.js
 * Environment variable required: STRIPE_SECRET_KEY
 */
const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' })

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' }
  const body = JSON.parse(event.body || '{}')
  const items = body.items || []
  try {
    const line_items = items.map(i => ({
      price_data: {
        currency: 'usd',
        product_data: { name: i.title },
        unit_amount: Math.round(Number(i.price) * 100)
      },
      quantity: i.quantity || 1
    }))
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: process.env.SUCCESS_URL || 'https://your-domain.com/success',
      cancel_url: process.env.CANCEL_URL || 'https://your-domain.com/cancel'
    })
    return { statusCode: 200, body: JSON.stringify({ url: session.url }) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ error: 'server_error', details: String(err) }) }
  }
}
