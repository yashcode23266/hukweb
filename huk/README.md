# Hukmilane Lanecha Raja - Frontend Website

A premium frontend-only Ganpati Mandal website for **Hukmilane Lanecha Raja**.  
It includes a devotional landing page, cinematic About/Social Work/Events/Gallery pages, shop/cart demo flow, donation demo flow, admin dashboard demo, embedded map, SEO metadata, legal pages, and English/Marathi language support.

This current version is intentionally **frontend-only**. It does not require a backend server, MongoDB, MySQL, Razorpay backend verification, WhatsApp API, Cloudinary, or PDF generation server. Demo data is stored in the browser with `localStorage`.

## Current Status

- Frontend UI is active and runnable.
- Backend has been removed/not used in this version.
- Shop, Donation, and Admin pages are demo/local-storage flows.
- Razorpay and WhatsApp production integrations are not active yet.
- Legal/static pages are added.
- SEO metadata is added.
- English/Marathi toggle is available.

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- React Router v7
- TanStack Query v5
- Zustand
- LocalStorage demo data layer

## Libraries Used

```txt
@tailwindcss/vite
@tanstack/react-query
framer-motion
react
react-dom
react-router-dom
tailwindcss
zustand
```

## Main Features

- Premium Ganpati-themed responsive landing page
- Mumbai mandal inspired red/gold header
- Mobile menu with language switch
- Continuous announcement/ticker bar
- English/Marathi language toggle
- Cinematic About Us page
- Social Work page
- Events page
- Premium horizontal archive Gallery page
- Shop page with:
  - product listing
  - product image
  - price
  - stock badge
  - size selection
  - quantity selection
  - add to cart
  - cart remove
  - customer details
  - demo checkout
- Donation page with:
  - direct bank details
  - copy buttons
  - amount selector
  - purpose selector
  - donor details
  - demo donation payment
- Admin dashboard demo with:
  - admin login
  - products
  - announcements
  - gallery items
  - orders
  - donations
  - offline donation entry
  - order status update
  - audit logs
  - local CSV export
- Contact page with embedded Google Map
- Footer social links
- Legal/static pages:
  - Privacy Policy
  - Terms & Conditions
  - Refund Policy
- SEO helper for route-level titles/descriptions
- Production build works successfully

## Folder Structure

```txt
huk/
  README.md

  frontend/
    package.json
    package-lock.json
    vite.config.js
    eslint.config.js
    index.html

    public/
      _redirects
      vercel.json
      site.webmanifest
      og-logo.jpeg
      icons.svg
      favicon.svg

    src/
      App.jsx
      main.jsx
      index.css

      api/
        client.js
        razorpay.js

      assets/
        logo.png.jpeg
        ganpati-optimized.png
        gann.png
        gan.PNG
        zee.png
        rapido-removebg-preview.png
        Colors marathi.png
        Kesh.webp
        cp.png
        krish.png
        rr.png
        vrt.png

      components/
        Countdown.jsx
        Layout.jsx
        PageMeta.jsx
        SectionTitle.jsx

      data/
        fallback.js
        location.js

      i18n/
        LanguageContext.jsx
        languageContextValue.js
        useLanguage.js

      pages/
        About.jsx
        AdminDashboard.jsx
        Announcements.jsx
        Contact.jsx
        Donation.jsx
        Events.jsx
        Gallery.jsx
        Home.jsx
        LegalPage.jsx
        Shop.jsx
        SocialWork.jsx

      store/
        cartStore.js

      utils/
        format.js
```

## Routes

```txt
/                       Home
/about                  About Us
/social-work            Social Work
/events                 Events
/gallery                Gallery
/shop                   Shop
/donate                 Donation
/contact                Contact / Map
/admin                  Admin Dashboard
/privacy-policy         Privacy Policy
/terms-and-conditions   Terms & Conditions
/refund-policy          Refund Policy
```

## Setup Commands

Install dependencies:

```bash
cd D:/Hukmillane/huk/frontend
npm install
```

Run locally:

```bash
npm.cmd run dev
```

Open:

```txt
http://localhost:5173
```

Build:

```bash
npm.cmd run build
```

Preview production build:

```bash
npm.cmd run preview
```

Lint:

```bash
npm.cmd run lint
```

## Commands Originally Used To Create The Project

```bash
mkdir ganpati-mandal-app
cd ganpati-mandal-app
mkdir frontend
cd frontend
npm create vite@latest . -- --template react
npm install
npm install tailwindcss @tailwindcss/vite
npm install framer-motion react-router-dom zustand @tanstack/react-query
```

## Admin Demo Login

This is frontend-only demo authentication.

```txt
Email: admin@mandal.com
Password: admin12345
```

The previous generated demo password may also work:

```txt
GM-HOxPCRe61W9g-2026
```

