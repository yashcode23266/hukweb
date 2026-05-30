import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { api, downloadAdminExport } from '../api/client'
import SectionTitle from '../components/SectionTitle'
import { money } from '../utils/format'

const emptyProduct = {
  name: '',
  price: '',
  description: '',
  image: '',
  imageFile: null,
  sizes: 'Standard',
  stock: 0,
  isActive: true,
}

const emptyGallery = { title: '', year: new Date().getFullYear(), story: '', imageUrl: '', imageFile: null }
const emptyOfflineDonation = {
  name: '',
  phone: '',
  email: '',
  pan: '',
  amount: '',
  purpose: 'Ganpati Utsav Seva',
  paymentMode: 'upi',
  paymentReference: '',
}
const orderStatuses = ['paid', 'processing', 'ready', 'delivered', 'cancelled', 'failed']

function filterItems(items, query) {
  const value = query.trim().toLowerCase()
  if (!value) return items
  return items.filter((item) => JSON.stringify(item).toLowerCase().includes(value))
}

function AdminDashboard() {
  const queryClient = useQueryClient()
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '')
  const [login, setLogin] = useState({ email: 'admin@mandal.com', password: '' })
  const [announcement, setAnnouncement] = useState({ title: '', body: '', category: 'Update', isPinned: false })
  const [editingAnnouncement, setEditingAnnouncement] = useState(null)
  const [gallery, setGallery] = useState(emptyGallery)
  const [editingGallery, setEditingGallery] = useState(null)
  const [product, setProduct] = useState(emptyProduct)
  const [editingProduct, setEditingProduct] = useState(null)
  const [offlineDonation, setOfflineDonation] = useState(emptyOfflineDonation)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  const dashboard = useQuery({
    queryKey: ['admin-dashboard', adminToken],
    enabled: Boolean(adminToken),
    queryFn: async () => (await api.get('/admin/dashboard')).data,
  })

  useEffect(() => {
    function handleExpired() {
      setAdminToken('')
      setMessage('Session expired. Please login again.')
      queryClient.removeQueries({ queryKey: ['admin-dashboard'] })
    }

    window.addEventListener('admin-session-expired', handleExpired)
    return () => window.removeEventListener('admin-session-expired', handleExpired)
  }, [queryClient])

  const loginMutation = useMutation({
    mutationFn: async () => (await api.post('/auth/admin/login', login)).data,
    onSuccess: (data) => {
      localStorage.setItem('adminToken', data.token)
      setAdminToken(data.token)
      setMessage('Admin login successful.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || 'Login failed.'),
  })

  const announcementMutation = useMutation({
    mutationFn: async () => (await api.post('/announcements', announcement)).data,
    onSuccess: () => {
      setAnnouncement({ title: '', body: '', category: 'Update', isPinned: false })
      setMessage('Announcement published.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
    },
  })

  const updateAnnouncementMutation = useMutation({
    mutationFn: async ({ id, values }) => (await api.put(`/announcements/${id}`, values)).data,
    onSuccess: () => {
      setEditingAnnouncement(null)
      setMessage('Announcement updated.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || 'Announcement update failed.'),
  })

  const deleteAnnouncementMutation = useMutation({
    mutationFn: async (id) => api.delete(`/announcements/${id}`),
    onSuccess: () => {
      setMessage('Announcement deleted.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || 'Announcement delete failed.'),
  })

  const galleryMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('title', gallery.title)
      formData.append('year', gallery.year)
      if (gallery.story) formData.append('story', gallery.story)
      if (gallery.imageUrl) formData.append('imageUrl', gallery.imageUrl)
      if (gallery.imageFile) formData.append('image', gallery.imageFile)
      return (await api.post('/gallery', formData)).data
    },
    onSuccess: () => {
      setGallery(emptyGallery)
      setMessage('Gallery item added.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || 'Gallery save failed.'),
  })

  const productMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('name', product.name)
      formData.append('price', product.price)
      formData.append('description', product.description)
      formData.append('sizes', product.sizes)
      formData.append('stock', product.stock || 0)
      formData.append('isActive', String(product.isActive))
      if (product.image) formData.append('image', product.image)
      if (product.imageFile) formData.append('imageFile', product.imageFile)
      return (await api.post('/products', formData)).data
    },
    onSuccess: () => {
      setProduct(emptyProduct)
      setMessage('Product added.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || 'Product save failed.'),
  })

  const deleteProductMutation = useMutation({
    mutationFn: async (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      setMessage('Product deleted.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, values }) => {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('price', values.price)
      formData.append('description', values.description)
      formData.append('sizes', values.sizes)
      formData.append('stock', values.stock || 0)
      formData.append('isActive', String(values.isActive))
      if (values.image) formData.append('image', values.image)
      if (values.imageFile) formData.append('imageFile', values.imageFile)
      return (await api.put(`/products/${id}`, formData)).data
    },
    onSuccess: () => {
      setEditingProduct(null)
      setMessage('Product updated.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || 'Product update failed.'),
  })

  const deleteGalleryMutation = useMutation({
    mutationFn: async (id) => api.delete(`/gallery/${id}`),
    onSuccess: () => {
      setMessage('Gallery item deleted.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || 'Gallery delete failed.'),
  })

  const updateGalleryMutation = useMutation({
    mutationFn: async ({ id, values }) => {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('year', values.year)
      if (values.story) formData.append('story', values.story)
      if (values.imageUrl) formData.append('imageUrl', values.imageUrl)
      if (values.imageFile) formData.append('image', values.imageFile)
      return (await api.put(`/gallery/${id}`, formData)).data
    },
    onSuccess: () => {
      setEditingGallery(null)
      setMessage('Gallery item updated.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || 'Gallery update failed.'),
  })

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => (await api.put(`/orders/${id}/status`, { status })).data,
    onSuccess: () => {
      setMessage('Order status updated.')
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || 'Order status update failed.'),
  })

  const offlineDonationMutation = useMutation({
    mutationFn: async () =>
      (
        await api.post('/donations/offline', {
          donor: {
            name: offlineDonation.name,
            phone: offlineDonation.phone,
            email: offlineDonation.email,
            pan: offlineDonation.pan,
          },
          amount: Number(offlineDonation.amount),
          purpose: offlineDonation.purpose,
          paymentMode: offlineDonation.paymentMode,
          paymentReference: offlineDonation.paymentReference,
        })
      ).data,
    onSuccess: (data) => {
      setOfflineDonation(emptyOfflineDonation)
      setMessage(`Offline donation saved. ${data.receiptNumber}`)
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || 'Offline donation save failed.'),
  })

  function exportExcel() {
    downloadAdminExport()
  }

  function logout() {
    localStorage.removeItem('adminToken')
    setAdminToken('')
    setMessage('Logged out.')
    queryClient.removeQueries({ queryKey: ['admin-dashboard'] })
  }

  function confirmDelete(label, action) {
    if (window.confirm(`Delete ${label}? This cannot be undone.`)) action()
  }

  const isBusy =
    announcementMutation.isPending ||
    updateAnnouncementMutation.isPending ||
    deleteAnnouncementMutation.isPending ||
    galleryMutation.isPending ||
    updateGalleryMutation.isPending ||
    deleteGalleryMutation.isPending ||
    productMutation.isPending ||
    updateProductMutation.isPending ||
    deleteProductMutation.isPending ||
    updateOrderStatusMutation.isPending ||
    offlineDonationMutation.isPending

  return (
    <section className="px-4 py-12 sm:px-6">
      <SectionTitle eyebrow="Admin" title="Mandal Dashboard">
        Secure controls for products, orders, donations, announcements, gallery, and Excel exports.
      </SectionTitle>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="h-fit rounded-lg border border-orange-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black">Admin Login</h2>
          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault()
              loginMutation.mutate()
            }}
          >
            <input className="w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Admin email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />
            <input className="w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Admin password" type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
            <button className="w-full rounded-full bg-red-700 px-4 py-3 font-black text-white">Login</button>
          </form>
          <button className="mt-3 w-full rounded-full bg-stone-950 px-4 py-3 font-black text-amber-100 disabled:opacity-50" type="button" onClick={exportExcel} disabled={!adminToken}>
            Export Excel
          </button>
          <button className="mt-3 w-full rounded-full border border-red-200 bg-white px-4 py-3 font-black text-red-800 disabled:opacity-50" type="button" onClick={logout} disabled={!adminToken}>
            Logout
          </button>
          {message ? <p className="mt-3 rounded-md bg-green-50 p-3 text-sm font-bold text-green-800">{message}</p> : null}
        </aside>

        {adminToken ? (
        <div className="space-y-6">
          <input
            className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 shadow-sm"
            placeholder="Search admin data by name, phone, receipt, status, product, or action"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="grid gap-4 sm:grid-cols-4">
            {['users', 'orders', 'donations', 'products'].map((key) => (
              <div key={key} className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-red-700">{key}</p>
                <p className="mt-2 text-4xl font-black">{dashboard.data?.stats?.[key] ?? 0}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <ProductForm disabled={productMutation.isPending} product={product} setProduct={setProduct} onSubmit={() => productMutation.mutate()} />
            <AnnouncementForm disabled={announcementMutation.isPending} announcement={announcement} setAnnouncement={setAnnouncement} onSubmit={() => announcementMutation.mutate()} />
            <GalleryForm disabled={galleryMutation.isPending} gallery={gallery} setGallery={setGallery} onSubmit={() => galleryMutation.mutate()} />
            <OfflineDonationForm
              disabled={offlineDonationMutation.isPending}
              donation={offlineDonation}
              setDonation={setOfflineDonation}
              onSubmit={() => offlineDonationMutation.mutate()}
            />
          </div>

          <AnnouncementList
            editingAnnouncement={editingAnnouncement}
            items={filterItems(dashboard.data?.announcements || [], search)}
            onCancelEdit={() => setEditingAnnouncement(null)}
            disabled={isBusy}
            onDelete={(id) => confirmDelete('this announcement', () => deleteAnnouncementMutation.mutate(id))}
            onEdit={(item) =>
              setEditingAnnouncement({
                _id: item._id,
                title: item.title,
                body: item.body,
                category: item.category || 'Update',
                isPinned: Boolean(item.isPinned),
              })
            }
            onSave={(id, values) => updateAnnouncementMutation.mutate({ id, values })}
            setEditingAnnouncement={setEditingAnnouncement}
          />

          <ProductList
            editingProduct={editingProduct}
            items={filterItems(dashboard.data?.products || [], search)}
            onCancelEdit={() => setEditingProduct(null)}
            disabled={isBusy}
            onDelete={(id) => confirmDelete('this product', () => deleteProductMutation.mutate(id))}
            onEdit={(item) =>
              setEditingProduct({
                _id: item._id,
                name: item.name,
                price: item.price,
                description: item.description,
                image: item.image,
                imageFile: null,
                sizes: item.sizes?.join(',') || 'Standard',
                stock: item.stock ?? 0,
                isActive: Boolean(item.isActive),
              })
            }
            onSave={(id, values) => updateProductMutation.mutate({ id, values })}
            setEditingProduct={setEditingProduct}
          />
          <GalleryList
            editingGallery={editingGallery}
            items={filterItems(dashboard.data?.galleryItems || [], search)}
            onCancelEdit={() => setEditingGallery(null)}
            disabled={isBusy}
            onDelete={(id) => confirmDelete('this gallery item', () => deleteGalleryMutation.mutate(id))}
            onEdit={(item) =>
              setEditingGallery({
                _id: item._id,
                title: item.title,
                year: item.year,
                story: item.story || '',
                imageUrl: item.imageUrl || '',
                imageFile: null,
              })
            }
            onSave={(id, values) => updateGalleryMutation.mutate({ id, values })}
            setEditingGallery={setEditingGallery}
          />

          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black">Recent Users</h2>
            <div className="mt-4">
              <UserList items={filterItems(dashboard.data?.recentUsers || [], search)} />
            </div>
          </div>

          <OrderManagement
            items={filterItems(dashboard.data?.recentOrders || [], search)}
            onStatusChange={(id, status) => updateOrderStatusMutation.mutate({ id, status })}
          />
          <DonationManagement items={filterItems(dashboard.data?.recentDonations || [], search)} />
          <AuditLogList items={filterItems(dashboard.data?.auditLogs || [], search)} />
        </div>
        ) : (
          <div className="rounded-lg border border-orange-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-stone-950">Login Required</h2>
            <p className="mt-2 text-stone-700">Admin controls are hidden until a valid session is active.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function ProductForm({ disabled, product, setProduct, onSubmit }) {
  const preview = product.imageFile ? URL.createObjectURL(product.imageFile) : product.image

  return (
    <form
      className="rounded-lg bg-white p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <h2 className="text-xl font-black">Add Product</h2>
      <input className="mt-4 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Product name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input className="rounded-md border border-orange-200 px-3 py-3" placeholder="Price" type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
        <input className="rounded-md border border-orange-200 px-3 py-3" placeholder="Stock" type="number" value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} />
      </div>
      {preview ? <img src={preview} alt="" className="mt-3 h-36 w-full rounded-md object-cover" /> : null}
      <input
        className="mt-3 w-full rounded-md border border-orange-200 px-3 py-3"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => setProduct({ ...product, imageFile: e.target.files?.[0] || null })}
      />
      <input className="mt-3 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Or paste image URL" value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} />
      <input className="mt-3 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Sizes comma separated, e.g. S,M,L,XL" value={product.sizes} onChange={(e) => setProduct({ ...product, sizes: e.target.value })} />
      <textarea className="mt-3 min-h-24 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
      <label className="mt-3 flex items-center gap-2 text-sm font-bold text-stone-700">
        <input type="checkbox" checked={product.isActive} onChange={(e) => setProduct({ ...product, isActive: e.target.checked })} />
        Active in shop
      </label>
      <button className="mt-3 rounded-full bg-red-700 px-5 py-3 font-black text-white disabled:opacity-50" disabled={disabled}>
        {disabled ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  )
}

function AnnouncementForm({ announcement, disabled, setAnnouncement, onSubmit }) {
  return (
    <form
      className="rounded-lg bg-white p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <h2 className="text-xl font-black">Add Announcement</h2>
      <input className="mt-4 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Title" value={announcement.title} onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })} />
      <textarea className="mt-3 min-h-32 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Body" value={announcement.body} onChange={(e) => setAnnouncement({ ...announcement, body: e.target.value })} />
      <button className="mt-3 rounded-full bg-red-700 px-5 py-3 font-black text-white disabled:opacity-50" disabled={disabled}>
        {disabled ? 'Publishing...' : 'Publish'}
      </button>
    </form>
  )
}

function GalleryForm({ disabled, gallery, setGallery, onSubmit }) {
  const preview = gallery.imageFile ? URL.createObjectURL(gallery.imageFile) : gallery.imageUrl

  return (
    <form
      className="rounded-lg bg-white p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <h2 className="text-xl font-black">Add Gallery Item</h2>
      <input className="mt-4 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Title" value={gallery.title} onChange={(e) => setGallery({ ...gallery, title: e.target.value })} />
      {preview ? <img src={preview} alt="" className="mt-3 h-36 w-full rounded-md object-cover" /> : null}
      <input
        className="mt-3 w-full rounded-md border border-orange-200 px-3 py-3"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => setGallery({ ...gallery, imageFile: e.target.files?.[0] || null })}
      />
      <input className="mt-3 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Or paste image URL" value={gallery.imageUrl} onChange={(e) => setGallery({ ...gallery, imageUrl: e.target.value })} />
      <textarea className="mt-3 min-h-24 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Story" value={gallery.story} onChange={(e) => setGallery({ ...gallery, story: e.target.value })} />
      <button className="mt-3 rounded-full bg-red-700 px-5 py-3 font-black text-white disabled:opacity-50" disabled={disabled}>
        {disabled ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}

function OfflineDonationForm({ disabled, donation, setDonation, onSubmit }) {
  return (
    <form
      className="rounded-lg bg-white p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <h2 className="text-xl font-black">Add Offline Donation</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input className="rounded-md border border-orange-200 px-3 py-3" placeholder="Donor name" value={donation.name} onChange={(e) => setDonation({ ...donation, name: e.target.value })} required />
        <input className="rounded-md border border-orange-200 px-3 py-3" placeholder="Phone" value={donation.phone} onChange={(e) => setDonation({ ...donation, phone: e.target.value })} required />
        <input className="rounded-md border border-orange-200 px-3 py-3" placeholder="Email" value={donation.email} onChange={(e) => setDonation({ ...donation, email: e.target.value })} />
        <input className="rounded-md border border-orange-200 px-3 py-3" placeholder="PAN" value={donation.pan} onChange={(e) => setDonation({ ...donation, pan: e.target.value })} />
        <input className="rounded-md border border-orange-200 px-3 py-3" placeholder="Amount" type="number" min="1" value={donation.amount} onChange={(e) => setDonation({ ...donation, amount: e.target.value })} required />
        <select className="rounded-md border border-orange-200 px-3 py-3" value={donation.paymentMode} onChange={(e) => setDonation({ ...donation, paymentMode: e.target.value })}>
          <option value="upi">UPI</option>
          <option value="bank">Bank</option>
          <option value="cash">Cash</option>
          <option value="cheque">Cheque</option>
          <option value="other">Other</option>
        </select>
      </div>
      <input className="mt-3 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Purpose" value={donation.purpose} onChange={(e) => setDonation({ ...donation, purpose: e.target.value })} />
      <input className="mt-3 w-full rounded-md border border-orange-200 px-3 py-3" placeholder="Payment reference / note" value={donation.paymentReference} onChange={(e) => setDonation({ ...donation, paymentReference: e.target.value })} />
      <button className="mt-3 rounded-full bg-red-700 px-5 py-3 font-black text-white disabled:opacity-50" disabled={disabled}>
        {disabled ? 'Saving...' : 'Save Donation'}
      </button>
    </form>
  )
}

function AnnouncementList({ disabled, editingAnnouncement, items, onCancelEdit, onDelete, onEdit, onSave, setEditingAnnouncement }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Announcements</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <AnnouncementCard
            editingAnnouncement={editingAnnouncement}
            disabled={disabled}
            item={item}
            key={item._id}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
            onEdit={onEdit}
            onSave={onSave}
            setEditingAnnouncement={setEditingAnnouncement}
          />
        ))}
        {items.length === 0 ? <p className="text-stone-600">No announcements yet.</p> : null}
      </div>
    </div>
  )
}

function AnnouncementCard({ disabled, editingAnnouncement, item, onCancelEdit, onDelete, onEdit, onSave, setEditingAnnouncement }) {
  const isEditing = editingAnnouncement?._id === item._id

  if (isEditing) {
    return (
      <form
        className="rounded-lg bg-orange-50 p-3"
        onSubmit={(event) => {
          event.preventDefault()
          onSave(item._id, editingAnnouncement)
        }}
      >
        <input className="w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Title" value={editingAnnouncement.title} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })} />
        <input className="mt-2 w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Category" value={editingAnnouncement.category} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, category: e.target.value })} />
        <textarea className="mt-2 min-h-24 w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Body" value={editingAnnouncement.body} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, body: e.target.value })} />
        <label className="mt-2 flex items-center gap-2 text-sm font-bold text-stone-700">
          <input type="checkbox" checked={editingAnnouncement.isPinned} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, isPinned: e.target.checked })} />
          Pin announcement
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="submit" className="rounded-full bg-red-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50" disabled={disabled}>
            {disabled ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={onCancelEdit} className="rounded-full bg-white px-4 py-2 text-sm font-black text-stone-700 disabled:opacity-50" disabled={disabled}>
            Cancel
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="rounded-lg bg-orange-50 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-red-700">{item.category || 'Update'}</span>
            {item.isPinned ? <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-red-950">Pinned</span> : null}
          </div>
          <p className="mt-2 font-black">{item.title}</p>
          <p className="mt-1 line-clamp-3 text-sm text-stone-600">{item.body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <button type="button" onClick={() => onEdit(item)} className="rounded-full bg-white px-3 py-2 text-sm font-black text-stone-800 disabled:opacity-50" disabled={disabled}>
            Edit
          </button>
          <button type="button" onClick={() => onDelete(item._id)} className="rounded-full bg-white px-3 py-2 text-sm font-black text-red-700 disabled:opacity-50" disabled={disabled}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductList({ disabled, editingProduct, items, onCancelEdit, onDelete, onEdit, onSave, setEditingProduct }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Products</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <ProductCard
            editingProduct={editingProduct}
            disabled={disabled}
            item={item}
            key={item._id}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
            onEdit={onEdit}
            onSave={onSave}
            setEditingProduct={setEditingProduct}
          />
        ))}
        {items.length === 0 ? <p className="text-stone-600">No database products yet. The shop is using fallback products.</p> : null}
      </div>
    </div>
  )
}

