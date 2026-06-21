import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { getAdminOrdersDashboard, loginAdmin, updateOrderCollection } from '../api/adminOrders'
import { useLanguage } from '../i18n/useLanguage'
import { money } from '../utils/format'

const COPY = {
  en: {
    eyebrow: 'Distribution Management',
    title: 'Mandal Order Desk',
    subtitle: 'Manage T-shirt and ID-card bookings, collection status, and separate Excel records.',
    secure: 'Secure access',
    loginTitle: 'Admin Login',
    email: 'Admin email',
    password: 'Password',
    login: 'Login',
    loggingIn: 'Signing in...',
    logout: 'Logout',
    loginRequired: 'Login to manage bookings',
    loginRequiredCopy: 'Only authorized Mandal members can view customer and ID-card information.',
    tshirts: 'T-Shirts',
    ids: 'ID Cards',
    totalBookings: 'Bookings',
    pending: 'Pending collection',
    collected: 'Collected',
    search: 'Search by name, phone, email, booking ID, payment ID, or size',
    exportTshirts: 'Export T-Shirts',
    exportIds: 'Export ID Cards',
    noOrders: 'No bookings found in this section.',
    booking: 'Booking ID',
    date: 'Booking Date',
    customer: 'Customer',
    contact: 'Contact',
    orderDetails: 'Order Details',
    payment: 'Payment',
    handover: 'Distribution',
    idHolder: 'Name on ID',
    photo: 'Photo',
    sizes: 'Sizes / Quantity',
    quantity: 'Total Qty.',
    amount: 'Amount',
    status: 'Payment Status',
    receipt: 'Receipt',
    view: 'View',
    notAvailable: 'Not available',
    markCollected: 'T-shirt collected',
    markIdCollected: 'ID card collected',
    collectedOn: 'Collected / handed over',
    statusUpdated: 'Distribution status updated.',
    statusFailed: 'Could not update distribution status.',
    exportEmpty: 'There are no records to export.',
    sessionExpired: 'Your admin session expired. Please log in again.',
    loginSuccessful: 'Admin login successful.',
    loginFailed: 'Login failed.',
    loggedOut: 'Logged out successfully.',
  },
  mr: {
    eyebrow: 'वितरण व्यवस्थापन',
    title: 'मंडळ ऑर्डर डेस्क',
    subtitle: 'टी-शर्ट आणि आयडी कार्ड बुकिंग, वितरण स्थिती आणि स्वतंत्र एक्सेल नोंदी व्यवस्थापित करा.',
    secure: 'सुरक्षित प्रवेश',
    loginTitle: 'अॅडमिन लॉगिन',
    email: 'अॅडमिन ईमेल',
    password: 'पासवर्ड',
    login: 'लॉगिन',
    loggingIn: 'लॉगिन होत आहे...',
    logout: 'लॉगआउट',
    loginRequired: 'बुकिंग व्यवस्थापनासाठी लॉगिन करा',
    loginRequiredCopy: 'फक्त अधिकृत मंडळ सदस्य ग्राहक आणि आयडी कार्ड माहिती पाहू शकतात.',
    tshirts: 'टी-शर्ट',
    ids: 'आयडी कार्ड',
    totalBookings: 'बुकिंग',
    pending: 'वितरण बाकी',
    collected: 'वितरित',
    search: 'नाव, फोन, ईमेल, बुकिंग आयडी, पेमेंट आयडी किंवा साइज शोधा',
    exportTshirts: 'टी-शर्ट एक्सेल',
    exportIds: 'आयडी कार्ड एक्सेल',
    noOrders: 'या विभागात कोणतेही बुकिंग सापडले नाही.',
    booking: 'बुकिंग आयडी',
    date: 'बुकिंग तारीख',
    customer: 'ग्राहक',
    contact: 'संपर्क',
    orderDetails: 'ऑर्डर माहिती',
    payment: 'पेमेंट',
    handover: 'वितरण',
    idHolder: 'आयडीवरील नाव',
    photo: 'फोटो',
    sizes: 'साइज / प्रमाण',
    quantity: 'एकूण नग',
    amount: 'रक्कम',
    status: 'पेमेंट स्थिती',
    receipt: 'पावती',
    view: 'पाहा',
    notAvailable: 'उपलब्ध नाही',
    markCollected: 'टी-शर्ट घेतला',
    markIdCollected: 'आयडी कार्ड घेतले',
    collectedOn: 'वितरित / सुपूर्द',
    statusUpdated: 'वितरण स्थिती अपडेट झाली.',
    statusFailed: 'वितरण स्थिती अपडेट करता आली नाही.',
    exportEmpty: 'एक्सपोर्ट करण्यासाठी नोंदी नाहीत.',
    sessionExpired: 'अॅडमिन सत्र संपले. पुन्हा लॉगिन करा.',
    loginSuccessful: 'अॅडमिन लॉगिन यशस्वी.',
    loginFailed: 'लॉगिन अयशस्वी.',
    loggedOut: 'यशस्वीपणे लॉगआउट झाले.',
  },
}

