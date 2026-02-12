# Adley Enterprises Site Scaffold (Next.js + Sanity)

This project scaffolds a multi-page website for Adley Enterprises LLC with SEO/AEO/GEO-first architecture.

## Stack
- Next.js (App Router + TypeScript)
- Sanity CMS (embedded Studio at `/studio`)
- Vercel-ready deployment structure

## Included Content Architecture
- Singleton: `siteSettings`
- Documents: `service`, `locationPage`, `product`, `faqItem`, `blogPost`, `project`
- Reusable objects: `seo`, `richText`

## Built-In SEO / AEO / GEO Tactics
- Page-level metadata generation with canonical support
- JSON-LD for:
  - `LocalBusiness`
  - `Service`
  - `FAQPage`
  - `Product`
  - `BreadcrumbList`
- Dynamic `sitemap.xml` route
- Dynamic `robots.txt` route
- Service pages and geo pages with internal linking
- FAQ-rich content structure for answer-engine visibility
- Conversion tracking hooks for call clicks and quote form submissions

## Analytics Tracking
- Optional GA4 and GTM script injection via env vars
- Event tracking included for:
  - `phone_call_click`
  - `quote_form_submit` (`attempt`, `success`, `error`)
  - `generate_lead` (on successful quote submission)

## Routes Scaffolded
- `/`
- `/about`
- `/services`
- `/services/[slug]`
- `/products`
- `/products/[slug]`
- `/service-areas`
- `/service-areas/[slug]`
- `/gallery`
- `/faq`
- `/blog`
- `/blog/[slug]`
- `/contact`
- `/studio/[[...tool]]`

## Quote Form
- Frontend quote form includes all requested lead fields
- API endpoint: `POST /api/quote`
- Delivery target: `sales@adleyenterprises.com`
- Supports Resend via env vars

## Environment Setup
Copy and fill environment values:

```bash
cp .env.example .env.local
```

Required values for live Sanity connection:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Optional for quote-email delivery:
- `RESEND_API_KEY`
- `QUOTE_FROM_EMAIL`

Optional for analytics:
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- `NEXT_PUBLIC_GTM_ID`

## Seed Content Import
Generate and import initial content:

```bash
npm run seed:generate
sanity dataset import sanity/seed/adley-seed.ndjson production --replace
```

Seed package location:
- `sanity/seed/adley-seed.json`
- `sanity/seed/adley-seed.ndjson`

## Local Development
```bash
npm install
npm run dev
```

To run Sanity Studio directly (optional):
```bash
npm run sanity:dev
```

## Production Notes
- Set `NEXT_PUBLIC_SITE_URL` to the production domain
- Set all required Sanity env vars in Vercel
- Configure DNS to point `www.adleyenterprisesllc.com` to Vercel
- Add analytics + Search Console after launch

## Current Placeholder Items
- Final warranty policy text
- Approved production image set
