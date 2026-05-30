import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('adminToken')) {
      localStorage.removeItem('adminToken')
      window.dispatchEvent(new CustomEvent('admin-session-expired'))
    }
    return Promise.reject(error)
  },
)

export function downloadAdminExport() {
  return api.get('/admin/export.xlsx', { responseType: 'blob' }).then((response) => {
    const url = URL.createObjectURL(response.data)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ganpati-mandal-export.xlsx'
    link.click()
    URL.revokeObjectURL(url)
  })
}
