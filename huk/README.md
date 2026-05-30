# Shree Ganpati Mandal Full-Stack App

Production-shaped Ganpati Mandal website with React 19, Vite, Tailwind CSS v4, Framer Motion, Express 5, MongoDB Atlas, Razorpay, Meta WhatsApp Cloud API, PDF receipts, and Excel export.

## Folder Structure

```txt
huk/
  frontend/
    src/
      api/              Axios client and Razorpay checkout loader
      components/       Layout, section title, countdown
      data/             Fallback UI content
      pages/            Home, shop, donation, gallery, admin, announcements
      store/            Zustand cart store
      utils/            Format helpers
  backend/
    src/
      config/           MongoDB and Cloudinary config
      controllers/      Route handlers
      data/             Product catalog seed
      middleware/       Auth, validation, error handling
      models/           User, Order, Donation, Announcement, Gallery
      routes/           REST API routes
      services/         Razorpay, WhatsApp, PDF receipt services
      utils/            Async handler
    receipts/           Generated PDF receipts
    uploads/            Temporary gallery uploads
```

## Local Setup

```bash
cd D:/Hukmillane/huk/backend
copy .env.example .env
npm run dev
```

In another terminal:

```bash
cd D:/Hukmillane/huk/frontend
copy .env.example .env
npm run dev -- --host 127.0.0.1
```

Open:

- Frontend: `http://127.0.0.1:5173`
- Backend health: `http://localhost:5000/api/health`

## Required Environment

Backend `.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
API_BASE_URL=http://localhost:5000
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/ganpati-mandal
JWT_SECRET=change-this-long-random-secret
ADMIN_EMAIL=admin@mandal.com
ADMIN_PASSWORD=admin12345
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
META_WHATSAPP_TOKEN=
META_WHATSAPP_PHONE_NUMBER_ID=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=
```

## API Routes

- `GET /api/health`
- `POST /api/auth/admin/login`
- `GET /api/products`
- `POST /api/orders`
- `POST /api/orders/verify`
- `POST /api/donations`
- `POST /api/donations/verify`
- `GET /api/announcements`
- `POST /api/announcements` admin JWT
- `PUT /api/announcements/:id` admin JWT
- `DELETE /api/announcements/:id` admin JWT
- `GET /api/gallery`
- `POST /api/gallery` admin JWT, supports `image` upload or `imageUrl`
- `DELETE /api/gallery/:id` admin JWT
- `GET /api/admin/dashboard` admin JWT
- `GET /api/admin/export.xlsx` admin JWT

## Razorpay Setup

1. Create a Razorpay account and switch to test mode.
2. Go to Dashboard → Account & Settings → API Keys.
3. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to backend `.env`.
4. Add the same key id to frontend `.env` as `VITE_RAZORPAY_KEY_ID` if you want to expose it directly.
5. The backend verifies payment signatures using the key secret before marking orders or donations as paid.

Without Razorpay keys, checkout runs in dev mode and still exercises order, donation, receipt, and WhatsApp code paths.

## WhatsApp Cloud API Setup

1. Create a Meta developer app.
2. Add WhatsApp product.
3. Copy the temporary or permanent access token into `META_WHATSAPP_TOKEN`.
4. Copy the WhatsApp phone number id into `META_WHATSAPP_PHONE_NUMBER_ID`.
5. Use E.164 phone format for recipients, for example `919876543210`.

Without WhatsApp keys, the backend logs the message in dev mode.

## MongoDB Atlas Setup

1. Create a free Atlas cluster.
2. Add a database user and password.
3. Add your IP address to Network Access.
4. Copy the connection string into `MONGODB_URI`.
5. Use a database name such as `ganpati-mandal`.

## Hosting

- Frontend: Vercel
- Backend: Render or Railway
- Database: MongoDB Atlas
- Images: Cloudinary

Set the same environment variables on the hosting dashboards. Update `CLIENT_URL`, `API_BASE_URL`, and `VITE_API_URL` to production URLs.
