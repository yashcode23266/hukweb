// ─── Base URL ────────────────────────────────────────────────────────────────
const BASE = import.meta.env.VITE_API_BASE_URL || '"https://api.hukmillanecharaja.in";'

function authHeaders(extra = {}) {
  const token = localStorage.getItem('adminToken')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  }
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...options.headers },
  })

  if (res.status === 401) {
    localStorage.removeItem('adminToken')
    window.dispatchEvent(new Event('admin-session-expired'))
    throw new Error('Session expired')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Request failed: ${res.status}`)
  }

  return res
}

// ─── Auth (OTP-based, matches AuthController) ─────────────────────────────────
// Step 1 — POST /auth/login { email, password }
// Backend validates credentials via AuthenticationManager, generates an OTP,
// emails it, and returns plain text "OTP Sent Successfully" (not JSON, no token yet).
export async function requestOtp({ email, password }) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    // AuthenticationManager throws (bad credentials) -> Spring's default error body,
    // so fall back to text/status rather than assuming JSON.
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Invalid email or password.')
  }
  return true
}

// Step 2 — POST /auth/verify { email, otp } -> { token }
export async function verifyOtp({ email, otp }) {
  const res = await fetch(`${BASE}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || 'Invalid or expired OTP.')
  }
  return res.json() // { token }
}

// Resend — POST /auth/resend-otp?email=...  (backend takes it as @RequestParam, not body)
export async function resendOtp(email) {
  const res = await fetch(`${BASE}/auth/resend-otp?email=${encodeURIComponent(email)}`, {
    method: 'POST',
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Could not resend OTP. Please wait a moment and try again.')
  }
  return true
}

// ─── T-Shirt ──────────────────────────────────────────────────────────────────
export async function fetchTshirtDashboard() {
  const res = await request('/admin/tshirt/dashboard')
  return res.json()
}

export async function fetchAllTshirtOrders() {
  const res = await request('/admin/tshirt/all-orders')
  return res.json()
}

export async function markTshirtDelivered(bookingId) {
  const res = await request(`/admin/tshirt/delivered/${bookingId}`, { method: 'PUT' })
  return res.json()
}

export function exportTshirtExcelUrl() {
  return `${BASE}/admin/tshirt/export/excel`
}

// ─── ID Card ──────────────────────────────────────────────────────────────────
export async function fetchIdCardDashboard() {
  const res = await request('/admin/idcard/dashboard')
  return res.json()
}

export async function fetchAllIdCardOrders() {
  const res = await request('/admin/idcard/all-orders')
  return res.json()
}

export async function markIdCardDelivered(bookingId) {
  const res = await request(`/admin/idcard/delivered/${bookingId}`, { method: 'PUT' })
  return res.json()
}

export function exportIdCardExcelUrl() {
  return `${BASE}/admin/idcard/export/excel`
}

// ─── Authenticated download helper ───────────────────────────────────────────
export async function downloadExcel(url, filename) {
  const res = await fetch(url, { headers: authHeaders() })
  if (!res.ok) throw new Error('Export failed')
  const blob = await res.blob()
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}