function ProductCard({ disabled, editingProduct, item, onCancelEdit, onDelete, onEdit, onSave, setEditingProduct }) {
  const isEditing = editingProduct?._id === item._id

  if (isEditing) {
    const preview = editingProduct.imageFile ? URL.createObjectURL(editingProduct.imageFile) : editingProduct.image

    return (
      <form
        className="rounded-lg bg-orange-50 p-3"
        onSubmit={(event) => {
          event.preventDefault()
          onSave(item._id, editingProduct)
        }}
      >
        {preview ? <img src={preview} alt="" className="h-36 w-full rounded-md object-cover" /> : null}
        <input className="mt-3 w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Product name" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <input className="rounded-md border border-orange-200 px-3 py-2" placeholder="Price" type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} />
          <input className="rounded-md border border-orange-200 px-3 py-2" placeholder="Stock" type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })} />
        </div>
        <input
          className="mt-2 w-full rounded-md border border-orange-200 px-3 py-2"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setEditingProduct({ ...editingProduct, imageFile: e.target.files?.[0] || null })}
        />
        <input className="mt-2 w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Or paste image URL" value={editingProduct.image} onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })} />
        <input className="mt-2 w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Sizes comma separated" value={editingProduct.sizes} onChange={(e) => setEditingProduct({ ...editingProduct, sizes: e.target.value })} />
        <textarea className="mt-2 min-h-24 w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Description" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} />
        <label className="mt-2 flex items-center gap-2 text-sm font-bold text-stone-700">
          <input type="checkbox" checked={editingProduct.isActive} onChange={(e) => setEditingProduct({ ...editingProduct, isActive: e.target.checked })} />
          Active in shop
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="submit" className="rounded-full bg-red-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50" disabled={disabled}>
            {disabled ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={onCancelEdit} className="rounded-full bg-white px-4 py-2 text-sm font-black text-stone-700 disabled:opacity-50" disabled={disabled}>
            Cancel
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="flex gap-3 rounded-lg bg-orange-50 p-3">
      <img src={item.image} alt="" className="size-20 rounded-md object-cover" />
      <div className="min-w-0 flex-1">
        <p className="font-black">{item.name}</p>
        <p className="text-sm text-stone-600">{money(item.price)} / Stock {item.stock ?? 0}</p>
        <p className="text-xs font-bold uppercase tracking-widest text-red-700">{item.isActive ? 'Active' : 'Inactive'}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <button type="button" onClick={() => onEdit(item)} className="h-fit rounded-full bg-white px-3 py-2 text-sm font-black text-stone-800 disabled:opacity-50" disabled={disabled}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(item._id)} className="h-fit rounded-full bg-white px-3 py-2 text-sm font-black text-red-700 disabled:opacity-50" disabled={disabled}>
          Delete
        </button>
      </div>
    </div>
  )
}

