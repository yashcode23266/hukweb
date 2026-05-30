# Hukmilane Lanecha Raja - Ganpati Mandal Web App

A production-shaped full-stack Ganpati Mandal website with a devotional Mumbai mandal style, e-commerce, donations, admin dashboard, gallery management, PDF receipts, Excel export, Razorpay integration, and WhatsApp confirmation support.

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- React Router v7
- TanStack Query v5
- Zustand
- Axios

### Backend

- Node.js
- Express.js v5
- MongoDB Atlas
- Mongoose
- JWT authentication
- bcrypt password hashing
- Zod validation
- Helmet security headers
- Express rate limiting
- Multer uploads
- Cloudinary image storage support

### Integrations

- Razorpay payments
- Meta WhatsApp Cloud API support
- PDFKit receipt generation
- SheetJS Excel export

## Features

- Ganpati-themed responsive landing page
- Mumbai mandal style header and devotional UI
- English and Marathi language toggle
- About Us page
- Events page
- Social Work page
- Shop for T-shirts and ID cards
- Cart and checkout flow
- Razorpay order payment flow
- Donation flow with Razorpay and offline donation support
- PDF receipts for orders and donations
- WhatsApp confirmation message support
- Gallery section with year-wise memories
- Admin login
- Admin dashboard for users, orders, donations, products, announcements, gallery, and audit logs
- Product add, edit, delete, stock, sizes, and image upload support
- Gallery add, edit, delete, and image upload support
- Announcement add, edit, delete, and pin support
- Excel export for admin data
- Secure backend middleware and validation

## Current Folder Structure

```txt
huk/
  README.md

  frontend/
    src/
      api/
        client.js
        razorpay.js

      assets/
        ganpati.png.jpeg
        logo.png.jpeg

      components/
        BrandMark.jsx
        Countdown.jsx
        Layout.jsx
        SectionTitle.jsx

      data/
        fallback.js

      i18n/
        LanguageContext.jsx

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
    package.json
    vite.config.js

  backend/
    receipts/
      generated PDF receipts

    scripts/
      hashAdminPassword.js

    src/
      config/
        cloudinary.js
        db.js

      controllers/
        adminController.js
        announcementController.js
        authController.js
        donationController.js
        galleryController.js
        orderController.js
        productController.js

      data/
        products.js

      middleware/
        authMiddleware.js
        errorMiddleware.js
        securityMiddleware.js
        uploadMiddleware.js
        validate.js

      models/
        Announcement.js
        AuditLog.js
        Counter.js
        Donation.js
        Gallery.js
        Order.js
        Product.js
        User.js

      routes/
        adminRoutes.js
        announcementRoutes.js
        authRoutes.js
        donationRoutes.js
        galleryRoutes.js
        orderRoutes.js
        productRoutes.js

      services/
        auditService.js
        counterService.js
        razorpayService.js
        receiptService.js
        whatsappService.js

      utils/
        asyncHandler.js
        phone.js

      app.js
      server.js

    uploads/
    .env.example
    package.json
```

## Local Setup

### 1. Clone or open the project

```bash
cd D:/Hukmillane/huk
```

### 2. Backend setup

```bash
cd backend
npm install
copy .env.example .env
npm.cmd run dev
```

Backend runs on:

```txt
http://localhost:5000
```

Health check:

```txt
http://localhost:5000/api/health
```

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm.cmd run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Environment Variables

### Backend `.env`

```env
PORT=5000
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
API_BASE_URL=http://localhost:5000

MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/ganpati-mandal
JWT_SECRET=change-this-long-random-secret

ADMIN_EMAIL=admin@mandal.com
ADMIN_PASSWORD=admin12345

MANDAL_NAME=Shree Ganpati Mandal
MANDAL_ADDRESS=Mumbai, Maharashtra, India
MANDAL_CONTACT=+91 98765 43210

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

META_WHATSAPP_TOKEN=
META_WHATSAPP_PHONE_NUMBER_ID=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=
```

## Important Admin Setup

The backend supports plain text admin passwords for local testing, but production should use a bcrypt hash.

To generate a hashed admin password:

```bash
cd backend
npm.cmd run hash:admin-password
```

Copy the generated hash into:

```env
ADMIN_PASSWORD=your_generated_bcrypt_hash
```

Then restart the backend server.

