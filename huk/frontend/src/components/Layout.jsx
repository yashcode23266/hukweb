import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/logo.png.jpeg'
import { useLanguage } from '../i18n/useLanguage'
import PageMeta from './PageMeta'

const mobileLinks = [
  ['/shop', 'navShop'],
  ['/donate', 'navDonate'],
  ['/admin', 'navAdmin'],
]

const desktopLinks = [
  ['/gallery', 'navGallery'],
  ['/shop', 'navShop'],
  ['/donate', 'navDonate'],
  ['/admin', 'navAdmin'],
]

const navItemClass =
  'inline-flex h-10 items-center rounded-full px-4 font-sans text-base font-extrabold leading-none tracking-normal transition'
const navInactiveClass = `${navItemClass} text-white hover:bg-white/10`
const navActiveClass = `${navItemClass} bg-white/15 text-white hover:bg-white/20`
const dropdownClass =
  'invisible absolute left-0 top-full z-50 w-56 overflow-hidden rounded-xl bg-white py-2 font-sans text-brand-red opacity-0 shadow-xl ring-1 ring-black/5 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100'
const dropdownLinkClass =
  'block px-5 py-3 text-base font-extrabold leading-none tracking-normal transition hover:bg-amber-50'

const mobilePanelLinkClass =
  'block rounded-lg px-3 py-2 text-base font-extrabold text-amber-50/95 transition hover:bg-white/10'

const socialLinks = {
  youtube: 'https://m.youtube.com/%40hukmil_lane1934?fbclid=PAb21jcASTq_RleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaeoiXuGO-c2Us80JVSLE4TkRY-4rDmKqSBGvO6M_IJU7fNXBdfSP1b-annOzA_aem_qqEoSIxZ7NPqkAkjq4w-hQ',
  facebook: 'https://www.facebook.com/share/1BGa9iXsEW/',
  instagram: 'https://www.instagram.com/hukmillane_cha_raja_1934?igsh=MTdjYnY5dnR3dHNrMQ==',
}

const seoByPath = {
  '/': {
    title: 'Home',
    description: 'Official Hukmilane Lanecha Raja Ganpati Mandal website for darshan, gallery, donations, shop, and community updates.',
  },
  '/about': {
    title: 'About Mandal',
    description: 'Learn about the legacy, origin, and devotional journey of Hukmilane Lanecha Raja since 1934.',
  },
  '/social-work': {
    title: 'Social Work',
    description: 'Explore the seva, social work, and community initiatives of Hukmilane Lanecha Raja.',
  },
  '/events': {
    title: 'Events',
    description: 'Discover cultural events, celebrations, and community activities by Hukmilane Lanecha Raja.',
  },
  '/gallery': {
    title: 'Gallery',
    description: 'Browse year-wise Ganpati memories and visual archive of Hukmilane Lanecha Raja.',
  },
  '/shop': {
    title: 'Shop',
    description: 'Buy official Hukmilane Lanecha Raja merchandise including festival T-shirts and ID cards.',
  },
  '/donate': {
    title: 'Donate',
    description: 'Offer seva and support Ganesh Utsav, prasad seva, and community initiatives.',
  },
  '/contact': {
    title: 'Contact',
    description: 'Find Hukmilane Lanecha Raja contact details and mandal location.',
  },
  '/admin': {
    title: 'Admin',
    description: 'Secure mandal dashboard for managing orders, donations, gallery, products, and announcements.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'How Hukmilane Lanecha Raja handles devotee, donation, order, and admin information.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions',
    description: 'Terms for using Hukmilane Lanecha Raja website, donations, shop, and admin features.',
  },
  '/refund-policy': {
    title: 'Refund Policy',
    description: 'Refund and cancellation guidance for donations and merchandise orders.',
  },
}

const legalLabels = {
  en: {
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    refund: 'Refund Policy',
  },
  mr: {
    privacy: 'गोपनीयता धोरण',
    terms: 'नियम व अटी',
    refund: 'रिफंड धोरण',
  },
}

