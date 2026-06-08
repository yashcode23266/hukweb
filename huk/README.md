# Hukmilane Lanecha Raja - Frontend Website

A frontend-only Ganpati Mandal website built with React, Vite, Tailwind CSS, Framer Motion, local browser storage, shop/cart flow, donation demo flow, gallery, admin dashboard, and English/Marathi UI support.

This version does not require a backend server, MongoDB, Razorpay backend verification, or Cloudinary. Data is stored locally in the browser using `localStorage`, so it is useful for UI demos, local previews, and frontend development.

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- React Router v7
- TanStack Query v5
- Zustand

## Frontend Libraries Used

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

## Features

- Ganpati-themed responsive landing page
- Mumbai mandal inspired header and devotional UI
- English/Marathi language toggle
- About Us page
- Events page
- Social Work page
- Shop page with products, cart, quantity, size selection, and demo checkout
- Donation page with direct bank details and demo payment flow
- Photo gallery with year filter
- Gallery preview on home page
- Contact/location section with embedded map
- Admin login
- Admin dashboard using local browser data
- Add, edit, delete products
- Add, edit, delete gallery items
- Add, edit, delete announcements
- Offline donation entry
- Order status management
- Local CSV export
- Optimized Ganpati hero image
- SEO metadata, Open Graph preview, and web manifest
- Route-level code-splitting for faster first load

## Current Folder Structure

```txt
huk/
  README.md

  frontend/
    src/
      api/
        client.js          Local browser-storage API
        razorpay.js        Demo Razorpay checkout helper

      assets/
        ganpati-optimized.jpeg
        logo.png.jpeg

      components/
        Countdown.jsx
        Layout.jsx
        SectionTitle.jsx

      data/
        fallback.js

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
        Shop.jsx
        SocialWork.jsx

      store/
        cartStore.js

      utils/
        format.js

      App.jsx
      index.css
      main.jsx

    .env.example
    index.html
    package.json
      public/
      _redirects
      favicon.svg
      icons.svg
      og-logo.jpeg
      site.webmanifest
      vercel.json
    vite.config.js
```

## Commands Used To Create The Project

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

## Local Setup

```bash
cd D:/Hukmillane/huk/frontend
npm install
npm.cmd run dev
```

Open:

```txt
http://localhost:5173
```

## Build

```bash
cd D:/Hukmillane/huk/frontend
npm.cmd run build
```

## Preview Production Build

```bash
cd D:/Hukmillane/huk/frontend
npm.cmd run preview
```

## Main Routes

```txt
/              Landing page
/about         About Us
/events        Events
/social-work   Social Work
/shop          Shop and demo checkout
/donate        Donation page
/gallery       Gallery
/contact       Location and contact
/admin         Admin dashboard
```

## Admin Login

Because this is now frontend-only, admin login is only for local demo use.

```txt
Email: admin@mandal.com
Password: admin12345
```

The previous generated demo password also works:

```txt
GM-HOxPCRe61W9g-2026
```

## Local Data Storage

The frontend stores demo data in the browser under:

```txt
localStorage key: ganpatiMandalFrontendDb
```

Stored locally:

- products
- gallery items
- announcements
- demo orders
- demo donations
- users
- audit logs

To reset local demo data, clear browser site data/localStorage for the app.

## What This Version Does Not Include

- No Express backend
- No MongoDB database
- No secure payment verification
- No real Razorpay order creation
- No real WhatsApp API
- No Cloudinary upload
- No server-generated PDF receipts
- No protected receipt links

## Production Notes

This frontend-only version is suitable for design preview and UI demonstration.

For real production payments, orders, donations, receipts, WhatsApp messages, admin security, and database storage, a backend must be added again.

## Hosting

This version can be hosted as a static frontend.

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
Build command: npm run build
Output directory: dist
Install command: npm install
```

The project includes `public/vercel.json` so React Router pages such as `/about`, `/shop`, `/donate`, and `/admin` refresh correctly after deployment.

### Netlify Settings

```txt
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

The project includes `public/_redirects` for static hosting SPA fallback.

### Before Final Deployment

- Confirm final phone number, email, address, and social links.
- Add the real deployed URL as a canonical URL in `frontend/index.html`.
- Replace demo checkout/localStorage logic if real backend payments are needed.
