import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { api, downloadAdminExport } from '../api/client'
import { useLanguage } from '../i18n/useLanguage'
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
const orderStatuses = ['paid', 'processing', 'ready', 'delivered', 'cancelled', 'failed']

const adminText = {
  en: {
    dashboardTitle: 'Mandal Dashboard',
    secureAccess: 'Secure Access',
  },
  mr: {
    dashboardTitle: 'मंडळ डॅशबोर्ड',
    secureAccess: 'सुरक्षित प्रवेश',
  },
}

function filterItems(items, query) {
  const value = query.trim().toLowerCase()
  if (!value) return items
  return items.filter((item) => JSON.stringify(item).toLowerCase().includes(value))
}

function AdminDashboard() {
  const queryClient = useQueryClient()
  const { t, language } = useLanguage()
  const ui = adminText[language] || adminText.en
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '')
  const [login, setLogin] = useState({ email: 'admin@mandal.com', password: '' })
  const [gallery, setGallery] = useState(emptyGallery)
  const [editingGallery, setEditingGallery] = useState(null)
  const [product, setProduct] = useState(emptyProduct)
  const [editingProduct, setEditingProduct] = useState(null)
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
      setMessage(t('sessionExpired'))
      queryClient.removeQueries({ queryKey: ['admin-dashboard'] })
    }

    window.addEventListener('admin-session-expired', handleExpired)
    return () => window.removeEventListener('admin-session-expired', handleExpired)
  }, [queryClient, t])

  const loginMutation = useMutation({
    mutationFn: async () => (await api.post('/auth/admin/login', login)).data,
    onSuccess: (data) => {
      localStorage.setItem('adminToken', data.token)
      setAdminToken(data.token)
      setMessage(t('adminLoginSuccessful'))
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || t('loginFailed')),
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
      setMessage(t('galleryAdded'))
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || t('gallerySaveFailed')),
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
      setMessage(t('productAdded'))
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || t('productSaveFailed')),
  })

  const deleteProductMutation = useMutation({
    mutationFn: async (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      setMessage(t('productDeleted'))
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
      setMessage(t('productUpdated'))
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || t('productUpdateFailed')),
  })

  const deleteGalleryMutation = useMutation({
    mutationFn: async (id) => api.delete(`/gallery/${id}`),
    onSuccess: () => {
      setMessage(t('galleryDeleted'))
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || t('galleryDeleteFailed')),
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
      setMessage(t('galleryUpdated'))
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['gallery'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || t('galleryUpdateFailed')),
  })

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => (await api.put(`/orders/${id}/status`, { status })).data,
    onSuccess: () => {
      setMessage(t('orderStatusUpdated'))
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || t('orderStatusUpdateFailed')),
  })

  function exportExcel() {
    downloadAdminExport()
  }

  function logout() {
    localStorage.removeItem('adminToken')
    setAdminToken('')
    setMessage(t('loggedOut'))
    queryClient.removeQueries({ queryKey: ['admin-dashboard'] })
  }

  function confirmDelete(label, action) {
    if (window.confirm(`${t('confirmDeletePrefix')} ${label}? ${t('confirmDeleteSuffix')}`)) action()
  }

  const isBusy =
    galleryMutation.isPending ||
    updateGalleryMutation.isPending ||
    deleteGalleryMutation.isPending ||
    productMutation.isPending ||
    updateProductMutation.isPending ||
    deleteProductMutation.isPending ||
    updateOrderStatusMutation.isPending

  return (
    <main className="bg-[#fff8ea] px-4 py-10 text-stone-950 sm:px-6 lg:py-14">
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#e7c579]/60 bg-linear-to-br from-[#fffaf0] via-[#fff1da] to-[#ffe8bf] px-5 py-10 shadow-[0_28px_90px_rgba(93,25,0,.10)] sm:px-8">
        <div className="absolute right-12 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#ffb72e]/20 blur-3xl" />
        <div className="relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-[#b91111]">{t('adminEyebrow')}</p>
            <h1 className="mt-3 font-serif text-5xl font-black leading-none text-[#9f1111] sm:text-7xl">{ui.dashboardTitle}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-700">{t('adminCopy')}</p>
          </div>
          {adminToken ? (
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <button className="rounded-full bg-[#b91111] px-5 py-3 font-black text-white shadow-lg shadow-red-950/15 disabled:opacity-50" type="button" onClick={exportExcel} disabled={!adminToken}>
                {t('exportExcel')}
              </button>
              <button className="rounded-full border border-[#9f1111]/25 bg-[#b91111] px-5 py-3 font-black text-white disabled:opacity-50" type="button" onClick={logout} disabled={!adminToken}>
                {t('logout')}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <div className="mx-auto mt-8 grid max-w-7xl gap-6 lg:grid-cols-[330px_minmax(0,1fr)] xl:grid-cols-[370px_minmax(0,1fr)]">
        <aside className="h-fit min-w-0 rounded-[1.25rem] border border-[#e7c579]/70 bg-white/90 p-5 shadow-[0_24px_80px_rgba(93,25,0,.12)] backdrop-blur lg:sticky lg:top-36">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#b91111]">{ui.secureAccess}</p>
          <h2 className="mt-2 wrap-break-word font-serif text-3xl font-black text-[#9f1111]">{t('adminLogin')}</h2>
          <form
            className="mt-5 space-y-3"
            onSubmit={(event) => {
              event.preventDefault()
              loginMutation.mutate()
            }}
          >
            <input className="w-full min-w-0 rounded-2xl border border-[#e7c579] bg-[#fffdf7] px-4 py-3" placeholder={t('adminEmail')} value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />
            <input className="w-full min-w-0 rounded-2xl border border-[#e7c579] bg-[#fffdf7] px-4 py-3" placeholder={t('adminPassword')} type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
            <button className="w-full rounded-full bg-[#b91111] px-4 py-3 font-black text-white shadow-lg shadow-red-950/15">{loginMutation.isPending ? t('saving') : t('login')}</button>
          </form>
          <button className="mt-3 w-full rounded-full bg-[#b91111] px-4 py-3 font-black text-amber-100 disabled:opacity-50" type="button" onClick={exportExcel} disabled={!adminToken}>
            {t('exportExcel')}
          </button>
          <button className="mt-3 w-full rounded-full border border-[#9f1111]/25 bg-[#b91111] px-4 py-3 font-black text-white disabled:opacity-50" type="button" onClick={logout} disabled={!adminToken}>
            {t('logout')}
          </button>
          {message ? <p className="mt-4 wrap-break-word rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-800">{message}</p> : null}
        </aside>

        {adminToken ? (
        <div className="min-w-0 space-y-6">
          <input
            className="w-full min-w-0 rounded-2xl border border-[#e7c579]/80 bg-white px-5 py-4 shadow-[0_16px_45px_rgba(93,25,0,.08)]"
            placeholder={t('searchAdmin')}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              ['users', dashboard.data?.stats?.users ?? 0],
              ['orders', dashboard.data?.stats?.orders ?? 0],
              ['products', dashboard.data?.stats?.products ?? 0],
            ].map(([key, value]) => (
              <div key={key} className="min-w-0 rounded-[1.1rem] border border-[#e7c579]/50 bg-white p-4 shadow-[0_16px_45px_rgba(93,25,0,.08)] sm:p-5">
                <p className="wrap-break-word text-xs font-black uppercase tracking-[0.14em] text-[#b91111] sm:text-sm sm:tracking-[0.2em]">{t(key)}</p>
                <p className="mt-2 font-serif text-4xl font-black text-[#9f1111]">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <ProductForm disabled={productMutation.isPending} product={product} setProduct={setProduct} onSubmit={() => productMutation.mutate()} />
            <GalleryForm disabled={galleryMutation.isPending} gallery={gallery} setGallery={setGallery} onSubmit={() => galleryMutation.mutate()} />
          </div>

          <ProductList
            editingProduct={editingProduct}
            items={filterItems(dashboard.data?.products || [], search)}
            onCancelEdit={() => setEditingProduct(null)}
            disabled={isBusy}
            onDelete={(id) => confirmDelete(t('thisProduct'), () => deleteProductMutation.mutate(id))}
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
            onDelete={(id) => confirmDelete(t('thisGalleryItem'), () => deleteGalleryMutation.mutate(id))}
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

          <div className="min-w-0 rounded-[1.1rem] border border-[#e7c579]/50 bg-white p-4 shadow-[0_16px_45px_rgba(93,25,0,.08)] sm:p-5">
            <h2 className="wrap-break-word font-serif text-2xl font-black text-[#9f1111]">{t('recentUsers')}</h2>
            <div className="mt-4">
              <UserList items={filterItems(dashboard.data?.recentUsers || [], search)} />
            </div>
          </div>

          <OrderManagement
            items={filterItems(dashboard.data?.recentOrders || [], search)}
            onStatusChange={(id, status) => updateOrderStatusMutation.mutate({ id, status })}
          />
          <AuditLogList items={filterItems(dashboard.data?.auditLogs || [], search)} />
        </div>
        ) : (
          <div className="min-w-0 rounded-[1.25rem] border border-[#e7c579]/70 bg-white p-6 shadow-[0_24px_80px_rgba(93,25,0,.12)] sm:p-8">
            <h2 className="wrap-break-word font-serif text-4xl font-black text-[#9f1111]">{t('loginRequired')}</h2>
            <p className="mt-2 text-stone-700">{t('loginRequiredCopy')}</p>
          </div>
        )}
      </div>
    </main>
  )
}

function ProductForm({ disabled, product, setProduct, onSubmit }) {
  const { t } = useLanguage()
  const preview = product.imageFile ? URL.createObjectURL(product.imageFile) : product.image

  return (
    <form
      className="min-w-0 rounded-[1.1rem] border border-[#e7c579]/50 bg-white p-4 shadow-[0_16px_45px_rgba(93,25,0,.08)] sm:p-5"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <h2 className="wrap-break-word text-xl font-black">{t('addProduct')}</h2>
      <input className="mt-4 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3" placeholder={t('productName')} value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input className="min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3" placeholder={t('price')} type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
        <input className="min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3" placeholder={t('stock')} type="number" value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} />
      </div>
      {preview ? <img src={preview} alt="" className="mt-3 h-36 w-full rounded-md object-cover" /> : null}
      <input
        className="mt-3 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => setProduct({ ...product, imageFile: e.target.files?.[0] || null })}
      />
      <input className="mt-3 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3" placeholder={t('imageUrl')} value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} />
      <input className="mt-3 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3" placeholder={t('sizesCsv')} value={product.sizes} onChange={(e) => setProduct({ ...product, sizes: e.target.value })} />
      <textarea className="mt-3 min-h-24 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3" placeholder={t('description')} value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
      <label className="mt-3 flex items-center gap-2 text-sm font-bold text-stone-700">
        <input type="checkbox" checked={product.isActive} onChange={(e) => setProduct({ ...product, isActive: e.target.checked })} />
        {t('activeInShop')}
      </label>
      <button className="mt-3 rounded-full bg-[#b91111] px-5 py-3 font-black text-white disabled:opacity-50" disabled={disabled}>
        {disabled ? t('adding') : t('addProduct')}
      </button>
    </form>
  )
}

