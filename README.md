# zwanski-store

Static storefront built with Vite + React + TypeScript + Tailwind — ready for GitHub Pages.

## What you get
- Home, Shop, About, Contact, Academy pages
- Cart & Checkout demo pages
- Privacy/Terms placeholders
- `public/products.json` sample
- `public/merchant-feed.xml` sample for Google Merchant

## How to use
1. Install:
   ```bash
   npm install
   ```
2. Run dev:
   ```bash
   npm run dev
   ```
3. Build:
   ```bash
   npm run build
   ```
4. Deploy to GitHub Pages:
   - Create a repo named `zwanski-store`
   - Add remote, push main
   - Run `npm run deploy` (this uses `gh-pages` to publish `dist/`)

PWA & Offline
- The project includes a minimal `manifest.webmanifest` and `sw.js` in `public/` for a basic offline cache. Service worker registers automatically in production builds.

PayPal (client-side only)
- Checkout uses the PayPal client SDK in `src/pages/Checkout.tsx`. For testing the sandbox, use the default `sb` client id. Replace `sb` with your PayPal `client-id` for real usage.

GitHub Actions
- A workflow `.github/workflows/generate-merchant-feed.yml` runs `node scripts/generate-merchant-feed.js` on every push to `main` and commits the updated `public/merchant-feed.xml`.

Notes
- This project is intentionally fully static and can be hosted on GitHub Pages without server components. Stripe integration in this repository is an example that requires serverless functions and secret keys; use PayPal client-only flow if you want purely static checkout.

## Payments
- This repository **does not** include a secure server-side Stripe integration (server is required).
- Recommended options:
  - Use PayPal client buttons (client-only).
  - Or deploy a small serverless function (Vercel/Netlify) that creates Stripe Checkout Sessions. See Stripe docs.

## Legal pages
- Privacy / Terms are templates. **Do not publish without legal review** for your country.

## Customize
- Replace logo and contact info in `src/components/Header.tsx` and `src/pages/Contact.tsx`.
- Edit `public/products.json` with your real products.



## Serverless Stripe example (Vercel / Netlify)

This repo includes example serverless functions for creating a Stripe Checkout Session:

- `vercel/api/create-checkout-session.js` (Vercel)
- `netlify/functions/create-checkout-session.js` (Netlify)

You MUST set environment variables in your hosting platform:

- `STRIPE_SECRET_KEY` — your Stripe secret key
- `SUCCESS_URL` — where to redirect after success
- `CANCEL_URL` — where to redirect after cancel

On Vercel, deploy the project and the endpoint will be available at `/api/create-checkout-session`.
On Netlify, deploy functions and call `/.netlify/functions/create-checkout-session` (adjust the Checkout client code accordingly).

For testing Stripe locally, use `stripe` CLI or deploy the serverless function to Vercel/Netlify with the env var set.

## PayPal Sandbox

For PayPal sandbox testing replace `sb` in `Checkout.tsx` with your sandbox client id, or create a sandbox app in your PayPal developer dashboard and use the client-id provided.

## Generating Google Merchant Feed

Run:

```bash
npm run generate-feed
```

This reads `public/products.json` and writes `public/merchant-feed.xml` (change `your-domain.com` to your real URL in the script).

