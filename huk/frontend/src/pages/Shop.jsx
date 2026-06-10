import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { api } from '../api/client'
import { openRazorpayCheckout } from '../api/razorpay'
import { useLanguage } from '../i18n/useLanguage'
import useCartStore from '../store/cartStore'
import { money } from '../utils/format'

const shopText = {
  en: {
    eyebrow: 'Official Store',
    title: 'Festival Merchandise',
    subtitle: 'Official Hukmill Lane Cha Raja merchandise for devotees and volunteers.',
    checkout: 'Checkout',
    items: 'items',
  },
  mr: {
    eyebrow: 'अधिकृत दुकान',
    title: 'उत्सव वस्तू',
    subtitle: 'भक्त आणि स्वयंसेवकांसाठी हुकमिल लेन चा राजा अधिकृत वस्तू.',
    checkout: 'चेकआउट',
    items: 'वस्तू',
  },
}

function Shop() {
  const queryClient = useQueryClient()
  const { t, language } = useLanguage()
  const ui = shopText[language] || shopText.en
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await api.get('/products')).data,
  })
  const { items, addItem, removeItem, setQuantity, clear, total } = useCartStore()
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '', address: '' })
  const [status, setStatus] = useState('')

  async function checkout(event) {
    event.preventDefault()
    try {
      setStatus(t('creatingPayment'))
      const { data } = await api.post('/orders', { customer, items })
      const payment = await openRazorpayCheckout({
        key: data.razorpayKeyId,
        amount: data.razorpayOrder.amount,
        name: t('mandalAddressTitle'),
        orderId: data.razorpayOrder.id,
        description: t('shopOrder'),
        prefill: customer,
      })
      const verified = await api.post('/orders/verify', {
        orderId: data.order._id,
        razorpayOrderId: payment.razorpay_order_id,
        razorpayPaymentId: payment.razorpay_payment_id,
        razorpaySignature: payment.razorpay_signature,
      })
      clear()
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setStatus(`${t('paymentSuccessful')} ${verified.data.order.receiptNumber || ''} ${t('receipt')}: ${verified.data.order.receiptUrl}`)
    } catch (error) {
      setStatus(error.response?.data?.message || error.message || t('paymentFailed'))
    }
  }

  return (
    <main className="bg-[#fff8ea] px-4 py-10 text-stone-950 sm:px-6 lg:py-14">
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#e7c579]/60 bg-[#fffaf0] px-5 py-12 text-center shadow-[0_28px_90px_rgba(93,25,0,.10)] sm:px-8 lg:py-16"
      >
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb72e]/20 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-black uppercase tracking-[0.34em] text-[#b91111]">{ui.eyebrow}</p>
          <h1 className="mt-4 font-serif text-5xl font-black leading-none text-[#9f1111] sm:text-7xl">{ui.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-stone-700">
            {ui.subtitle}
          </p>
        </div>
      </motion.section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-7 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]">
        <div className="grid gap-6 sm:grid-cols-2">
          {products.map((product, index) => (
            <ProductCard key={product._id || product.id} product={product} onAdd={addItem} index={index} />
          ))}
        </div>

        <aside className="h-fit rounded-[1.25rem] border border-[#e7c579]/70 bg-white/90 p-4 shadow-[0_24px_80px_rgba(93,25,0,.14)] backdrop-blur sm:p-5 lg:sticky lg:top-36">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b91111]">{ui.checkout}</p>
              <h2 className="mt-1 font-serif text-3xl font-black text-[#9f1111]">{t('cart')}</h2>
            </div>
            <span className="rounded-full bg-[#fff1d6] px-3 py-1 text-sm font-black text-[#8d0909]">{items.length} {ui.items}</span>
          </div>

          <div className="mt-5 space-y-3">
            {items.length === 0 ? <p className="rounded-2xl bg-[#fff7e8] p-4 text-stone-600">{t('cartEmpty')}</p> : null}
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="grid min-w-0 gap-3 rounded-2xl bg-[#fff7e8] p-3 sm:grid-cols-[70px_1fr_auto]">
                <img src={item.image} alt="" className="size-17.5 rounded-xl object-cover shadow-sm" />
                <div className="min-w-0 flex-1">
                  <p className="wrap-break-word font-black text-stone-950">{item.name}</p>
                  <p className="text-sm font-bold text-[#8d0909]">{item.size}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <input
                      className="w-16 rounded-full border border-[#e7c579] bg-white px-3 py-1 font-bold"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.productId, item.size, Number(e.target.value))}
                    />
                    {Number.isFinite(item.stock) ? <span className="text-xs font-bold text-stone-500">{t('max')} {item.stock}</span> : null}
                    <button className="rounded-full bg-white px-3 py-1 text-sm font-black text-red-700 shadow-sm" onClick={() => removeItem(item.productId, item.size)}>
                      {t('remove')}
                    </button>
                  </div>
                </div>
                <p className="font-black text-[#9f1111] sm:text-right">{money(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <form className="mt-5 space-y-3" onSubmit={checkout}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {['name', 'phone', 'email', 'address'].map((field) => (
                <input
                  key={field}
                  className={`focus-ring w-full rounded-2xl border border-[#e7c579] bg-[#fffdf7] px-4 py-3 shadow-inner ${field === 'address' ? 'sm:col-span-2 lg:col-span-1 xl:col-span-2' : ''}`}
                  placeholder={
                    field === 'address'
                      ? t('deliveryAddress')
                      : field === 'name'
                        ? t('name')
                        : field === 'phone'
                          ? t('customerPhone')
                          : t('customerEmail')
                  }
                  value={customer[field]}
                  required={field === 'name' || field === 'phone'}
                  onChange={(e) => setCustomer({ ...customer, [field]: e.target.value })}
                />
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-[#e7c579]/70 pt-4 text-2xl font-black">
              <span>{t('total')}</span>
              <span className="text-[#9f1111]">{money(total())}</span>
            </div>
            <button
              className="w-full rounded-full bg-[#b91111] px-5 py-4 font-black text-white shadow-xl shadow-red-950/15 transition hover:-translate-y-0.5 hover:bg-[#8f0d0d] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!items.length}
            >
              {status === t('creatingPayment') ? t('creatingPayment') : t('paySecurely')}
            </button>
          </form>
          {status ? <p className="mt-4 wrap-break-word rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-800">{status}</p> : null}
        </aside>
      </section>
    </main>
  )
}

function ProductCard({ product, onAdd, index }) {
  const { t, tObject } = useLanguage()
  const productNames = tObject('productNames')
  const productDescriptions = tObject('productDescriptions')
  const displayName = productNames[product._id] || product.name
  const displayDescription = productDescriptions[product._id] || product.description
  const sizes = product.sizes?.length ? product.sizes : [t('standard')]
  const stock = product.stock
  const hasStockLimit = typeof stock === 'number'
  const available = !hasStockLimit || stock > 0
  const [size, setSize] = useState(sizes[0])
  const [quantity, setQuantity] = useState(1)

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group min-w-0 overflow-hidden rounded-[1.25rem] border border-[#e7c579]/70 bg-white shadow-[0_20px_70px_rgba(93,25,0,.10)]"
    >
      <div className="relative overflow-hidden bg-[#fff1d6]">
        <img src={product.image} alt={displayName} className="h-60 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-72" />
        <span className="absolute right-4 top-4 rounded-full bg-[#fff8ea] px-4 py-2 text-lg font-black text-[#9f1111] shadow-lg">{money(product.price)}</span>
        <span className="absolute left-4 top-4 rounded-full bg-[#b91111] px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
          {hasStockLimit ? `${stock} ${t('inStock')}` : t('available')}
        </span>
      </div>
      <div className="p-5">
        <h3 className="wrap-break-word font-serif text-3xl font-black leading-tight text-[#9f1111]">{displayName}</h3>
        <p className="mt-3 wrap-break-word leading-7 text-stone-700">{displayDescription}</p>

        <div className="mt-5">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">{t('size')}</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSize(item)}
                className={`rounded-full px-4 py-2 text-sm font-black transition ${size === item ? 'bg-[#b91111] text-white' : 'bg-[#fff1d6] text-[#8d0909] hover:bg-[#ffe4ad]'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-end gap-4">
          <label className="block max-w-32">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-stone-500">{t('qty')}</span>
            <input
              className="mt-2 w-full rounded-full border border-[#e7c579] bg-[#fffdf7] px-4 py-3 font-black"
              type="number"
              min="1"
              max={hasStockLimit ? stock : undefined}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(hasStockLimit ? stock : 9999, Math.max(1, Number(e.target.value))))}
            />
          </label>
          <button
            onClick={() => onAdd({ ...product, name: displayName, description: displayDescription }, size, quantity)}
            className="flex-1 rounded-full bg-[#b91111] px-4 py-3 font-black text-white shadow-lg shadow-red-950/15 transition hover:-translate-y-0.5 hover:bg-[#8f0d0d] disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={!available}
          >
            {available ? t('addToCart') : t('outOfStock')}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default Shop

