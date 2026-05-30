import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Layout from './components/Layout'
import AdminDashboard from './pages/AdminDashboard'
import Contact from './pages/Contact'
import Donation from './pages/Donation'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Shop from './pages/Shop'
import SocialWork from './pages/SocialWork'

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