const socialIcons = {
  youtube: (
    <path d="M21.6 7.2s-.2-1.5-.9-2.1c-.9-.9-1.8-.9-2.3-.9C15.2 4 12 4 12 4h0s-3.2 0-6.4.2c-.5 0-1.4 0-2.3.9-.7.6-.9 2.1-.9 2.1S2.2 9 2.2 10.8v1.7c0 1.8.2 3.6.2 3.6s.2 1.5.9 2.1c.9.9 2.1.9 2.6 1 1.9.2 6.1.2 6.1.2s3.2 0 6.4-.2c.5 0 1.4 0 2.3-.9.7-.6.9-2.1.9-2.1s.2-1.8.2-3.6v-1.7c0-1.8-.2-3.6-.2-3.6ZM10.1 14.5V8.3l5.9 3.1-5.9 3.1Z" />
  ),
  facebook: (
    <path d="M14.2 8.7V6.9c0-.8.2-1.3 1.3-1.3h1.6V2.8c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.1v2H7.9v3.1h2.7v7.9h3.6v-7.9h2.7l.4-3.1h-3.1Z" />
  ),
  instagram: (
    <path d="M7.4 2.8h9.2A4.6 4.6 0 0 1 21.2 7.4v9.2a4.6 4.6 0 0 1-4.6 4.6H7.4a4.6 4.6 0 0 1-4.6-4.6V7.4a4.6 4.6 0 0 1 4.6-4.6Zm0 2A2.6 2.6 0 0 0 4.8 7.4v9.2a2.6 2.6 0 0 0 2.6 2.6h9.2a2.6 2.6 0 0 0 2.6-2.6V7.4a2.6 2.6 0 0 0-2.6-2.6H7.4Zm4.6 3.4a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm4-2.9a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1Z" />
  ),
}

function SocialIcon({ icon }) {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      {socialIcons[icon]}
    </svg>
  )
}