function GalleryForm({ disabled, gallery, setGallery, onSubmit }) {
  const { t } = useLanguage()
  const preview = gallery.imageFile ? URL.createObjectURL(gallery.imageFile) : gallery.imageUrl

  return (
    <form
      className="min-w-0 rounded-[1.1rem] border border-[#e7c579]/50 bg-white p-4 shadow-[0_16px_45px_rgba(93,25,0,.08)] sm:p-5"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <h2 className="wrap-break-word text-xl font-black">{t('addGalleryItem')}</h2>
      <input className="mt-4 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3" placeholder={t('title')} value={gallery.title} onChange={(e) => setGallery({ ...gallery, title: e.target.value })} />
      {preview ? <img src={preview} alt="" className="mt-3 h-36 w-full rounded-md object-cover" /> : null}
      <input
        className="mt-3 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => setGallery({ ...gallery, imageFile: e.target.files?.[0] || null })}
      />
      <input className="mt-3 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3" placeholder={t('imageUrl')} value={gallery.imageUrl} onChange={(e) => setGallery({ ...gallery, imageUrl: e.target.value })} />
      <textarea className="mt-3 min-h-24 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-3" placeholder={t('story')} value={gallery.story} onChange={(e) => setGallery({ ...gallery, story: e.target.value })} />
      <button className="mt-3 rounded-full bg-[#b91111] px-5 py-3 font-black text-white disabled:opacity-50" disabled={disabled}>
        {disabled ? t('adding') : t('addGalleryItem')}
      </button>
    </form>
  )
}

