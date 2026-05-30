import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaLinkedinIn,
} from 'react-icons/fa'
import logo from '../assets/logo.png.jpeg'
import { useLanguage } from '../i18n/LanguageContext'

const mobileLinks = [
  ['/shop', 'navShop'],
  ['/donate', 'navDonate'],
  ['/gallery', 'navGallery'],
  ['/admin', 'navAdmin'],
]

const desktopLinks = [
  ['/gallery', 'navGallery'],
  ['/shop', 'navShop'],
  ['/donate', 'navDonate'],
  ['/admin', 'navAdmin'],
]

const navItemClass =
  'inline-flex h-10 items-center rounded-full px-4 font-sans text-base font-extrabold leading-none transition'
const navInactiveClass = `${navItemClass} text-white hover:bg-white/10`
const navActiveClass = `${navItemClass} bg-white text-brand-red hover:bg-white`

function Layout() {
  const { t, toggleLanguage } = useLanguage()

  return (
    <div className="min-h-screen festival-bg">
      <header className="sticky top-0 z-50 shadow-xl shadow-red-950/20">
        <nav className="devotional-gradient px-4 py-3 text-white sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <img
                src={logo}
                alt="Hukmilane Lanecha Raja logo"
                className="h-14 w-14 shrink-0 rounded-full object-contain"
              />

              <span className="min-w-0">
                <span className="block truncate font-serif text-2xl font-black leading-none text-brand-gold xl:text-4xl">
                  || Hukmilane Lanecha Raja ||
                </span>
                <span className="mt-1 hidden text-[10px] font-bold uppercase tracking-[0.28em] text-amber-100 sm:block">
                  {t('shree')} {t('mandalName')}
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              <div className="group relative">
                <Link to="/about" className={navInactiveClass}>
                  Mandal Info
                </Link>

                <div className="invisible absolute left-0 top-full min-w-56 rounded-b-xl bg-white py-2 text-brand-red opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                  <Link
                    className="block px-6 py-3 font-extrabold hover:bg-amber-50"
                    to="/about"
                  >
                    About Us
                  </Link>
                </div>
              </div>

              <div className="group relative">
                <Link to="/social-work" className={navInactiveClass}>
                  Initiatives
                </Link>

                <div className="invisible absolute left-0 top-full min-w-56 rounded-b-xl bg-white py-2 text-brand-red opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                  <Link
                    className="block px-6 py-3 font-bold hover:bg-amber-50"
                    to="/social-work"
                  >
                    Social Work
                  </Link>
                  <Link
                    className="block px-6 py-3 font-bold hover:bg-amber-50"
                    to="/events"
                  >
                    Events
                  </Link>
                </div>
              </div>

              {desktopLinks.map(([to, labelKey]) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    isActive ? navActiveClass : navInactiveClass
                  }
                >
                  {t(labelKey)}
                </NavLink>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-full bg-white px-5 py-2 text-sm font-extrabold text-brand-red shadow-md transition hover:bg-amber-50"
            >
              {t('langToggle')}
            </button>
          </div>
        </nav>

        <div className="bg-brand-red px-4 py-2 text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 overflow-hidden text-xs font-bold sm:text-base">
            <p className="shrink-0">
              Hukmilane Sarvajanik GaneshUtsav Mandal | Established 1934
            </p>

            
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto bg-brand-red px-4 pb-3 lg:hidden">
          <Link
            to="/about"
            className="shrink-0 rounded-full bg-red-900/50 px-4 py-2 text-sm font-bold text-white"
          >
            Mandal Info
          </Link>

          <Link
            to="/social-work"
            className="shrink-0 rounded-full bg-red-900/50 px-4 py-2 text-sm font-bold text-white"
          >
            Social Work
          </Link>

          <Link
            to="/events"
            className="shrink-0 rounded-full bg-red-900/50 px-4 py-2 text-sm font-bold text-white"
          >
            Events
          </Link>

          {mobileLinks.map(([to, labelKey]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                  isActive
                    ? 'bg-white text-brand-red'
                    : 'bg-red-900/50 text-white'
                }`
              }
            >
              {t(labelKey)}
            </NavLink>
          ))}
        </div>
      </header>

      <div className="floating-social">
        <a className="floating-social-btn" href="#" aria-label="YouTube">
          <FaYoutube />
        </a>
        <a className="floating-social-btn" href="#" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a className="floating-social-btn" href="#" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a className="floating-social-btn" href="#" aria-label="WhatsApp">
          <FaWhatsapp />
        </a>
        <a className="floating-social-btn" href="#" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="devotional-gradient border-t border-orange-200 px-4 py-10 text-amber-50">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <img
              src={logo}
              alt="Hukmilane Lanecha Raja logo"
              className="mb-4 h-20 w-20 rounded-full object-contain"
            />
            <h3 className="font-serif text-2xl font-black text-brand-gold">
              Hukmilane Lanecha Raja
            </h3>
            <p className="mt-3 text-sm leading-6 text-amber-100/90">
              A devotional Ganpati mandal website for darshan, seva,
              announcements, donation and community updates.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-extrabold text-white">
              Important Links
            </h3>
            <div className="grid gap-2 text-sm font-semibold text-amber-100">
              <Link to="/">Home</Link>
              <Link to="/about">Mandal Info</Link>
              <Link to="/donate">Donation</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/gallery">Gallery</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-extrabold text-white">
              Contact Us
            </h3>
            <div className="space-y-2 text-sm font-semibold text-amber-100">
              <p>Phone: +91 98765 43210</p>
              <p>Email: hukmilane@gmail.com</p>
              <p>Location: Mumbai, Maharashtra</p>
            </div>

            <div className="mt-5 flex gap-3">
              <span className="floating-social-btn static! h-10! w-10! translate-y-0!">
                <FaFacebookF />
              </span>
              <span className="floating-social-btn static! h-10! w-10! translate-y-0!">
                <FaInstagram />
              </span>
              <span className="floating-social-btn static! h-10! w-10! translate-y-0!">
                <FaWhatsapp />
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-center text-sm text-amber-100/80">
          {t('footerLine')}
        </div>
      </footer>
    </div>
  )
}

export default Layout