function MenuIcon({ isOpen }) {
  return (
    <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 32 32" fill="none">
      {isOpen ? (
        <>
          <path d="M8 8L24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 8L8 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M6 9H26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M6 16H26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M6 23H26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

function MobileMenuSection({ title, children }) {
  return (
    <details className="group border-b border-white/10 py-1">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-xl font-black text-white">
        <span>{title}</span>
        <svg
          aria-hidden="true"
          className="h-5 w-5 transition group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  )
}

function Layout() {
  const { t, toggleLanguage, language } = useLanguage()
  const { pathname } = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const mandalInfoActive = pathname === '/about'
  const initiativesActive = pathname === '/social-work' || pathname === '/events'
  const seo = seoByPath[pathname] || seoByPath['/']
  const legal = legalLabels[language] || legalLabels.en

  return (
    <div className="min-h-screen overflow-x-hidden festival-bg">
      <PageMeta title={seo.title} description={seo.description} />
      <header className="sticky top-0 z-50 shadow-xl shadow-red-950/20">
        <nav className="devotional-gradient px-3 py-2.5 text-white sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <Link to="/" onClick={closeMobileMenu} className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <img
                src={logo}
                alt="Hukmilane Lanecha Raja logo"
                className="h-10 w-10 shrink-0 rounded-full object-contain min-[390px]:h-12 min-[390px]:w-12 sm:h-14 sm:w-14"
              />

              <span className="min-w-0">
                <span className="block truncate font-serif text-xl font-black leading-none text-brand-gold min-[390px]:text-[1.45rem] sm:text-2xl xl:text-4xl">
                  || {t('brandName')} ||
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              <div className="group relative">
                <button
                  type="button"
                  className={mandalInfoActive ? navActiveClass : navInactiveClass}
                  aria-haspopup="true"
                >
                  {t('navMandalInfo')}
                </button>

                <div className={dropdownClass}>
                  <Link
                    className={dropdownLinkClass}
                    to="/about"
                  >
                    {t('navAbout')}
                  </Link>
                </div>
              </div>

              <div className="group relative">
                <button
                  type="button"
                  className={initiativesActive ? navActiveClass : navInactiveClass}
                  aria-haspopup="true"
                >
                  {t('navInitiatives')}
                </button>

                <div className={dropdownClass}>
                  <Link
                    className={dropdownLinkClass}
                    to="/social-work"
                  >
                    {t('navSocialWork')}
                  </Link>
                  <Link
                    className={dropdownLinkClass}
                    to="/events"
                  >
                    {t('navEvents')}
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
              className="shrink-0 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold leading-none text-brand-red shadow-md transition hover:bg-amber-50 min-[390px]:px-5 min-[390px]:text-base lg:px-5 lg:text-sm"
            >
              {t('langToggle')}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="grid h-10 w-10 shrink-0 place-items-center text-white min-[390px]:h-11 min-[390px]:w-11 lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <MenuIcon isOpen={isMobileMenuOpen} />
            </button>
          </div>
        </nav>

        <div className={`${isMobileMenuOpen ? 'hidden lg:block' : 'block'} bg-brand-red px-4 py-2 text-white`}>
          <div className="mx-auto max-w-7xl overflow-hidden text-xs font-bold sm:text-base">
            <marquee className="block font-extrabold" direction="left" scrollAmount="3" loop="-1">
              {t('ticker')}
            </marquee>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="bg-brand-red px-5 py-5 shadow-xl min-[390px]:px-6 lg:hidden">
            <MobileMenuSection title={t('navMandalInfo')}>
              <NavLink onClick={closeMobileMenu} className={mobilePanelLinkClass} to="/about">
                {t('navAbout')}
              </NavLink>
            </MobileMenuSection>

            <MobileMenuSection title={t('navInitiatives')}>
              <NavLink onClick={closeMobileMenu} className={mobilePanelLinkClass} to="/social-work">
                {t('navSocialWork')}
              </NavLink>
              <NavLink onClick={closeMobileMenu} className={mobilePanelLinkClass} to="/events">
                {t('navEvents')}
              </NavLink>
            </MobileMenuSection>

            <MobileMenuSection title={t('navBroadcastMedia')}>
              <NavLink onClick={closeMobileMenu} className={mobilePanelLinkClass} to="/gallery">
                {t('navGallery')}
              </NavLink>
            </MobileMenuSection>

            <MobileMenuSection title={t('navMore')}>
              {mobileLinks.map(([to, labelKey]) => (
                <NavLink key={to} onClick={closeMobileMenu} to={to} className={mobilePanelLinkClass}>
                  {t(labelKey)}
                </NavLink>
              ))}
            </MobileMenuSection>
          </div>
        ) : null}
      </header>

      <div className="floating-social">
        <a className="floating-social-btn" href={socialLinks.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
          <SocialIcon icon="youtube" />
        </a>
        <a className="floating-social-btn" href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
          <SocialIcon icon="facebook" />
        </a>
        <a className="floating-social-btn" href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
          <SocialIcon icon="instagram" />
        </a>
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="devotional-gradient border-t border-orange-200 px-4 py-10 text-amber-50">
        <div className="mx-auto grid max-w-7xl gap-8 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <img
              src={logo}
              alt="Hukmilane Lanecha Raja logo"
              className="mb-4 h-20 w-20 rounded-full object-contain"
            />
            <h3 className="font-serif text-2xl font-black text-brand-gold">
              {t('brandName')}
            </h3>
            <p className="mt-3 text-sm leading-6 text-amber-100/90">
              {t('footerCopy')}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-extrabold text-white">
              {t('importantLinks')}
            </h3>
            <div className="grid gap-2 text-sm font-semibold text-amber-100">
              <Link to="/">{t('navHome')}</Link>
              <Link to="/about">{t('navMandalInfo')}</Link>
              <Link to="/donate">{t('navDonate')}</Link>
              <Link to="/shop">{t('navShop')}</Link>
              <Link to="/gallery">{t('navGallery')}</Link>
              <Link to="/privacy-policy">{legal.privacy}</Link>
              <Link to="/terms-and-conditions">{legal.terms}</Link>
              <Link to="/refund-policy">{legal.refund}</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-extrabold text-white">
              {t('contactUs')}
            </h3>
            <div className="space-y-2 text-sm font-semibold text-amber-100">
              <p>{t('contactEmailFooter')}</p>
              <p>{t('location')}: {t('mandalAddressShort')}</p>
            </div>

            <div className="mt-5 flex justify-center gap-3 md:justify-start">
              <a
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-red shadow-md transition hover:bg-amber-50"
                href={socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <SocialIcon icon="youtube" />
              </a>
              <a
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-red shadow-md transition hover:bg-amber-50"
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <SocialIcon icon="facebook" />
              </a>
              <a
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-red shadow-md transition hover:bg-amber-50"
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <SocialIcon icon="instagram" />
              </a>
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