function ProductList({ disabled, editingProduct, items, onCancelEdit, onDelete, onEdit, onSave, setEditingProduct }) {
  const { t } = useLanguage()
  return (
    <div className="min-w-0 rounded-[1.1rem] border border-[#e7c579]/50 bg-white p-4 shadow-[0_16px_45px_rgba(93,25,0,.08)] sm:p-5">
      <h2 className="wrap-break-word text-xl font-black">{t('products')}</h2>
      <div className="mt-4 grid gap-3 xl:grid-cols-2">
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
        {items.length === 0 ? <p className="text-stone-600">{t('noProducts')}</p> : null}
      </div>
    </div>
  )
}

function ProductCard({ disabled, editingProduct, item, onCancelEdit, onDelete, onEdit, onSave, setEditingProduct }) {
  const { t } = useLanguage()
  const isEditing = editingProduct?._id === item._id

  if (isEditing) {
    const preview = editingProduct.imageFile ? URL.createObjectURL(editingProduct.imageFile) : editingProduct.image

    return (
      <form
        className="min-w-0 rounded-2xl bg-[#fff7e8] p-3"
        onSubmit={(event) => {
          event.preventDefault()
          onSave(item._id, editingProduct)
        }}
      >
        {preview ? <img src={preview} alt="" className="h-36 w-full rounded-md object-cover" /> : null}
        <input className="mt-3 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2" placeholder={t('productName')} value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <input className="min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2" placeholder={t('price')} type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} />
          <input className="min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2" placeholder={t('stock')} type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })} />
        </div>
        <input
          className="mt-2 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setEditingProduct({ ...editingProduct, imageFile: e.target.files?.[0] || null })}
        />
        <input className="mt-2 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2" placeholder={t('imageUrl')} value={editingProduct.image} onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })} />
        <input className="mt-2 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2" placeholder={t('sizesComma')} value={editingProduct.sizes} onChange={(e) => setEditingProduct({ ...editingProduct, sizes: e.target.value })} />
        <textarea className="mt-2 min-h-24 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2" placeholder={t('description')} value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} />
        <label className="mt-2 flex items-center gap-2 text-sm font-bold text-stone-700">
          <input type="checkbox" checked={editingProduct.isActive} onChange={(e) => setEditingProduct({ ...editingProduct, isActive: e.target.checked })} />
          {t('activeInShop')}
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="submit" className="rounded-full bg-[#b91111] px-4 py-2 text-sm font-black text-white disabled:opacity-50" disabled={disabled}>
            {disabled ? t('saving') : t('save')}
          </button>
          <button type="button" onClick={onCancelEdit} className="rounded-full bg-white px-4 py-2 text-sm font-black text-stone-700 disabled:opacity-50" disabled={disabled}>
            {t('cancel')}
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="grid min-w-0 gap-3 rounded-2xl bg-[#fff7e8] p-3 sm:grid-cols-[80px_minmax(0,1fr)_auto]">
      <img src={item.image} alt="" className="size-20 rounded-md object-cover" />
      <div className="min-w-0 flex-1">
        <p className="wrap-break-word font-black">{item.name}</p>
        <p className="wrap-break-word text-sm text-stone-600">{money(item.price)} / {t('stock')} {item.stock ?? 0}</p>
        <p className="text-xs font-bold uppercase tracking-widest text-[#b91111]">{item.isActive ? t('active') : t('inactive')}</p>
      </div>
      <div className="flex flex-wrap gap-2 sm:flex-col">
        <button type="button" onClick={() => onEdit(item)} className="h-fit rounded-full bg-white px-3 py-2 text-sm font-black text-stone-800 disabled:opacity-50" disabled={disabled}>
          {t('edit')}
        </button>
        <button type="button" onClick={() => onDelete(item._id)} className="h-fit rounded-full bg-white px-3 py-2 text-sm font-black text-[#b91111] disabled:opacity-50" disabled={disabled}>
          {t('delete')}
        </button>
      </div>
    </div>
  )
}

