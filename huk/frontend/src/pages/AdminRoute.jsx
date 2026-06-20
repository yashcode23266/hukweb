import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AdminDashboard from './AdminDashboard'

const adminQueryClient = new QueryClient()

function AdminRoute() {
  return (
    <QueryClientProvider client={adminQueryClient}>
      <AdminDashboard />
    </QueryClientProvider>
  )
}

export default AdminRoute