## Main Frontend Routes

```txt
/              Landing page
/about         About Us
/events        Events
/social-work   Social Work
/shop          Shop and checkout
/donate        Donation page
/gallery       Gallery
/contact       Location and contact
/admin         Admin dashboard
```

## API Routes

### Health

```txt
GET /api/health
```

### Auth

```txt
POST /api/auth/admin/login
```

### Products

```txt
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Admin routes require JWT.

### Orders

```txt
POST /api/orders
POST /api/orders/verify
PUT  /api/orders/:id/status
```

### Donations

```txt
POST /api/donations
POST /api/donations/verify
POST /api/donations/offline
```

### Announcements

```txt
GET    /api/announcements
POST   /api/announcements
PUT    /api/announcements/:id
DELETE /api/announcements/:id
```

Admin create, update, and delete routes require JWT.

### Gallery

```txt
GET    /api/gallery
POST   /api/gallery
PUT    /api/gallery/:id
DELETE /api/gallery/:id
```

Admin create, update, and delete routes require JWT. Gallery supports uploaded image files or pasted image URLs.

### Admin

```txt
GET /api/admin/dashboard
GET /api/admin/export.xlsx
```

Admin routes require JWT.

## Razorpay Setup

1. Create or open a Razorpay account.
2. Use test mode during development.
3. Go to API Keys in the Razorpay dashboard.
4. Add keys to backend `.env`:

```env
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

5. Add the key id to frontend `.env`:

```env
VITE_RAZORPAY_KEY_ID=
```

6. Restart backend and frontend.

Payment verification is done on the backend using Razorpay signature verification.

## WhatsApp Cloud API Setup

1. Create a Meta Developer app.
2. Add the WhatsApp product.
3. Get the access token.
4. Get the WhatsApp phone number id.
5. Add them to backend `.env`:

```env
META_WHATSAPP_TOKEN=
META_WHATSAPP_PHONE_NUMBER_ID=
```

If WhatsApp keys are missing, the backend keeps working and logs the WhatsApp message in development mode.

## Cloudinary Setup

Images should not be stored directly in MongoDB. MongoDB should store only image URLs and metadata.

For image uploads:

1. Create a Cloudinary account.
2. Copy cloud name, API key, and API secret.
3. Add them to backend `.env`:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Without Cloudinary credentials, image URL input can still be used.

## MongoDB Atlas Setup

1. Create a free MongoDB Atlas cluster.
2. Create a database user.
3. Add your IP address in Network Access.
4. Copy the connection string.
5. Add it to backend `.env`:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/ganpati-mandal
```

## Security Features

- JWT protected admin routes
- bcrypt admin password support
- Zod request validation
- Helmet security headers
- Rate limiting for API protection
- Strict CORS configuration
- Secure Razorpay signature verification
- Upload file type restrictions
- Upload size restrictions
- Centralized error handling
- Audit logs for admin actions
- Session expiry handling on frontend
- Admin token stored and cleared on logout/session expiry
- Phone number normalization for WhatsApp messages
- Environment variables for secrets

## Production Checklist

These items should be completed before real public launch:

- Add real Razorpay live keys after KYC/PAN verification
- Add Razorpay webhook after account verification
- Add real Meta WhatsApp Cloud API credentials
- Add signed or protected receipt links
- Add legal pages: privacy policy, terms, refund/cancellation policy
- Add deployment environment variables
- Deploy frontend to Vercel
- Deploy backend to Render or Railway
- Use MongoDB Atlas production cluster
- Use Cloudinary for all uploaded images
- Enable production CORS domains only
- Replace local admin credentials with a strong hashed password
- Run final mobile and desktop UI testing
- Add code-splitting/performance polish

## Build Commands

Frontend:

```bash
cd frontend
npm.cmd run build
```

Backend:

```bash
cd backend
npm.cmd start
```

## Recommended Hosting

- Frontend: Vercel
- Backend: Render or Railway
- Database: MongoDB Atlas
- Images: Cloudinary
- Payments: Razorpay
- WhatsApp: Meta WhatsApp Cloud API

## Notes

- Do not commit real `.env` files.
- Do not commit real Razorpay, WhatsApp, Cloudinary, MongoDB, or JWT secrets.
- Store uploaded images in Cloudinary, not MongoDB.
- Keep generated receipts protected before production launch.