function GalleryList({ disabled, editingGallery, items, onCancelEdit, onDelete, onEdit, onSave, setEditingGallery }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Gallery</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <GalleryCard
            editingGallery={editingGallery}
            disabled={disabled}
            item={item}
            key={item._id}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
            onEdit={onEdit}
            onSave={onSave}
            setEditingGallery={setEditingGallery}
          />
        ))}
        {items.length === 0 ? <p className="text-stone-600">No gallery items yet.</p> : null}
      </div>
    </div>
  )
}

function GalleryCard({ disabled, editingGallery, item, onCancelEdit, onDelete, onEdit, onSave, setEditingGallery }) {
  const isEditing = editingGallery?._id === item._id

  if (isEditing) {
    const preview = editingGallery.imageFile ? URL.createObjectURL(editingGallery.imageFile) : editingGallery.imageUrl

    return (
      <form
        className="rounded-lg bg-orange-50 p-3"
        onSubmit={(event) => {
          event.preventDefault()
          onSave(item._id, editingGallery)
        }}
      >
        {preview ? <img src={preview} alt="" className="h-36 w-full rounded-md object-cover" /> : null}
        <input className="mt-3 w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Title" value={editingGallery.title} onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })} />
        <input className="mt-2 w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Year" type="number" value={editingGallery.year} onChange={(e) => setEditingGallery({ ...editingGallery, year: e.target.value })} />
        <input
          className="mt-2 w-full rounded-md border border-orange-200 px-3 py-2"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setEditingGallery({ ...editingGallery, imageFile: e.target.files?.[0] || null })}
        />
        <input className="mt-2 w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Or paste image URL" value={editingGallery.imageUrl} onChange={(e) => setEditingGallery({ ...editingGallery, imageUrl: e.target.value })} />
        <textarea className="mt-2 min-h-24 w-full rounded-md border border-orange-200 px-3 py-2" placeholder="Story" value={editingGallery.story} onChange={(e) => setEditingGallery({ ...editingGallery, story: e.target.value })} />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="submit" className="rounded-full bg-red-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50" disabled={disabled}>
            {disabled ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={onCancelEdit} className="rounded-full bg-white px-4 py-2 text-sm font-black text-stone-700 disabled:opacity-50" disabled={disabled}>
            Cancel
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="flex gap-3 rounded-lg bg-orange-50 p-3">
      <img src={item.imageUrl} alt="" className="size-20 rounded-md object-cover" />
      <div className="min-w-0 flex-1">
        <p className="font-black">{item.title}</p>
        <p className="text-sm text-stone-600">{item.year}</p>
        <p className="line-clamp-2 text-sm text-stone-600">{item.story || 'No story added'}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <button type="button" onClick={() => onEdit(item)} className="h-fit rounded-full bg-white px-3 py-2 text-sm font-black text-stone-800 disabled:opacity-50" disabled={disabled}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(item._id)} className="h-fit rounded-full bg-white px-3 py-2 text-sm font-black text-red-700 disabled:opacity-50" disabled={disabled}>
          Delete
        </button>
      </div>
    </div>
  )
}

