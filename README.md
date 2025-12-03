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
- This repository is intentionally static and client-side only. The supported, free option for payments in this demo is PayPal client-side buttons (no server required).
- The repo contains optional example serverless code for Stripe in `vercel/` and `netlify/` for reference only—do not use those files unless you deploy serverless endpoints and configure secret keys. For a free GitHub Pages deployment you do not need any server components.

## Legal pages
- Privacy / Terms are templates. **Do not publish without legal review** for your country.

## Customize



## Serverless Stripe example (optional)

## CI / Automatic deploy
- A GitHub Actions workflow `/.github/workflows/deploy-pages.yml` will build and deploy the site to GitHub Pages automatically when you push to `main`. The workflow uses the built-in `GITHUB_TOKEN` so no extra secrets are required for publishing to Pages.

The repository includes optional example serverless functions for Stripe in `vercel/` and `netlify/` as a reference. These are not required for the static GitHub Pages deployment and will not function unless you deploy them and configure secret keys.

If you decide to use Stripe in production, follow Stripe's official docs and secure any secret keys in your hosting provider's environment variables.

## PayPal Sandbox

For PayPal sandbox testing replace `sb` in `Checkout.tsx` with your sandbox client id, or create a sandbox app in your PayPal developer dashboard and use the client-id provided.

## Generating Google Merchant Feed

Run:

```bash
npm run generate-feed
```

This reads `public/products.json` and writes `public/merchant-feed.xml` (change `your-domain.com` to your real URL in the script).