function firstValue(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '')
}

function normalizeLines(order) {
  if (Array.isArray(order.sizeQuantities) && order.sizeQuantities.length) {
    return order.sizeQuantities.map((line) => ({
      size: firstValue(line.size, 'Standard'),
      quantity: Number(firstValue(line.quantity, line.qty, 1)),
    }))
  }

  if (Array.isArray(order.items) && order.items.length) {
    return order.items.map((line) => ({
      size: firstValue(line.size, line.selectedSize, 'Standard'),
      quantity: Number(firstValue(line.quantity, line.qty, 1)),
      name: firstValue(line.name, line.productName, ''),
    }))
  }

  return [{ size: firstValue(order.size, 'Standard'), quantity: Number(firstValue(order.totalQuantity, order.quantity, 1)) }]
}

function getProductType(order) {
  const explicit = String(firstValue(order.productType, order.type, order.category, '')).toLowerCase()
  const itemNames = (order.items || []).map((line) => `${line.name || ''} ${line.productName || ''}`).join(' ').toLowerCase()
  const combined = `${explicit} ${itemNames}`
  return combined.includes('idcard') || combined.includes('id card') ? 'idcard' : 'tshirt'
}

function normalizeOrder(order) {
  const customer = order.customer || order.user || {}
  const idDetails = order.idCardDetails || order.idCard || {}
  const lines = normalizeLines(order)
  const status = String(firstValue(order.status, order.orderStatus, order.paymentStatus, 'paid')).toLowerCase()
  const photo = firstValue(
    idDetails.photoBase64,
    idDetails.photoUrl,
    idDetails.photo,
    order.idCardPhotoUrl,
    order.photoUrl,
  )

  return {
    raw: order,
    id: String(firstValue(order._id, order.id, order.orderId, order.razorpayOrderId, '')),
    bookingId: String(firstValue(order.bookingId, order.receiptNumber, order.razorpayOrderId, order.orderId, order._id, order.id, '—')),
    paymentId: String(firstValue(order.razorpayPaymentId, order.paymentId, '—')),
    type: getProductType(order),
    name: String(firstValue(order.name, customer.name, customer.fullName, '—')),
    phone: String(firstValue(order.phoneNumber, order.phone, customer.phoneNumber, customer.phone, '—')),
    email: String(firstValue(order.email, customer.email, '—')),
    date: firstValue(order.createdAt, order.orderDate, order.paidAt),
    lines,
    quantity: Number(firstValue(order.totalQuantity, lines.reduce((sum, line) => sum + line.quantity, 0), 1)),
    amount: Number(firstValue(order.amount, order.totalAmount, order.total, 0)),
    status,
    collected: Boolean(order.collectedAt) || order.collected === true || ['delivered', 'collected', 'completed', 'distributed'].includes(status),
    collectedAt: firstValue(order.collectedAt, order.deliveredAt, order.updatedAt),
    receiptUrl: firstValue(order.receiptUrl, order.receiptLink),
    idHolderName: String(firstValue(idDetails.cardholderName, idDetails.name, order.idCardName, order.cardholderName, '—')),
    photo,
  }
}

function filterOrders(items, query) {
  const value = query.trim().toLowerCase()
  if (!value) return items
  return items.filter((item) => JSON.stringify(item).toLowerCase().includes(value))
}

function displayDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('en-IN')
}

function lineSummary(order) {
  return order.lines.map((line) => `${line.size} × ${line.quantity}`).join(', ')
}