function UserList({ items }) {
  return (
    <div>
      <h3 className="font-black text-red-800">Users</h3>
      <div className="mt-3 space-y-2">
        {items.length === 0 ? <p className="text-sm text-stone-600">No users yet.</p> : null}
        {items.map((item) => (
          <div key={item._id} className="rounded-md bg-orange-50 p-3 text-sm">
            <p className="font-black">{item.name}</p>
            <p>{item.phone} / {item.email || 'No email'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderManagement({ items, onStatusChange }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Orders</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? <p className="text-sm text-stone-600">No orders yet.</p> : null}
        {items.map((item) => (
          <div key={item._id} className="rounded-lg bg-orange-50 p-4 text-sm">
            <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_auto] lg:items-start">
              <div>
                <p className="font-black text-stone-950">{item.customer?.name}</p>
                <p className="text-sm font-black text-red-700">{item.receiptNumber || 'Receipt pending'}</p>
                <p className="text-stone-600">{item.customer?.phone} / {item.customer?.email || 'No email'}</p>
                <p className="text-stone-600">{item.customer?.address || 'No address'}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-red-700">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="font-black">{money(item.amount)}</p>
                <ul className="mt-2 space-y-1 text-stone-700">
                  {(item.items || []).map((line, index) => (
                    <li key={`${item._id}-${index}`}>
                      {line.name} x {line.quantity} {line.size ? `/ ${line.size}` : ''}
                    </li>
                  ))}
                </ul>
                {item.receiptUrl ? (
                  <a className="mt-2 inline-block font-black text-red-700" href={item.receiptUrl} target="_blank" rel="noreferrer">
                    Receipt
                  </a>
                ) : (
                  <p className="mt-2 text-stone-500">No receipt yet</p>
                )}
              </div>
              <select
                className="rounded-md border border-orange-200 bg-white px-3 py-2 font-bold text-stone-800"
                value={item.status}
                onChange={(event) => onStatusChange(item._id, event.target.value)}
              >
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonationManagement({ items }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Donations</h2>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {items.length === 0 ? <p className="text-sm text-stone-600">No donations yet.</p> : null}
        {items.map((item) => (
          <div key={item._id} className="rounded-lg bg-orange-50 p-4 text-sm">
            <p className="font-black text-stone-950">{item.donor?.name}</p>
            <p className="text-sm font-black text-red-700">{item.receiptNumber || 'Receipt pending'}</p>
            <p className="text-stone-600">{item.donor?.phone} / {item.donor?.email || 'No email'}</p>
            <p className="mt-2 font-black">{money(item.amount)} / {item.status}</p>
            <p className="mt-1 text-stone-600">{item.paymentMode || 'razorpay'}{item.paymentReference ? ` / ${item.paymentReference}` : ''}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-red-700">{new Date(item.createdAt).toLocaleString()}</p>
            {item.receiptUrl ? (
              <a className="mt-2 inline-block font-black text-red-700" href={item.receiptUrl} target="_blank" rel="noreferrer">
                Receipt
              </a>
            ) : (
              <p className="mt-2 text-stone-500">No receipt yet</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function AuditLogList({ items }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Audit Logs</h2>
      <div className="mt-4 space-y-2">
        {items.length === 0 ? <p className="text-sm text-stone-600">No audit logs yet.</p> : null}
        {items.map((item) => (
          <div key={item._id} className="rounded-lg bg-orange-50 p-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-red-700">{item.action}</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-stone-600">{item.entity}</span>
            </div>
            <p className="mt-2 font-bold text-stone-950">{item.message || 'Action recorded'}</p>
            <p className="text-stone-600">{item.actor || 'system'} / {new Date(item.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
