import { api as localApi } from './client'

const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

async function backendRequest(path, options = {}) {
  const token = localStorage.getItem('adminToken')
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    if (response.status === 401) window.dispatchEvent(new Event('admin-session-expired'))
    const error = new Error(data.message || `Request failed (${response.status})`)
    error.response = { status: response.status, data }
    throw error
  }
  return data
}

export async function loginAdmin(credentials) {
  if (!API_BASE_URL) return (await localApi.post('/auth/admin/login', credentials)).data
  return backendRequest('/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export async function getAdminOrdersDashboard() {
  if (!API_BASE_URL) return (await localApi.get('/admin/dashboard')).data
  return backendRequest('/admin/dashboard')
}

export async function updateOrderCollection(orderId, collected) {
  if (!API_BASE_URL) return (await localApi.put(`/orders/${orderId}/collection`, { collected })).data
  return backendRequest(`/orders/${encodeURIComponent(orderId)}/collection`, {
    method: 'PUT',
    body: JSON.stringify({ collected }),
  })
}

export function usingRealAdminBackend() {
  return Boolean(API_BASE_URL)
}
