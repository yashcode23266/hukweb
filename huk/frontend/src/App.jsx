import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

const About = lazy(() => import('./pages/About'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const Contact = lazy(() => import('./pages/Contact'))
const Donation = lazy(() => import('./pages/Donation'))
const Events = lazy(() => import('./pages/Events'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const SocialWork = lazy(() => import('./pages/SocialWork'))

function RouteLoader() {
  return (
    <div className="grid min-h-[42vh] place-items-center px-4 py-16">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 rounded-full border-4 border-orange-200 border-t-brand-red animate-spin" />
        <p className="mt-4 text-sm font-black uppercase tracking-[0.24em] text-brand-red">Loading</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/social-work" element={<SocialWork />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