function GalleryList({ disabled, editingGallery, items, onCancelEdit, onDelete, onEdit, onSave, setEditingGallery }) {
  const { t } = useLanguage()
  return (
    <div className="min-w-0 rounded-[1.1rem] border border-[#e7c579]/50 bg-white p-4 shadow-[0_16px_45px_rgba(93,25,0,.08)] sm:p-5">
      <h2 className="wrap-break-word text-xl font-black">{t('navGallery')}</h2>
      <div className="mt-4 grid gap-3 xl:grid-cols-2">
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
        {items.length === 0 ? <p className="text-stone-600">{t('noGallery')}</p> : null}
      </div>
    </div>
  )
}

function GalleryCard({ disabled, editingGallery, item, onCancelEdit, onDelete, onEdit, onSave, setEditingGallery }) {
  const { t } = useLanguage()
  const isEditing = editingGallery?._id === item._id

  if (isEditing) {
    const preview = editingGallery.imageFile ? URL.createObjectURL(editingGallery.imageFile) : editingGallery.imageUrl

    return (
      <form
        className="min-w-0 rounded-2xl bg-[#fff7e8] p-3"
        onSubmit={(event) => {
          event.preventDefault()
          onSave(item._id, editingGallery)
        }}
      >
        {preview ? <img src={preview} alt="" className="h-36 w-full rounded-md object-cover" /> : null}
        <input className="mt-3 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2" placeholder={t('title')} value={editingGallery.title} onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })} />
        <input className="mt-2 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2" placeholder={t('year')} type="number" value={editingGallery.year} onChange={(e) => setEditingGallery({ ...editingGallery, year: e.target.value })} />
        <input
          className="mt-2 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setEditingGallery({ ...editingGallery, imageFile: e.target.files?.[0] || null })}
        />
        <input className="mt-2 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2" placeholder={t('imageUrl')} value={editingGallery.imageUrl} onChange={(e) => setEditingGallery({ ...editingGallery, imageUrl: e.target.value })} />
        <textarea className="mt-2 min-h-24 w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2" placeholder={t('story')} value={editingGallery.story} onChange={(e) => setEditingGallery({ ...editingGallery, story: e.target.value })} />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="submit" className="rounded-full bg-[#b91111] px-4 py-2 text-sm font-black text-white disabled:opacity-50" disabled={disabled}>
            {disabled ? t('saving') : t('save')}
          </button>
          <button type="button" onClick={onCancelEdit} className="rounded-full bg-white px-4 py-2 text-sm font-black text-stone-700 disabled:opacity-50" disabled={disabled}>
            {t('cancel')}
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="grid min-w-0 gap-3 rounded-2xl bg-[#fff7e8] p-3 sm:grid-cols-[80px_minmax(0,1fr)_auto]">
      <img src={item.imageUrl} alt="" className="size-20 rounded-md object-cover" />
      <div className="min-w-0 flex-1">
        <p className="wrap-break-word font-black">{item.title}</p>
        <p className="text-sm text-stone-600">{item.year}</p>
        <p className="line-clamp-2 text-sm text-stone-600">{item.story || t('noStoryAdded')}</p>
      </div>
      <div className="flex flex-wrap gap-2 sm:flex-col">
        <button type="button" onClick={() => onEdit(item)} className="h-fit rounded-full bg-white px-3 py-2 text-sm font-black text-stone-800 disabled:opacity-50" disabled={disabled}>
          {t('edit')}
        </button>
        <button type="button" onClick={() => onDelete(item._id)} className="h-fit rounded-full bg-white px-3 py-2 text-sm font-black text-[#b91111] disabled:opacity-50" disabled={disabled}>
          {t('delete')}
        </button>
      </div>
    </div>
  )
}

