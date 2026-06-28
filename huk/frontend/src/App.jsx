import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const AdminRoute = lazy(() => import('./pages/AdminRoute'))
const Contact = lazy(() => import('./pages/Contact'))
const Events = lazy(() => import('./pages/Events'))
const Gallery = lazy(() => import('./pages/Gallery'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/*" element={<AdminRoute />} />
            <Route path="/privacy-policy" element={<LegalPage page="privacy" />} />
            <Route path="/terms-and-conditions" element={<LegalPage page="terms" />} />
            <Route path="/refund-policy" element={<LegalPage page="refund" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
