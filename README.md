# zwanski-store

Static storefront built with Vite + React + TypeScript + Tailwind — deployed on Cloudflare Workers.

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
4. Deploy to Cloudflare:
   - Build the project: `npm run build`
   - Deploy to Cloudflare Pages or Workers (see Cloudflare setup below)

PWA & Offline
- The project includes a minimal `manifest.webmanifest` and `sw.js` in `public/` for a basic offline cache. Service worker registers automatically in production builds.

PayPal (client-side only)
- Checkout uses the PayPal client SDK in `src/pages/Checkout.tsx`. For testing the sandbox, use the default `sb` client id. Replace `sb` with your PayPal `client-id` for real usage.

GitHub Actions
- A workflow `.github/workflows/generate-merchant-feed.yml` runs `node scripts/generate-merchant-feed.js` on every push to `main` and commits the updated `public/merchant-feed.xml`.
- A workflow `.github/workflows/deploy-films.yml` deploys the Cloudflare Worker API automatically.

Notes
- This project is fully static and deployed on Cloudflare Workers/Pages. Stripe integration in this repository is an example that requires serverless functions and secret keys; use PayPal client-only flow if you want purely static checkout.

## Payments
- This repository is intentionally static and client-side only. The supported, free option for payments in this demo is PayPal client-side buttons (no server required).
- The repo contains optional example serverless code for Stripe in `vercel/` and `netlify/` for reference only—do not use those files unless you deploy serverless endpoints and configure secret keys. For Cloudflare Workers deployment you can use Cloudflare Workers for serverless functions if needed.

## Legal pages
- Privacy / Terms are templates. **Do not publish without legal review** for your country.

## Customize



## Serverless Stripe example (optional)

## CI / Automatic deploy
- A GitHub Actions workflow `/.github/workflows/deploy-films.yml` deploys the Cloudflare Worker API automatically when you push to `main`. Requires GitHub secrets: `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`.
- For frontend deployment, configure Cloudflare Pages to build from this repository or use `wrangler pages deploy dist` after building.

The repository includes optional example serverless functions for Stripe in `vercel/` and `netlify/` as a reference. These are not required for Cloudflare Workers deployment and will not function unless you deploy them and configure secret keys.

If you decide to use Stripe in production, follow Stripe's official docs and secure any secret keys in your hosting provider's environment variables.

## PayPal Sandbox

For PayPal sandbox testing replace `sb` in `Checkout.tsx` with your sandbox client id, or create a sandbox app in your PayPal developer dashboard and use the client-id provided.

## Generating Google Merchant Feed

Run:

```bash
npm run generate-feed
```

This reads `public/products.json` and writes `public/merchant-feed.xml` (change `your-domain.com` to your real URL in the script).

## Zwanski Films — Legal Movie Library (new)

This repo now includes a Cloudflare Worker API (`workers/film-api.ts`) plus a Vite/React frontend route at `/#/films` for a legal movie library that surfaces only public-domain or properly licensed Creative Commons titles.

### Quick start
- Run the worker locally: `npx wrangler dev --config wrangler.films.toml`
- Run the frontend: `npm run dev` then open `/#/films`

### Cloudflare setup
- Create a KV namespace and replace `REPLACE_WITH_KV_ID` in `wrangler.films.toml` with its ID.
- Create R2 bucket `zwanski-films-assets` (or rename in the config).
- Add secrets: `wrangler secret put TMDB_API_KEY`, `wrangler secret put YOUTUBE_API_KEY`, optional `OMDB_API_KEY`, and `wrangler secret put ADMIN_TOKEN`.
- Deploy the worker: `wrangler deploy --config wrangler.films.toml`.

### API endpoints
- `GET /api/search?q=title` — federates TMDb (metadata only), YouTube (license=creativeCommon), and Internet Archive; cached in KV.
- `GET /api/movie/:id` — returns a seed item or OMDb lookup (if configured).
- `POST /api/admin/upload` — admin-only intake, requires `Authorization: Bearer <ADMIN_TOKEN>` and fields `id`, `title`, `license`, `sourceUrl`.
- `POST /api/takedown` — submits rights/DMCA style report to KV for review.

### Frontend components
- `src/pages/Films.tsx` — landing page with search, browse, detail player, and admin intake.
- `src/features/films/*` — Search, Browse, Player, Detail, Admin UI pieces; embeds only IA/YouTube CC/R2 sources and shows license badges.

### Deployment workflow
- `.github/workflows/deploy-films.yml` deploys the worker on pushes touching worker files. Requires GitHub secrets: `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`.

### Compliance & legal checklist
- Only index/embed sources that are public-domain or Creative Commons with reuse rights. Always show the license label near the player.
- Keep TMDb use to metadata only (no streaming). Respect TMDb terms of service.
- For YouTube, search with `videoLicense=creativeCommon` and obey the embed terms.
- Require admin approval for any user upload; store proof of rights (link or statement) in intake notes.
- Provide a visible takedown/report form (implemented in `FilmDetail`).
- On verified complaints, remove/disable the item immediately and record the report ID.
- Add a CSP that disallows untrusted media hosts except approved domains (YouTube, archive.org, your R2/Stream).
- Log and rate-limit API search to avoid abuse.

