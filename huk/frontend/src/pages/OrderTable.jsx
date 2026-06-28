import { useMemo, useState } from 'react'
import { Badge, DeliveryBadge } from './AdminUI'

// ─── Date helpers ──────────────────────────────────────────────────────────────
function fmt(value) {
  if (!value) return '—'
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleString('en-IN')
}

function fmtDate(value) {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
}

function photoSrc(entity) {
  if (!entity.imageData) return null
  const type = entity.imageType || 'image/jpeg'
  if (typeof entity.imageData === 'string') return `data:${type};base64,${entity.imageData}`
  return null
}

function sizeSummary(sizeQuantities) {
  if (!Array.isArray(sizeQuantities) || !sizeQuantities.length) return '—'
  return sizeQuantities.map((s) => `${s.size}×${s.quantity}`).join(', ')
}

// ─── Download helper (ID card only) ──────────────────────────────────────────
function downloadPhoto(order) {
  const src = photoSrc(order)
  if (!src) return
  const link = document.createElement('a')
  link.href = src
  link.download = `${order.idCardHolderName || order.bookingId}-photo.jpg`
  link.click()
}

// ─── Search / filter ──────────────────────────────────────────────────────────
function applyFilters(orders, { query, dateFrom, dateTo, deliveryStatus }) {
  return orders.filter((o) => {
    if (deliveryStatus !== 'all') {
      const isDelivered = String(o.deliveryStatus).toLowerCase() === 'delivered'
      if (deliveryStatus === 'delivered' && !isDelivered) return false
      if (deliveryStatus === 'pending' && isDelivered) return false
    }
    if (dateFrom && fmtDate(o.createdAt) < dateFrom) return false
    if (dateTo && fmtDate(o.createdAt) > dateTo) return false
    if (query) {
      const q = query.toLowerCase()
      const haystack = [
        o.bookingId, o.name, o.email, o.phoneNumber,
        o.razorpayOrderId, o.razorpayPaymentId, o.orderStatus,
        o.idCardHolderName, fmtDate(o.createdAt),
        ...(o.sizeQuantities || []).map((s) => s.size),
      ].join(' ').toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

// ─── Confirmation Modal ───────────────────────────────────────────────────────
function ConfirmDeliverModal({ order, type, onConfirm, onCancel, delivering }) {
  if (!order) return null
  const isTshirt = type === 'tshirt'
  const accent = isTshirt ? '#8d0909' : '#1a4d8d'
  const src = !isTshirt ? photoSrc(order) : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 shrink-0" style={{ backgroundColor: accent }}>
          <p className="text-xs font-black uppercase tracking-widest text-white/70">Confirm Delivery</p>
          <h2 className="mt-1 text-xl font-black text-white">Mark as Delivered?</h2>
        </div>

        {/* Scrollable order details */}
        <div className="px-6 py-5 space-y-3 text-sm overflow-y-auto flex-1">

          {/* Photo + Download — ID card only */}
          {src && (
            <div className="flex flex-col items-center gap-2 mb-3">
              <img
                src={src}
                alt={order.idCardHolderName}
                className="h-28 w-22 rounded-xl border-2 object-cover shadow cursor-pointer"
                style={{ borderColor: accent }}
                onClick={() => downloadPhoto(order)}
              />
              <button
                type="button"
                onClick={() => downloadPhoto(order)}
                className="flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-black transition hover:opacity-80 active:scale-95"
                style={{ borderColor: accent, color: accent }}
              >
                ⬇ Download Photo
              </button>
            </div>
          )}

          <Row label="Booking ID" value={order.bookingId} accent={accent} bold />
          <Row label="Order ID" value={order.razorpayOrderId} small />
          <Row label="Payment ID" value={order.razorpayPaymentId} small />
          <div className="my-1 border-t border-stone-100" />
          <Row label="Customer" value={order.name} bold />
          <Row label="Email" value={order.email} small />
          <Row label="Phone" value={order.phoneNumber} />
          {!isTshirt && <Row label="Name on ID" value={order.idCardHolderName} bold />}
          <div className="my-1 border-t border-stone-100" />
          {isTshirt && (
            <>
              <Row label="Sizes / Qty" value={sizeSummary(order.sizeQuantities)} />
              <Row label="Total Qty" value={order.totalQuantity} />
            </>
          )}
          <Row label="Amount" value={`₹${order.amount}`} bold accent={accent} />
          <Row label="Date" value={fmt(order.createdAt)} small />
        </div>

        {/* Question */}
        <div className="px-6 pb-2 shrink-0">
          <p
            className="rounded-xl py-3 px-4 text-sm font-bold text-center"
            style={{ backgroundColor: `${accent}10`, color: accent }}
          >
            Is this {isTshirt ? 'T-shirt' : 'ID card'} delivered to the customer?
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-6 py-5 shrink-0">
          <button
            type="button"
            onClick={onCancel}
            disabled={delivering}
            className="flex-1 rounded-full border border-stone-300 py-3 text-sm font-black text-stone-600 hover:bg-stone-50 disabled:opacity-60"
          >
            No, Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={delivering}
            className="flex-1 rounded-full py-3 text-sm font-black text-white shadow transition disabled:opacity-60"
            style={{ backgroundColor: accent }}
          >
            {delivering ? 'Updating…' : 'Yes, Delivered'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, bold, small, accent }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-stone-500 shrink-0">{label}</span>
      <span
        className={`text-right break-all ${bold ? 'font-black' : 'font-medium'} ${small ? 'text-xs text-stone-400' : 'text-stone-800'}`}
        style={accent ? { color: accent } : {}}
      >
        {value || '—'}
      </span>
    </div>
  )
}

// ─── Table Row ────────────────────────────────────────────────────────────────
function OrderRow({ order, type, onActionClick }) {
  const isTshirt = type === 'tshirt'
  const accent = isTshirt ? '#8d0909' : '#1a4d8d'
  const isDelivered = String(order.deliveryStatus).toLowerCase() === 'delivered'
  const src = !isTshirt ? photoSrc(order) : null

  return (
    <tr className="border-b border-[#ead9b3] align-top odd:bg-white even:bg-[#fffaf0]">

      {/* Booking ID */}
      <td className="px-3 py-3">
        <span className="font-black text-sm" style={{ color: accent }}>{order.bookingId}</span>
        <div className="mt-0.5 text-[10px] text-stone-400 break-all">{order.razorpayOrderId}</div>
        <div className="mt-0.5 text-[10px] text-stone-400 break-all">{order.razorpayPaymentId}</div>
        <div className="mt-1 text-[10px] text-stone-400">{fmtDate(order.createdAt)}</div>
      </td>

      {/* Customer */}
      <td className="px-3 py-3">
        <div className="font-bold text-sm">{order.name}</div>
        <div className="text-[10px] text-stone-400">{order.email}</div>
        <div className="text-xs font-medium text-stone-600">{order.phoneNumber}</div>
        {!isTshirt && order.idCardHolderName && (
          <div className="mt-1 text-[10px] font-black" style={{ color: accent }}>
            ID: {order.idCardHolderName}
          </div>
        )}
      </td>

      {/* Product */}
      <td className="px-3 py-3">
        {isTshirt ? (
          // ── T-Shirt: amount + sizes (unchanged) ──
          <>
            <div className="font-black text-sm" style={{ color: accent }}>₹{order.amount}</div>
            <div className="text-[10px] text-stone-500 mt-0.5">{sizeSummary(order.sizeQuantities)}</div>
            <div className="text-[10px] text-stone-400">Qty: {order.totalQuantity}</div>
            <div className="mt-1"><Badge status={order.orderStatus || 'paid'} /></div>
          </>
        ) : (
          // ── ID Card: photo + download + amount ──
          <div className="flex items-start gap-2">
            {src ? (
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <img
                    src={src}
                    alt={order.idCardHolderName}
                    onClick={() => downloadPhoto(order)}
                    className="h-14 w-11 rounded object-cover border border-[#d9bd79] cursor-pointer hover:opacity-80 transition"
                  />
                  <button
                    type="button"
                    onClick={() => downloadPhoto(order)}
                    className="w-full rounded-lg px-2 py-1 text-[10px] font-black text-white text-center transition hover:opacity-80 active:scale-95"
                    style={{ backgroundColor: accent }}
                  >
                    ⬇ Save
                  </button>
                </div>
            ) : (
              <span className="text-[10px] text-stone-400 shrink-0">No photo</span>
            )}
            <div>
              <div className="font-black text-sm" style={{ color: accent }}>₹{order.amount}</div>
              <div className="mt-1"><Badge status={order.orderStatus || 'paid'} /></div>
            </div>
          </div>
        )}
      </td>

      {/* Status + Action */}
      <td className="px-3 py-3">
        <DeliveryBadge delivered={isDelivered} />
        <div className="mt-2">
          {isDelivered ? (
            <span className="rounded-full bg-green-100 px-3 py-1.5 text-[10px] font-black text-green-700">
              ✓ Done
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onActionClick(order)}
              className="rounded-full px-3 py-1.5 text-[10px] font-black text-white shadow transition hover:opacity-80"
              style={{ backgroundColor: accent }}
            >
              Mark Delivered
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

// ─── Main OrderTable ──────────────────────────────────────────────────────────
function OrderTable({ orders = [], type = 'tshirt', onDeliver, deliveringId }) {
  const [query, setQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [deliveryStatus, setDeliveryStatus] = useState('all')
  const [pendingOrder, setPendingOrder] = useState(null)

  const filtered = useMemo(
    () => applyFilters(orders, { query, dateFrom, dateTo, deliveryStatus }),
    [orders, query, dateFrom, dateTo, deliveryStatus],
  )

  const isTshirt = type === 'tshirt'
  const accent = isTshirt ? '#8d0909' : '#1a4d8d'

  function handleConfirm() {
    if (!pendingOrder) return
    onDeliver(pendingOrder.bookingId)
    setPendingOrder(null)
  }

  return (
    <div>
      {/* Confirmation modal */}
      <ConfirmDeliverModal
        order={pendingOrder}
        type={type}
        onConfirm={handleConfirm}
        onCancel={() => setPendingOrder(null)}
        delivering={deliveringId === pendingOrder?.bookingId}
      />

      {/* Filters */}
      <div className="mt-6 space-y-3 rounded-2xl border border-[#e7c579]/70 bg-white p-4 shadow-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, phone, booking ID…"
          className="w-full rounded-xl border border-[#d9bd79] bg-[#fffdf7] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#b91111]/20"
        />
        <div className="flex flex-wrap gap-2">
          <input
            type="date" value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-lg border border-[#d9bd79] bg-[#fffdf7] px-2 py-1.5 text-sm outline-none"
          />
          <input
            type="date" value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-lg border border-[#d9bd79] bg-[#fffdf7] px-2 py-1.5 text-sm outline-none"
          />
          <select
            value={deliveryStatus}
            onChange={(e) => setDeliveryStatus(e.target.value)}
            className="rounded-lg border border-[#d9bd79] bg-[#fffdf7] px-2 py-1.5 text-sm font-bold outline-none"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
          </select>
          {(query || dateFrom || dateTo || deliveryStatus !== 'all') && (
            <button
              type="button"
              onClick={() => { setQuery(''); setDateFrom(''); setDateTo(''); setDeliveryStatus('all') }}
              className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-black text-stone-600 hover:bg-stone-50"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-xs font-bold text-stone-500">
          Showing {filtered.length} of {orders.length} orders
        </p>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-[#e7c579]/70 bg-white shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm" style={{ minWidth: '480px' }}>
            <thead style={{ backgroundColor: accent }} className="text-white">
              <tr>
                <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider">Booking ID</th>
                <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider">Customer</th>
                <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider">
                  {isTshirt ? 'Amount / Sizes' : 'Photo / Amount'}
                </th>
                <th className="px-3 py-3 text-[10px] font-black uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <OrderRow
                  key={order.bookingId}
                  order={order}
                  type={type}
                  onActionClick={setPendingOrder}
                />
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="p-10 text-center font-bold text-stone-500">
            {orders.length === 0 ? 'No orders found.' : 'No orders match your filters.'}
          </p>
        )}
      </div>
    </div>
  )
}

export default OrderTable