function UserList({ items }) {
  const { t } = useLanguage()
  return (
    <div className="min-w-0">
      <h3 className="wrap-break-word font-black text-[#8d0909]">{t('users')}</h3>
      <div className="mt-3 space-y-2">
        {items.length === 0 ? <p className="text-sm text-stone-600">{t('noUsers')}</p> : null}
        {items.map((item) => (
          <div key={item._id} className="min-w-0 rounded-xl bg-[#fff7e8] p-3 text-sm">
            <p className="wrap-break-word font-black">{item.name}</p>
            <p className="wrap-break-word">{item.phone} / {item.email || t('noEmail')}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderManagement({ items, onStatusChange }) {
  const { t } = useLanguage()
  return (
    <div className="min-w-0 rounded-[1.1rem] border border-[#e7c579]/50 bg-white p-4 shadow-[0_16px_45px_rgba(93,25,0,.08)] sm:p-5">
      <h2 className="wrap-break-word text-xl font-black">{t('orders')}</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? <p className="text-sm text-stone-600">{t('noOrders')}</p> : null}
        {items.map((item) => (
          <div key={item._id} className="min-w-0 rounded-2xl bg-[#fff7e8] p-4 text-sm">
            <div className="grid gap-3 xl:grid-cols-[1.2fr_1fr_auto] xl:items-start">
              <div className="min-w-0">
                <p className="wrap-break-word font-black text-stone-950">{item.customer?.name}</p>
                <p className="text-sm font-black text-[#b91111]">{item.receiptNumber || t('receiptPending')}</p>
                <p className="wrap-break-word text-stone-600">{item.customer?.phone} / {item.customer?.email || t('noEmail')}</p>
                <p className="wrap-break-word text-stone-600">{item.customer?.address || t('noAddress')}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#b91111]">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <div className="min-w-0">
                <p className="font-black">{money(item.amount)}</p>
                <ul className="mt-2 space-y-1 wrap-break-word text-stone-700">
                  {(item.items || []).map((line, index) => (
                    <li key={`${item._id}-${index}`}>
                      {line.name} x {line.quantity} {line.size ? `/ ${line.size}` : ''}
                    </li>
                  ))}
                </ul>
                {item.receiptUrl ? (
                  <a className="mt-2 inline-block font-black text-[#b91111]" href={item.receiptUrl} target="_blank" rel="noreferrer">
                    {t('receipt')}
                  </a>
                ) : (
                  <p className="mt-2 text-stone-500">{t('noReceiptYet')}</p>
                )}
              </div>
              <select
                className="w-full min-w-0 rounded-xl border border-[#e7c579] bg-[#fffdf7] px-3 py-2 font-bold text-stone-800 xl:w-auto"
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

function AuditLogList({ items }) {
  const { t } = useLanguage()
  return (
    <div className="min-w-0 rounded-[1.1rem] border border-[#e7c579]/50 bg-white p-4 shadow-[0_16px_45px_rgba(93,25,0,.08)] sm:p-5">
      <h2 className="wrap-break-word text-xl font-black">{t('auditLogs')}</h2>
      <div className="mt-4 space-y-2">
        {items.length === 0 ? <p className="text-sm text-stone-600">{t('noAuditLogs')}</p> : null}
        {items.map((item) => (
          <div key={item._id} className="min-w-0 rounded-2xl bg-[#fff7e8] p-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-[#b91111]">{item.action}</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-stone-600">{item.entity}</span>
            </div>
            <p className="mt-2 wrap-break-word font-bold text-stone-950">{item.message || t('actionRecorded')}</p>
            <p className="wrap-break-word text-stone-600">{item.actor || t('system')} / {new Date(item.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard


