import { fallbackAnnouncements, fallbackGallery } from '../data/fallback'

const STORAGE_KEY = 'ganpatiMandalFrontendDb'
const ADMIN_EMAIL = 'admin@mandal.com'
const ADMIN_PASSWORDS = ['admin12345', 'GM-HOxPCRe61W9g-2026']

const seedProducts = [
  {
    _id: 'p1',
    name: 'Mandal T-Shirt',
    price: 599,
    description: 'Premium cotton T-shirt for volunteers and devotees.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 50,
    isActive: true,
  },
  {
    _id: 'p2',
    name: 'Volunteer ID Card',
    price: 149,
    description: 'Official mandal ID card for registered volunteers.',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=80',
    sizes: ['Standard'],
    stock: 100,
    isActive: true,
  },
]

function createSeedDb() {
  return {
    products: seedProducts,
    galleryItems: fallbackGallery,
    announcements: fallbackAnnouncements,
    orders: [],
    donations: [],
    users: [],
    auditLogs: [],
    counters: { order: 1, donation: 1, announcement: 3, gallery: 4, product: 3, user: 1 },
  }
}

function readDb() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value) return JSON.parse(value)
  } catch {
    // Fall back to seed data if local storage is blocked or corrupted.
  }
  const db = createSeedDb()
  writeDb(db)
  return db
}

function writeDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

function ok(data) {
  return Promise.resolve({ data })
}

function fail(message, status = 400) {
  const error = new Error(message)
  error.response = { status, data: { message } }
  return Promise.reject(error)
}

function id(prefix, db) {
  const value = db.counters[prefix] || 1
  db.counters[prefix] = value + 1
  return `${prefix}_${Date.now()}_${value}`
}

function receipt(prefix, number) {
  return `${prefix}-${String(number).padStart(5, '0')}`
}

function receiptUrl(label, number, amount) {
  const body = `${label}\nReceipt: ${number}\nAmount: Rs. ${amount}\nGenerated locally for frontend demo.`
  return URL.createObjectURL(new Blob([body], { type: 'text/plain' }))
}

function addAudit(db, action, entity, message) {
  db.auditLogs.unshift({
    _id: id('audit', db),
    action,
    entity,
    message,
    actor: ADMIN_EMAIL,
    createdAt: new Date().toISOString(),
  })
}

function upsertUser(db, person) {
  if (!person?.phone) return null
  const existing = db.users.find((item) => item.phone === person.phone)
  if (existing) return existing
  const user = {
    _id: id('user', db),
    name: person.name,
    phone: person.phone,
    email: person.email || '',
    createdAt: new Date().toISOString(),
  }
  db.users.unshift(user)
  return user
}

function fileToDataUrl(file) {
  return new Promise((resolve) => {
    if (!file) return resolve('')
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => resolve('')
    reader.readAsDataURL(file)
  })
}

async function formValue(formData, key) {
  return formData instanceof FormData ? formData.get(key) : formData?.[key]
}

async function imageFromForm(formData, fileKey, urlKey) {
  const file = await formValue(formData, fileKey)
  const url = await formValue(formData, urlKey)
  if (file instanceof File && file.size) return fileToDataUrl(file)
  return url || ''
}

function activeProducts(db) {
  return db.products.filter((product) => product.isActive !== false)
}

function dashboard(db) {
  return {
    stats: {
      users: db.users.length,
      orders: db.orders.length,
      donations: db.donations.length,
      products: db.products.length,
    },
    recentUsers: db.users,
    recentOrders: db.orders,
    recentDonations: db.donations,
    products: db.products,
    announcements: db.announcements,
    galleryItems: db.galleryItems,
    auditLogs: db.auditLogs,
  }
}

export const api = {
  async get(path) {
    const db = readDb()
    if (path === '/products') return ok(activeProducts(db))
    if (path === '/gallery') return ok(db.galleryItems)
    if (path === '/announcements') return ok(db.announcements)
    if (path === '/admin/dashboard') return ok(dashboard(db))
    return fail(`Unknown local route: GET ${path}`, 404)
  },

  async post(path, payload) {
    const db = readDb()

    if (path === '/auth/admin/login') {
      if (payload?.email === ADMIN_EMAIL && ADMIN_PASSWORDS.includes(payload?.password)) {
        addAudit(db, 'login_success', 'admin', 'Admin logged in locally')
        writeDb(db)
        return ok({ token: `local_admin_${Date.now()}`, admin: { email: ADMIN_EMAIL, role: 'admin' } })
      }
      addAudit(db, 'login_failed', 'admin', 'Invalid local admin login attempt')
      writeDb(db)
      return fail('Invalid admin credentials', 401)
    }

    if (path === '/orders') {
      if (!payload?.items?.length) return fail('Cart is empty.')
      const amount = payload.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const order = {
        _id: id('order', db),
        customer: payload.customer,
        items: payload.items.map((item) => ({ ...item })),
        amount,
        status: 'created',
        createdAt: new Date().toISOString(),
      }
      db.orders.unshift(order)
      upsertUser(db, payload.customer)
      writeDb(db)
      return ok({
        razorpayKeyId: 'rzp_test_dev_mode',
        razorpayOrder: { id: `local_order_${order._id}`, amount: amount * 100 },
        order,
      })
    }

    if (path === '/orders/verify') {
      const order = db.orders.find((item) => item._id === payload?.orderId)
      if (!order) return fail('Order not found.', 404)
      order.status = 'paid'
      order.razorpayPaymentId = payload.razorpayPaymentId
      order.receiptNumber = receipt('ORD', db.counters.order++)
      order.receiptUrl = receiptUrl('Order Receipt', order.receiptNumber, order.amount)
      order.items.forEach((line) => {
        const product = db.products.find((item) => item._id === line.productId)
        if (product && typeof product.stock === 'number') product.stock = Math.max(0, product.stock - line.quantity)
      })
      addAudit(db, 'order_paid', 'order', `Order ${order.receiptNumber} marked paid locally`)
      writeDb(db)
      return ok({ order })
    }

    if (path === '/donations') {
      const donation = {
        _id: id('donation', db),
        donor: payload.donor,
        amount: Number(payload.amount),
        purpose: payload.purpose || 'Ganpati Utsav Seva',
        status: 'created',
        paymentMode: 'razorpay',
        createdAt: new Date().toISOString(),
      }
      db.donations.unshift(donation)
      upsertUser(db, payload.donor)
      writeDb(db)
      return ok({
        razorpayKeyId: 'rzp_test_dev_mode',
        razorpayOrder: { id: `local_donation_${donation._id}`, amount: donation.amount * 100 },
        donation,
      })
    }

    if (path === '/donations/verify') {
      const donation = db.donations.find((item) => item._id === payload?.donationId)
      if (!donation) return fail('Donation not found.', 404)
      donation.status = 'paid'
      donation.razorpayPaymentId = payload.razorpayPaymentId
      donation.receiptNumber = receipt('DON', db.counters.donation++)
      donation.receiptUrl = receiptUrl('Donation Receipt', donation.receiptNumber, donation.amount)
      addAudit(db, 'donation_paid', 'donation', `Donation ${donation.receiptNumber} marked paid locally`)
      writeDb(db)
      return ok({ donation })
    }

    if (path === '/donations/offline') {
      const donation = {
        _id: id('donation', db),
        donor: payload.donor,
        amount: Number(payload.amount),
        purpose: payload.purpose,
        paymentMode: payload.paymentMode,
        paymentReference: payload.paymentReference,
        status: 'paid',
        receiptNumber: receipt('DON', db.counters.donation++),
        createdAt: new Date().toISOString(),
      }
      donation.receiptUrl = receiptUrl('Offline Donation Receipt', donation.receiptNumber, donation.amount)
      db.donations.unshift(donation)
      upsertUser(db, payload.donor)
      addAudit(db, 'offline_donation', 'donation', `Offline donation ${donation.receiptNumber} saved locally`)
      writeDb(db)
      return ok(donation)
    }

    if (path === '/announcements') {
      const announcement = {
        _id: id('announcement', db),
        title: payload.title,
        body: payload.body,
        category: payload.category || 'Update',
        isPinned: Boolean(payload.isPinned),
        createdAt: new Date().toISOString(),
      }
      db.announcements.unshift(announcement)
      addAudit(db, 'create', 'announcement', `Announcement "${announcement.title}" created locally`)
      writeDb(db)
      return ok(announcement)
    }

    if (path === '/gallery') {
      const imageUrl = await imageFromForm(payload, 'image', 'imageUrl')
      const item = {
        _id: id('gallery', db),
        title: await formValue(payload, 'title'),
        year: Number(await formValue(payload, 'year')),
        story: (await formValue(payload, 'story')) || '',
        imageUrl: imageUrl || fallbackGallery[0].imageUrl,
        createdAt: new Date().toISOString(),
      }
      db.galleryItems.unshift(item)
      addAudit(db, 'create', 'gallery', `Gallery item "${item.title}" created locally`)
      writeDb(db)
      return ok(item)
    }

    if (path === '/products') {
      const image = await imageFromForm(payload, 'imageFile', 'image')
      const product = {
        _id: id('product', db),
        name: await formValue(payload, 'name'),
        price: Number(await formValue(payload, 'price')),
        description: await formValue(payload, 'description'),
        image: image || seedProducts[0].image,
        sizes: String((await formValue(payload, 'sizes')) || 'Standard').split(',').map((item) => item.trim()).filter(Boolean),
        stock: Number(await formValue(payload, 'stock')) || 0,
        isActive: String(await formValue(payload, 'isActive')) !== 'false',
        createdAt: new Date().toISOString(),
      }
      db.products.unshift(product)
      addAudit(db, 'create', 'product', `Product "${product.name}" created locally`)
      writeDb(db)
      return ok(product)
    }

    return fail(`Unknown local route: POST ${path}`, 404)
  },

  async put(path, payload) {
    const db = readDb()

    if (path.startsWith('/announcements/')) {
      const item = db.announcements.find((entry) => entry._id === path.split('/').pop())
      if (!item) return fail('Announcement not found.', 404)
      Object.assign(item, payload)
      addAudit(db, 'update', 'announcement', `Announcement "${item.title}" updated locally`)
      writeDb(db)
      return ok(item)
    }

    if (path.startsWith('/gallery/')) {
      const item = db.galleryItems.find((entry) => entry._id === path.split('/').pop())
      if (!item) return fail('Gallery item not found.', 404)
      const imageUrl = await imageFromForm(payload, 'image', 'imageUrl')
      item.title = await formValue(payload, 'title')
      item.year = Number(await formValue(payload, 'year'))
      item.story = (await formValue(payload, 'story')) || ''
      item.imageUrl = imageUrl || item.imageUrl
      addAudit(db, 'update', 'gallery', `Gallery item "${item.title}" updated locally`)
      writeDb(db)
      return ok(item)
    }

    if (path.startsWith('/products/')) {
      const item = db.products.find((entry) => entry._id === path.split('/').pop())
      if (!item) return fail('Product not found.', 404)
      const image = await imageFromForm(payload, 'imageFile', 'image')
      item.name = await formValue(payload, 'name')
      item.price = Number(await formValue(payload, 'price'))
      item.description = await formValue(payload, 'description')
      item.image = image || item.image
      item.sizes = String((await formValue(payload, 'sizes')) || 'Standard').split(',').map((entry) => entry.trim()).filter(Boolean)
      item.stock = Number(await formValue(payload, 'stock')) || 0
      item.isActive = String(await formValue(payload, 'isActive')) !== 'false'
      addAudit(db, 'update', 'product', `Product "${item.name}" updated locally`)
      writeDb(db)
      return ok(item)
    }

    if (path.startsWith('/orders/') && path.endsWith('/status')) {
      const idValue = path.split('/')[2]
      const order = db.orders.find((entry) => entry._id === idValue)
      if (!order) return fail('Order not found.', 404)
      order.status = payload.status
      addAudit(db, 'status_update', 'order', `Order status changed to ${payload.status}`)
      writeDb(db)
      return ok(order)
    }

    return fail(`Unknown local route: PUT ${path}`, 404)
  },

  async delete(path) {
    const db = readDb()

    if (path.startsWith('/announcements/')) {
      db.announcements = db.announcements.filter((entry) => entry._id !== path.split('/').pop())
      addAudit(db, 'delete', 'announcement', 'Announcement deleted locally')
      writeDb(db)
      return ok({})
    }

    if (path.startsWith('/gallery/')) {
      db.galleryItems = db.galleryItems.filter((entry) => entry._id !== path.split('/').pop())
      addAudit(db, 'delete', 'gallery', 'Gallery item deleted locally')
      writeDb(db)
      return ok({})
    }

    if (path.startsWith('/products/')) {
      db.products = db.products.filter((entry) => entry._id !== path.split('/').pop())
      addAudit(db, 'delete', 'product', 'Product deleted locally')
      writeDb(db)
      return ok({})
    }

    return fail(`Unknown local route: DELETE ${path}`, 404)
  },
}

export function downloadAdminExport() {
  const db = readDb()
  const rows = [
    ['Type', 'Name/Title', 'Phone/Status', 'Amount/Year'],
    ...db.users.map((item) => ['User', item.name, item.phone, '']),
    ...db.orders.map((item) => ['Order', item.customer?.name || '', item.status, item.amount]),
    ...db.donations.map((item) => ['Donation', item.donor?.name || '', item.status, item.amount]),
    ...db.galleryItems.map((item) => ['Gallery', item.title, '', item.year]),
    ...db.products.map((item) => ['Product', item.name, item.isActive ? 'Active' : 'Inactive', item.price]),
  ]
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'ganpati-mandal-export.csv'
  link.click()
  URL.revokeObjectURL(url)
}
