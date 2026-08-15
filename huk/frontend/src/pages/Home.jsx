import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import Countdown from '../components/Countdown'
import SectionTitle from '../components/SectionTitle'
import heroGanpati from '../assets/gann-optimized.webp'
import historyGanpati from '../assets/ganpati-optimized.png'
import colorsMarathiLogo from '../assets/Colors marathi.png'
import cpLogo from '../assets/cp.png'
import keshLogo from '../assets/Kesh.webp'
import rapidoLogo from '../assets/rapido-removebg-preview.png'
import rrLogo from '../assets/rr.png'
import vrtLogo from '../assets/vrt.png'
import zeeLogo from '../assets/zee.png'
import { fallbackGallery } from '../data/fallback'
import { homeGalleryImages, sponsorGalleries } from '../data/homeMedia'
import { mandalMapEmbedUrl } from '../data/location'
import { useLanguage } from '../i18n/useLanguage'





// T-SHIRT POPUP (DISABLED    FOR NOW)
// To enable later, uncomment this import:
// import TshirtAnnouncement from '../components/TshirtAnnouncement'

const sponsors = [
  { name: 'ZEE Marathi', logo: zeeLogo },
  { name: 'VERTIV', logo: vrtLogo },
  { name: 'Colors Marathi', logo: colorsMarathiLogo },
  { name: 'Kesh King', logo: keshLogo },
  { name: 'RR Kabel', logo: rrLogo },
  { name: 'CP Plus', logo: cpLogo },
  { name: 'Rapido', logo: rapidoLogo },
]

