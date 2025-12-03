/**
 * Vercel Serverless Function (Node.js)
 * Endpoint: /api/create-checkout-session
 * Environment variable required: STRIPE_SECRET_KEY
 */
const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' })

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Method not allowed' })
  const { items } = req.body || { items: [] }
  try {
    const line_items = (items || []).map(i => ({
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
    res.json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server_error', details: String(err) })
  }
}
