import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'  // ← remove BrowserRouter
import AdminHome from './AdminHome'        // ← flat imports, no subfolder
import AdminLogin from './AdminLogin'
import IdCardDashboard from './IdCardDashboard'
import TshirtDashboard from './TshirtDashboard'

const adminQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
})

function AdminApp() {
  const queryClient = useQueryClient()
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '')

  useEffect(() => {
    function handleExpired() {
      setToken('')
      queryClient.clear()
    }
    window.addEventListener('admin-session-expired', handleExpired)
    return () => window.removeEventListener('admin-session-expired', handleExpired)
  }, [queryClient])

  function handleLogout() {
    localStorage.removeItem('adminToken')
    setToken('')
    queryClient.clear()
  }

  if (!token) {
    return <AdminLogin onSuccess={(t) => setToken(t)} />
  }

  return (
    <Routes>
      <Route path="" element={<AdminHome onLogout={handleLogout} />} />           {/* /admin */}
      <Route path="tshirt" element={<TshirtDashboard onLogout={handleLogout} />} />{/* /admin/tshirt */}
      <Route path="idcard" element={<IdCardDashboard onLogout={handleLogout} />} />{/* /admin/idcard */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}

function AdminRoute() {
  return (
    <QueryClientProvider client={adminQueryClient}>
      <AdminApp />
    </QueryClientProvider>
  )
}

export default AdminRoute