## Local Demo Data

Demo records are stored in browser `localStorage`.

```txt
localStorage key: ganpatiMandalFrontendDb
```

Local demo data includes:

- products
- gallery items
- announcements
- demo orders
- demo donations
- users
- audit logs

To reset demo data, clear browser site data/localStorage for the local app.

## Where To Edit Common Content

Brand/header/footer:

```txt
frontend/src/components/Layout.jsx
```

Main translations:

```txt
frontend/src/i18n/LanguageContext.jsx
```

Map embed URL:

```txt
frontend/src/data/location.js
```

Home page:

```txt
frontend/src/pages/Home.jsx
```

About page:

```txt
frontend/src/pages/About.jsx
```

Social Work page:

```txt
frontend/src/pages/SocialWork.jsx
```

Events page:

```txt
frontend/src/pages/Events.jsx
```

Gallery page:

```txt
frontend/src/pages/Gallery.jsx
```

Shop page:

```txt
frontend/src/pages/Shop.jsx
```

Donation page:

```txt
frontend/src/pages/Donation.jsx
```

Admin page:

```txt
frontend/src/pages/AdminDashboard.jsx
```

Legal pages:

```txt
frontend/src/pages/LegalPage.jsx
```

SEO metadata:

```txt
frontend/src/components/PageMeta.jsx
frontend/src/components/Layout.jsx
frontend/index.html
```

## SEO

SEO already includes:

- page title updates
- meta description updates
- Open Graph title/description updates
- Twitter title/description updates
- static metadata in `frontend/index.html`
- web manifest in `frontend/public/site.webmanifest`

Before final deployment, update the real production URL/canonical values in:

```txt
frontend/index.html
```

## Mobile Responsiveness

The current UI uses:

- mobile-first Tailwind classes
- responsive grid layouts
- mobile menu
- responsive image sizing
- overflow protection in the main layout
- scrollable horizontal gallery behavior
- responsive admin panels/forms

Run the app locally and check:

```txt
375px mobile width
430px mobile width
768px tablet width
1366px desktop width
```

## What This Version Does Not Include

- No production backend
- No real database
- No secure Razorpay backend order verification
- No Razorpay webhook
- No WhatsApp Cloud API
- No server-generated PDF receipts
- No real receipt links
- No Cloudinary upload flow
- No secure admin sessions
- No server-side validation

## Backend Plan For Production

When production backend is needed, use either:

### Recommended Java Stack

```txt
Java 21
Spring Boot 3
Spring Security + JWT
MySQL 8
JPA/Hibernate
Razorpay Java SDK
WhatsApp Cloud API
PDF generation library
Excel export
Cloudinary/S3 for images
```

Good for:

- strong typed backend
- reliable admin systems
- MySQL relational data
- long-term maintainability

### Alternative Node Stack

```txt
Node.js 22
Express.js 5
MongoDB Atlas
Mongoose
JWT + bcrypt
Zod
Razorpay
Meta WhatsApp Cloud API
pdfkit
xlsx
Cloudinary
```

Good for:

- faster JavaScript-only development
- easier reuse with existing earlier backend plan

## Security Needed For Production Backend

Important production security features:

- HTTPS only
- secure admin authentication
- JWT access/refresh tokens
- bcrypt password hashing
- role-based access control
- input validation
- server-side payment verification
- Razorpay webhook signature verification
- rate limiting
- CORS allowlist
- helmet/security headers
- audit logs
- file upload validation
- image size/type restrictions
- Cloudinary/S3 signed upload strategy
- environment variables for secrets
- no secrets in frontend code
- database backups
- admin session expiry
- receipt access protection
- error logging
- request logging
- CSRF protection if cookie auth is used

## Hosting

This current frontend can be hosted as a static site.

Recommended:

- Vercel
- Netlify
- GitHub Pages

Build output:

```txt
frontend/dist
```

### Vercel Settings

```txt
Root directory: frontend
Install command: npm install
Build command: npm run build
Output directory: dist
```

React Router fallback is included:

```txt
frontend/public/vercel.json
```

### Netlify Settings

```txt
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

SPA fallback is included:

```txt
frontend/public/_redirects
```

## Final Checklist Before Deployment

- Confirm final mandal name spelling everywhere.
- Confirm final Marathi translations.
- Confirm final logo and Ganpati images.
- Confirm sponsor logos and names.
- Confirm final social media links.
- Confirm final email and location.
- Confirm Google Maps embed.
- Update canonical/production URL in SEO metadata.
- Replace frontend demo checkout with real backend payment flow if accepting real payments.
- Add backend before real admin/payment/donation use.
- Test on mobile and desktop.

## Latest Verification

The frontend was verified with:

```bash
npm.cmd run lint
npm.cmd run build
```

Both completed successfully.