function Home() {
  const { t, tObject } = useLanguage()
  const [activeSponsor, setActiveSponsor] = useState(null)
  const [gallery, setGallery] = useState(fallbackGallery)
  const [isDocumentaryPlaying, setIsDocumentaryPlaying] = useState(false)
  const sponsorRailRef = useRef(null)
  const sponsorSwipeRef = useRef({
    active: false,
    moved: false,
    paused: false,
    startX: 0,
    scrollLeft: 0,
    ignoreClickUntil: 0,
  })

  useEffect(() => {
    let active = true
    api.get('/gallery')
      .then((response) => {
        if (active && Array.isArray(response.data)) setGallery(response.data)
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  useEffect(() => {
    const rail = sponsorRailRef.current
    if (!rail) return undefined

    let frameId
    let segmentWidth = 0

    const measure = () => {
      segmentWidth = rail.scrollWidth / 3
      if (segmentWidth && rail.scrollLeft < 1) {
        rail.scrollLeft = segmentWidth
      }
    }

    const normalize = () => {
      if (!segmentWidth) return
      if (rail.scrollLeft >= segmentWidth * 2) {
        rail.scrollLeft -= segmentWidth
      } else if (rail.scrollLeft <= 0) {
        rail.scrollLeft += segmentWidth
      }
    }

    const animate = () => {
      if (!sponsorSwipeRef.current.paused && !sponsorSwipeRef.current.active) {
        rail.scrollLeft += 0.45
        normalize()
      }
      frameId = window.requestAnimationFrame(animate)
    }

    measure()
    animate()
    window.addEventListener('resize', measure)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const translatedGallery = tObject('galleryItems')
  const galleryItems = Array.isArray(gallery) ? gallery : fallbackGallery
  const galleryPreview = galleryItems.slice(0, 6).map((item, index) => ({
    ...item,
    imageUrl: homeGalleryImages[index % homeGalleryImages.length],
    title: translatedGallery[item._id]?.title || item.title,
    story: translatedGallery[item._id]?.story || item.story,
  }))

  const startSponsorSwipe = (event) => {
    if (!sponsorRailRef.current) return
    sponsorSwipeRef.current = {
      ...sponsorSwipeRef.current,
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: sponsorRailRef.current.scrollLeft,
    }
  }

  const moveSponsorSwipe = (event) => {
    const swipe = sponsorSwipeRef.current
    if (!swipe.active || !sponsorRailRef.current) return
    const distance = event.clientX - swipe.startX
    if (Math.abs(distance) > 6) swipe.moved = true
    sponsorRailRef.current.scrollLeft = swipe.scrollLeft - distance
  }

  const endSponsorSwipe = () => {
    if (sponsorSwipeRef.current.moved) {
      sponsorSwipeRef.current.ignoreClickUntil = Date.now() + 250
    }
    sponsorSwipeRef.current.active = false
  }

  const openSponsorFromPointer = (item) => {
    if (sponsorSwipeRef.current.moved) return
    setActiveSponsor(item)
  }

  return (
    <>
      {/* T-SHIRT POPUP    (DISABLED): uncomment the next line when needed.
      <TshirtAnnouncement /> */}

      {/* HERO SECTION   */}
      <section className="relative h-[calc(100vh-64px)] min-h-130 overflow-hidden bg-[#fffdf9]">
        <div className="relative h-full w-full">
          <img
            src={heroGanpati}
            alt="Ganpati Bappa"
            width="1122"
            height="1402"
            fetchPriority="high"
            decoding="async"
            className="hero-image-fade absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </section>

      {/* COUNTDOWN SECTION */}
      <section className="px-4 py-8 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-4 shadow-xl ring-1 ring-orange-200 sm:p-8">
          <Countdown />
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title={t('mandalInfoTitle')}>
            {t('mandalInfoCopy')}
          </SectionTitle>

          <div
            className="sponsor-marquee mt-8 overflow-hidden"
            ref={sponsorRailRef}
            onPointerDown={startSponsorSwipe}
            onPointerMove={moveSponsorSwipe}
            onPointerUp={endSponsorSwipe}
            onPointerCancel={endSponsorSwipe}
            onMouseEnter={() => { sponsorSwipeRef.current.paused = true }}
            onMouseLeave={() => { sponsorSwipeRef.current.paused = false }}
          >
            <div className="sponsor-marquee-track">
              {[...sponsors, ...sponsors, ...sponsors].map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  role="button"
                  tabIndex={0}
                  onPointerUp={() => openSponsorFromPointer(item)}
                  onClick={(event) => event.preventDefault()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setActiveSponsor(item)
                    }
                  }}
                  className="sponsor-card min-w-52.5 cursor-pointer rounded-lg border border-orange-200 bg-white px-5 py-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-gold hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-200 sm:min-w-60"
                >
                  <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-lg bg-white text-2xl font-black text-brand-red">
                    {item.logo ? (
                      <img src={item.logo} alt={item.name} loading="lazy" decoding="async" className="h-full w-full object-contain" />
                    ) : (
                      item.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <h3 className="mt-4 wrap-break-word text-lg font-black leading-tight text-stone-950">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeSponsor && (
        <SponsorGalleryModal
          sponsor={activeSponsor}
          gallery={sponsorGalleries[activeSponsor.name]}
          onClose={() => setActiveSponsor(null)}
        />
      )}

      {/* MANDAL DOCUMENTARY */}
      <section className="bg-[#fffaf5] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-serif text-3xl font-black text-brand-dark-red sm:text-5xl">
            {t('documentaryTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-700 sm:text-lg">
            {t('documentaryCopy')}
          </p>

          <div className="mx-auto mt-8 aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-[#2b0606] shadow-2xl ring-1 ring-red-950/10 sm:rounded-2xl">
            {isDocumentaryPlaying ? (
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/RTsXvOc7drs?autoplay=1&rel=0"
                title={t('documentaryTitle')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsDocumentaryPlaying(true)}
                className="group relative h-full w-full overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-red-500"
                aria-label={t('playDocumentary')}
              >
                <img
                  src="https://i.ytimg.com/vi/RTsXvOc7drs/maxresdefault.jpg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.src = 'https://i.ytimg.com/vi/RTsXvOc7drs/hqdefault.jpg'
                  }}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20" aria-hidden="true" />
                <span
                  className="absolute left-1/2 top-1/2 grid h-14 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-[#ff0000] shadow-2xl transition group-hover:scale-105 sm:h-16 sm:w-24"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white sm:h-8 sm:w-8">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* MANDAL HISTORY SECTION  */}
      <section className="bg-white px-4 py-10 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-3xl bg-[#f6f1e7] shadow-2xl">
            <img src={historyGanpati} alt="Ganpati History" loading="lazy" decoding="async" className="h-72 w-full object-cover sm:h-105" />
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-red">{t('mandalHistory')}</p>
            <h2 className="mt-4 wrap-break-word font-serif text-3xl font-black leading-tight text-brand-dark-red sm:text-5xl lg:text-6xl">
              {t('historyTitle')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-stone-700">
              {t('historyCopy')}
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex rounded-full bg-brand-red px-8 py-4 font-black text-white shadow-xl transition hover:-translate-y-1"
            >
              {t('readMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY PREVIEW */}
      <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title={t('utsavMemories')}>
            {t('galleryPreviewCopy')}
          </SectionTitle>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPreview.map((item) => (
              <article
                key={item._id}
                className="group min-w-0 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-orange-200 sm:rounded-3xl"
              >
                <div className="relative h-52 overflow-hidden sm:h-72">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-brand-red px-4 py-2 text-sm font-black text-white shadow-lg">
                    {item.year}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black text-brand-dark-red">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 leading-7 text-stone-700">{item.story}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/gallery"
              className="inline-flex rounded-full bg-brand-red px-8 py-4 font-black text-white shadow-xl shadow-red-900/20 transition hover:-translate-y-1"
            >
              {t('viewFullGallery')}
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-[#f7eded] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center font-serif text-3xl font-black leading-tight text-brand-red sm:mb-10 sm:text-5xl">{t('contactUs')}</h2>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-7">
              <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-8">
                <div className="text-base font-black uppercase tracking-[0.22em] text-brand-red sm:text-xl sm:tracking-[0.3em]">{t('email')}</div>
                <p className="break-all text-lg font-semibold leading-7 text-stone-950 sm:wrap-break-word sm:text-xl">
                  {t('contactEmailValue')}
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-8">
                <div className="text-base font-black uppercase tracking-[0.22em] text-brand-red sm:text-xl sm:tracking-[0.3em]">{t('location')}</div>
                <p className="max-w-2xl text-lg font-semibold leading-8 text-stone-950 sm:text-xl">
                  {t('contactLocationValue')}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <iframe
                title={t('locationTitle')}
                src={mandalMapEmbedUrl}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function SponsorGalleryModal({ sponsor, gallery, onClose }) {
  const photos = gallery?.photos?.length ? gallery.photos : homeGalleryImages

  return (
    <div
      className="fixed inset-0 z-250 overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-md sm:px-6 "
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="mx-auto min-h-[90vh] max-w-7xl overflow-hidden rounded-4xl bg-[#fff9ed] shadow-2xl ring-1 ring-orange-200">
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-orange-200 bg-[#fff9ed]/90 px-5 py-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-orange-100">
              {sponsor.logo ? (
                <img src={sponsor.logo} alt={sponsor.name} loading="lazy" decoding="async" className="h-full w-full object-contain p-2" />
              ) : (
                <span className="font-black text-brand-red">{sponsor.name.slice(0, 2)}</span>
              )}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-red">Sponsor Gallery</p>
              <h2 className="font-serif text-2xl font-black text-brand-dark-red sm:text-4xl">
                {gallery?.title || sponsor.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full bg-brand-red text-2xl font-light leading-none text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-dark-red"
            aria-label="Close sponsor gallery"
          >
            ×
          </button>
        </div>

        <div className="columns-1 gap-5 p-5 sm:columns-2 sm:p-8 lg:columns-3">
          {photos.map((photo, index) => (
            <figure
              key={`${sponsor.name}-${index}`}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-orange-100"
            >
              <img
                src={photo}
                alt={`${sponsor.name} memory ${index + 1}`}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                  index % 3 === 0 ? 'h-96 sm:h-136' : index % 3 === 1 ? 'h-72' : 'h-80 sm:h-96'
                }`}
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
