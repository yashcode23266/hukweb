import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../api/client'
import { openRazorpayCheckout } from '../api/razorpay'
import SectionTitle from '../components/SectionTitle'
import { useLanguage } from '../i18n/LanguageContext'
import useCartStore from '../store/cartStore'
import { money } from '../utils/format'

function Shop() {
  const queryClient = useQueryClient()
  const { t } = useLanguage()
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
      setStatus('Creating secure payment...')
      const { data } = await api.post('/orders', { customer, items })
      const payment = await openRazorpayCheckout({
        key: data.razorpayKeyId,
        amount: data.razorpayOrder.amount,
        name: 'Shree Ganpati Mandal',
        orderId: data.razorpayOrder.id,
        description: 'Shop order',
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
      setStatus(`Payment successful. ${verified.data.order.receiptNumber || ''} Receipt: ${verified.data.order.receiptUrl}`)
    } catch (error) {
      setStatus(error.response?.data?.message || error.message || 'Payment failed. Please try again.')
    }
  }

  return (
    <section className="px-4 py-12 sm:px-6">
      <SectionTitle eyebrow={t('shopEyebrow')} title={t('shopTitle')}>
        {t('shopCopy')}
      </SectionTitle>
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-5 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} onAdd={addItem} />
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-orange-200 bg-white p-5 shadow-lg">
          <h2 className="text-2xl font-black">{t('cart')}</h2>
          <div className="mt-4 space-y-3">
            {items.length === 0 ? <p className="text-stone-600">{t('cartEmpty')}</p> : null}
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-3 rounded-lg bg-orange-50 p-3">
                <img src={item.image} alt="" className="size-16 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-black">{item.name}</p>
                  <p className="text-sm text-stone-600">{item.size}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      className="w-16 rounded-md border border-orange-200 px-2 py-1"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.productId, item.size, Number(e.target.value))}
                    />
                    {Number.isFinite(item.stock) ? <span className="text-xs font-bold text-stone-500">Max {item.stock}</span> : null}
                    <button className="text-sm font-bold text-red-700" onClick={() => removeItem(item.productId, item.size)}>
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-black">{money(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <form className="mt-5 space-y-3" onSubmit={checkout}>
            {['name', 'phone', 'email', 'address'].map((field) => (
              <input
                key={field}
                className="focus-ring w-full rounded-md border border-orange-200 px-3 py-3"
                placeholder={field === 'address' ? 'Delivery address' : field[0].toUpperCase() + field.slice(1)}
                value={customer[field]}
                required={field === 'name' || field === 'phone'}
                onChange={(e) => setCustomer({ ...customer, [field]: e.target.value })}
              />
            ))}
            <div className="flex items-center justify-between border-t border-orange-100 pt-4 text-xl font-black">
              <span>{t('total')}</span>
              <span>{money(total())}</span>
            </div>
            <button
              className="w-full rounded-full bg-red-700 px-5 py-3 font-black text-white disabled:opacity-50"
              disabled={!items.length}
            >
              {t('paySecurely')}
            </button>
          </form>
          {status ? <p className="mt-4 break-words rounded-md bg-green-50 p-3 text-sm font-bold text-green-800">{status}</p> : null}
        </aside>
      </div>
    </section>
  )
}

function ProductCard({ product, onAdd }) {
  const { t } = useLanguage()
  const sizes = product.sizes?.length ? product.sizes : ['Standard']
  const stock = product.stock
  const hasStockLimit = typeof stock === 'number'
  const available = !hasStockLimit || stock > 0
  const [size, setSize] = useState(sizes[0])
  const [quantity, setQuantity] = useState(1)

  return (
    <article className="overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm">
      <img src={product.image} alt={product.name} className="h-64 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-stone-950">{product.name}</h3>
            <p className="mt-1 text-sm font-bold text-red-700">{hasStockLimit ? `${stock} in stock` : 'Available'}</p>
          </div>
          <span className="text-2xl font-black text-red-800">{money(product.price)}</span>
        </div>
        <p className="mt-2 text-stone-700">{product.description}</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_110px]">
          <label className="block">
            <span className="text-xs font-black uppercase tracking-widest text-stone-500">Size</span>
            <select className="mt-1 w-full rounded-md border border-orange-200 px-3 py-2" value={size} onChange={(e) => setSize(e.target.value)}>
              {sizes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-black uppercase tracking-widest text-stone-500">Qty</span>
            <input
              className="mt-1 w-full rounded-md border border-orange-200 px-3 py-2"
              type="number"
              min="1"
              max={hasStockLimit ? stock : undefined}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(hasStockLimit ? stock : 9999, Math.max(1, Number(e.target.value))))}
            />
          </label>
        </div>

        <button
          onClick={() => onAdd(product, size, quantity)}
          className="mt-4 w-full rounded-full bg-red-700 px-4 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          disabled={!available}
        >
          {available ? t('addToCart') : t('outOfStock')}
        </button>
      </div>
    </article>
  )
}

export default Shop
