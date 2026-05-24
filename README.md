# Floravelle

## Overview

An Astro-powered e-commerce website for Floravelle, a botanical floral brand. Built with a focus on visual design, smooth animations, and a seamless shopping experience — from product discovery through to checkout. The site is designed for hybrid static/server-side rendering and integrates with WooCommerce as its commerce backend.

## Tech Stack

* **Framework:** Astro 6 (with React islands)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **State Management:** Nanostores (with persistence)
* **Animation:** GSAP & Lenis (smooth scrolling)
* **UI Components:** Lucide React, Swiper
* **Deployment:** Vercel (via `@astrojs/vercel`)
* **Package Manager:** pnpm

## Key Features

* Hybrid SSR/static rendering for optimal performance and dynamic product data
* WooCommerce REST API integration for live products, stock, and order management
* Smooth scroll and GSAP-powered animations for a premium brand feel
* Persistent cart state using Nanostores across pages and sessions
* Full checkout flow: cart review → customer info → payment → order confirmation
* Image optimisation via Sharp for fast page loads
* Secure server-side API routes — WooCommerce credentials never exposed to the client
* Zod schema validation on API inputs

## Project Structure

```
/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images and SVGs
│   ├── components/          # Astro & React UI components
│   │   └── checkout/        # Checkout-specific components
│   ├── context/             # React context (CartContext)
│   ├── layouts/             # Shared page layouts
│   ├── lib/                 # WooCommerce API client
│   └── pages/
│       ├── api/             # Server-side API endpoints
│       ├── products/        # Dynamic product pages
│       └── [collection].astro
├── .env.example             # Environment variable template
├── astro.config.mjs
├── products.json            # Static product data fallback
└── package.json
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy and configure environment variables
cp .env.example .env

# Start the development server
pnpm dev              # http://localhost:4321

# Build for production
pnpm build

# Preview the production build
pnpm preview
```

### Environment Variables

```
WOO_API_URL=https://yourdomain.com/wp-json/wc/v3
WOO_CONSUMER_KEY=ck_xxxxxxxxxxxxx
WOO_CONSUMER_SECRET=cs_xxxxxxxxxxxxx
```

## Impact

Floravelle demonstrates how Astro's hybrid rendering model can power a full e-commerce experience without sacrificing performance. By combining static generation for content pages with server-side rendering for live product and order data, the site achieves fast loads while staying in sync with a WooCommerce backend. The integration of GSAP and Lenis delivers a polished, animation-rich brand presence that elevates the botanical aesthetic beyond a typical storefront. Live at [floravelle.vercel.app](https://floravelle.vercel.app).