function escapeExcel(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function exportOrdersToExcel(type, orders) {
  if (!orders.length) return false
  const isId = type === 'idcard'
  const headers = isId
    ? ['Sr. No.', 'Booking ID', 'Booking Date', 'Name on ID', 'Customer Name', 'Phone', 'Email', 'Quantity', 'Amount', 'Payment ID', 'Payment Status', 'Distribution Status', 'Distributed On']
    : ['Sr. No.', 'Booking ID', 'Booking Date', 'Customer Name', 'Phone', 'Email', 'Sizes / Quantity', 'Total Quantity', 'Amount', 'Payment ID', 'Payment Status', 'Distribution Status', 'Distributed On']

  const rows = orders.map((order, index) => isId
    ? [index + 1, order.bookingId, displayDate(order.date), order.idHolderName, order.name, order.phone, order.email, order.quantity, order.amount, order.paymentId, order.status, order.collected ? 'Collected' : 'Pending', order.collected ? displayDate(order.collectedAt) : '—']
    : [index + 1, order.bookingId, displayDate(order.date), order.name, order.phone, order.email, lineSummary(order), order.quantity, order.amount, order.paymentId, order.status, order.collected ? 'Collected' : 'Pending', order.collected ? displayDate(order.collectedAt) : '—'])

  const tableRows = [headers, ...rows]
    .map((row, rowIndex) => `<tr>${row.map((cell) => `<${rowIndex === 0 ? 'th' : 'td'}>${escapeExcel(cell)}</${rowIndex === 0 ? 'th' : 'td'}>`).join('')}</tr>`)
    .join('')
  const title = isId ? 'ID Card Bookings' : 'T-Shirt Bookings'
  const html = `<!doctype html><html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif}h1{color:#8d0909}table{border-collapse:collapse}th{background:#8d0909;color:#fff;font-weight:bold;text-align:center}th,td{border:1px solid #b7a16d;padding:8px;white-space:nowrap}td:nth-child(1){text-align:center}tr:nth-child(even) td{background:#fff8e8}</style></head><body><h1>${title}</h1><p>Exported: ${escapeExcel(new Date().toLocaleString('en-IN'))}</p><table>${tableRows}</table></body></html>`
  const url = URL.createObjectURL(new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `${isId ? 'id-card' : 'tshirt'}-bookings-${new Date().toISOString().slice(0, 10)}.xls`
  link.click()
  URL.revokeObjectURL(url)
  return true
}

function AdminDashboard() {
  const queryClient = useQueryClient()
  const { language } = useLanguage()
  const copy = COPY[language] || COPY.en
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '')
  const [login, setLogin] = useState({ email: 'admin@mandal.com', password: 'HariOm99' })
  const [activeTab, setActiveTab] = useState('tshirt')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  const dashboard = useQuery({
    queryKey: ['admin-dashboard', adminToken],
    enabled: Boolean(adminToken),
    queryFn: getAdminOrdersDashboard,
  })

  useEffect(() => {
    function handleExpired() {
      localStorage.removeItem('adminToken')
      setAdminToken('')
      setMessage(copy.sessionExpired)
      queryClient.removeQueries({ queryKey: ['admin-dashboard'] })
    }
    window.addEventListener('admin-session-expired', handleExpired)
    return () => window.removeEventListener('admin-session-expired', handleExpired)
  }, [copy.sessionExpired, queryClient])

  const loginMutation = useMutation({
    mutationFn: async () => loginAdmin(login),
    onSuccess: (data) => {
      localStorage.setItem('adminToken', data.token)
      setAdminToken(data.token)
      setMessage(copy.loginSuccessful)
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || copy.loginFailed),
  })

  const statusMutation = useMutation({
    mutationFn: async ({ id, collected }) => updateOrderCollection(id, collected),
    onSuccess: () => {
      setMessage(copy.statusUpdated)
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] })
    },
    onError: (error) => setMessage(error.response?.data?.message || copy.statusFailed),
  })

  const orders = useMemo(
    () => (dashboard.data?.recentOrders || dashboard.data?.orders || []).map(normalizeOrder),
    [dashboard.data],
  )
  const tshirtOrders = useMemo(() => orders.filter((order) => order.type === 'tshirt'), [orders])
  const idOrders = useMemo(() => orders.filter((order) => order.type === 'idcard'), [orders])
  const visibleOrders = filterOrders(activeTab === 'tshirt' ? tshirtOrders : idOrders, search)
  const currentOrders = activeTab === 'tshirt' ? tshirtOrders : idOrders
  const collectedCount = currentOrders.filter((order) => order.collected).length

  function logout() {
    localStorage.removeItem('adminToken')
    setAdminToken('')
    setMessage(copy.loggedOut)
    queryClient.removeQueries({ queryKey: ['admin-dashboard'] })
  }

  function handleExport(type, records) {
    if (!exportOrdersToExcel(type, records)) setMessage(copy.exportEmpty)
  }

  return (
    <main className="min-h-screen bg-[#fff8ea] px-4 py-8 text-stone-950 sm:px-6 lg:py-12">
      <section className="mx-auto max-w-7xl rounded-3xl border border-[#e7c579]/70 bg-[#fffdf7] px-5 py-8 shadow-[0_24px_80px_rgba(93,25,0,.10)] sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#b91111]">{copy.eyebrow}</p>
            <h1 className="mt-3 font-serif text-4xl font-black leading-tight text-[#8d0909] sm:text-6xl">{copy.title}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-stone-700 sm:text-lg">{copy.subtitle}</p>
          </div>
          {adminToken ? (
            <button type="button" onClick={logout} className="w-fit rounded-full bg-[#8d0909] px-6 py-3 font-black text-white shadow-lg">
              {copy.logout}
            </button>
          ) : null}
        </div>
      </section>

      {!adminToken ? (
        <section className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-3xl bg-[#8d0909] p-7 text-white shadow-2xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">{copy.secure}</p>
            <h2 className="mt-3 font-serif text-4xl font-black">{copy.loginRequired}</h2>
            <p className="mt-4 leading-7 text-red-50/85">{copy.loginRequiredCopy}</p>
          </div>
          <form
            className="rounded-3xl border border-[#e7c579]/70 bg-white p-6 shadow-xl sm:p-8"
            onSubmit={(event) => { event.preventDefault(); loginMutation.mutate() }}
          >
            <h2 className="font-serif text-3xl font-black text-[#8d0909]">{copy.loginTitle}</h2>
            <label className="mt-6 block text-sm font-black text-stone-700">
              {copy.email}
              <input required type="email" value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} className="mt-2 w-full rounded-xl border border-[#d9bd79] bg-[#fffdf7] px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-[#b91111]/25" />
            </label>
            <label className="mt-4 block text-sm font-black text-stone-700">
              {copy.password}
              <input required type="password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} className="mt-2 w-full rounded-xl border border-[#d9bd79] bg-[#fffdf7] px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-[#b91111]/25" />
            </label>
            <button disabled={loginMutation.isPending} className="mt-6 w-full rounded-full bg-[#b91111] px-6 py-3 font-black text-white shadow-lg disabled:opacity-60">
              {loginMutation.isPending ? copy.loggingIn : copy.login}
            </button>
            {message ? <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-bold text-[#8d0909]">{message}</p> : null}
          </form>
        </section>
      ) : (
        <section className="mx-auto mt-8 max-w-7xl">
          <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#f2ddae] p-2 sm:w-fit sm:min-w-105">
            <TabButton active={activeTab === 'tshirt'} count={tshirtOrders.length} onClick={() => setActiveTab('tshirt')}>{copy.tshirts}</TabButton>
            <TabButton active={activeTab === 'idcard'} count={idOrders.length} onClick={() => setActiveTab('idcard')}>{copy.ids}</TabButton>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat label={copy.totalBookings} value={currentOrders.length} />
            <Stat label={copy.pending} value={currentOrders.length - collectedCount} />
            <Stat label={copy.collected} value={collectedCount} />
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-[#e7c579]/70 bg-white p-4 shadow-lg sm:flex-row sm:items-center">
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={copy.search} className="min-w-0 flex-1 rounded-xl border border-[#d9bd79] bg-[#fffdf7] px-4 py-3 outline-none focus:ring-2 focus:ring-[#b91111]/20" />
            <button type="button" onClick={() => handleExport(activeTab, currentOrders)} className="rounded-full bg-[#b91111] px-6 py-3 font-black text-white shadow-md">
              {activeTab === 'tshirt' ? copy.exportTshirts : copy.exportIds}
            </button>
          </div>

          {message ? <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-bold text-green-800">{message}</p> : null}
          {dashboard.isLoading ? <p className="mt-8 text-center font-bold text-stone-600">Loading...</p> : null}
          {dashboard.isError ? <p className="mt-8 rounded-xl bg-red-50 p-4 font-bold text-red-800">{dashboard.error?.message || copy.loginFailed}</p> : null}

          {!dashboard.isLoading && !dashboard.isError ? (
            <OrderTable
              copy={copy}
              type={activeTab}
              orders={visibleOrders}
              disabled={statusMutation.isPending}
              onCollected={(order, collected) => statusMutation.mutate({ id: order.id, collected })}
            />
          ) : null}
        </section>
      )}
    </main>
  )
}

function TabButton({ active, children, count, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-xl px-4 py-3 text-sm font-black transition sm:text-base ${active ? 'bg-[#8d0909] text-white shadow-lg' : 'text-[#7a1515] hover:bg-white/60'}`}>
      {children} <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${active ? 'bg-white/15' : 'bg-white/70'}`}>{count}</span>
    </button>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#e7c579]/60 bg-white p-5 shadow-md">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a31616]">{label}</p>
      <p className="mt-2 font-serif text-4xl font-black text-[#8d0909]">{value}</p>
    </div>
  )
}

function OrderTable({ copy, disabled, onCollected, orders, type }) {
  const isId = type === 'idcard'
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#e7c579]/70 bg-white shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-275 border-collapse text-left text-sm">
          <thead className="bg-[#8d0909] text-white">
            <tr>
              <TableHead>{copy.booking}</TableHead>
              <TableHead>{copy.date}</TableHead>
              {isId ? <TableHead>{copy.photo}</TableHead> : null}
              <TableHead>{isId ? copy.idHolder : copy.customer}</TableHead>
              {isId ? <TableHead>{copy.customer}</TableHead> : null}
              <TableHead>{copy.contact}</TableHead>
              <TableHead>{copy.orderDetails}</TableHead>
              <TableHead>{copy.payment}</TableHead>
              <TableHead>{copy.handover}</TableHead>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id || `${order.bookingId}-${index}`} className="border-b border-[#ead9b3] align-top odd:bg-white even:bg-[#fffaf0]">
                <TableCell><strong className="text-[#8d0909]">{order.bookingId}</strong><div className="mt-1 text-xs text-stone-500">{order.paymentId}</div></TableCell>
                <TableCell>{displayDate(order.date)}</TableCell>
                {isId ? <TableCell><PhotoPreview copy={copy} order={order} /></TableCell> : null}
                <TableCell><strong>{isId ? order.idHolderName : order.name}</strong></TableCell>
                {isId ? <TableCell><strong>{order.name}</strong></TableCell> : null}
                <TableCell><div className="font-bold">{order.phone}</div><div className="mt-1 max-w-55 break-all text-xs text-stone-600">{order.email}</div></TableCell>
                <TableCell><div className="font-bold">{isId ? `${copy.quantity}: ${order.quantity}` : lineSummary(order)}</div>{!isId ? <div className="mt-1 text-xs text-stone-600">{copy.quantity}: {order.quantity}</div> : null}</TableCell>
                <TableCell><div className="font-black text-[#8d0909]">{money(order.amount)}</div><StatusBadge status={order.status} />{order.receiptUrl ? <a href={order.receiptUrl} target="_blank" rel="noreferrer" className="mt-2 block font-black text-[#a31616] underline">{copy.receipt}</a> : null}</TableCell>
                <TableCell>
                  <label className={`flex min-w-42 cursor-pointer items-center gap-3 rounded-xl border p-3 font-black ${order.collected ? 'border-green-300 bg-green-50 text-green-800' : 'border-amber-300 bg-amber-50 text-amber-900'}`}>
                    <input type="checkbox" checked={order.collected} disabled={disabled || !order.id} onChange={(event) => onCollected(order, event.target.checked)} className="h-5 w-5 accent-green-700" />
                    <span>{order.collected ? copy.collectedOn : (isId ? copy.markIdCollected : copy.markCollected)}</span>
                  </label>
                  {order.collected && order.collectedAt ? <p className="mt-2 text-xs text-stone-600">{displayDate(order.collectedAt)}</p> : null}
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length === 0 ? <p className="p-10 text-center font-bold text-stone-600">{copy.noOrders}</p> : null}
    </div>
  )
}

function TableHead({ children }) {
  return <th className="whitespace-nowrap px-4 py-4 text-xs font-black uppercase tracking-wider">{children}</th>
}

function TableCell({ children }) {
  return <td className="px-4 py-4 leading-6">{children}</td>
}

function StatusBadge({ status }) {
  const paid = ['paid', 'processing', 'ready', 'delivered', 'collected', 'completed', 'distributed'].includes(status)
  return <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-black uppercase ${paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{status}</span>
}

function PhotoPreview({ copy, order }) {
  if (!order.photo) return <span className="text-xs font-bold text-stone-500">{copy.notAvailable}</span>
  return (
    <a href={order.photo} target="_blank" rel="noreferrer" className="block w-fit">
      <img src={order.photo} alt={`${order.idHolderName} ID`} className="h-20 w-16 rounded-md border border-[#d9bd79] object-cover shadow-sm" />
      <span className="mt-1 block text-center text-xs font-black text-[#a31616]">{copy.view}</span>
    </a>
  )
}

export default AdminDashboard
