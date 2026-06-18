import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import Countdown from '../components/Countdown'
import SectionTitle from '../components/SectionTitle'
import heroGanpati from '../assets/gann.png'
import historyGanpati from '../assets/ganpati-optimized.png'
import colorsMarathiLogo from '../assets/Colors marathi.png'
import cpLogo from '../assets/cp.png'
import keshLogo from '../assets/Kesh.webp'
import rapidoLogo from '../assets/rapido-removebg-preview.png'
import rrLogo from '../assets/rr.png'
import vrtLogo from '../assets/vrt.png'
import zeeLogo from '../assets/zee.png'
import rapidoSponsor1 from '../sponsor/rapido1.png.jpeg'
import rapidoSponsor2 from '../sponsor/rapido2.png.jpeg'
import rapidoSponsor3 from '../sponsor/rapido3.png.jpeg'
import rapidoSponsor4 from '../sponsor/rapido4.png.jpeg'
import rapidoSponsor5 from '../sponsor/rapido5.png.jpeg'
import rapidoSponsor6 from '../sponsor/rapido6.png.jpeg'
import rapidoSponsor7 from '../sponsor/rapido7.png.jpeg'
import rrsponsor6 from '../sponsor/rr6.png.jpeg'
import rrSponsor1 from '../sponsor/rr1.png.jpeg'
import rrSponsor2 from '../sponsor/rr2.png.jpeg'
import rrSponsor3 from '../sponsor/rr3.png.jpeg'
import rrSponsor4 from '../sponsor/rr4.png.jpeg'
import rrSponsor5 from '../sponsor/rr5.png.jpeg'
import cpsponsor1 from '../sponsor/cp1.png.jpeg'
import cpsponsor2 from '../sponsor/cp2.png.jpeg'
import cpsponsor3 from '../sponsor/cp3.png.jpeg'
import cpsponsor4 from '../sponsor/cp4.png.jpeg'
import cpsponsor5 from '../sponsor/cp5.png.jpeg'
import zeesponsor1 from '../sponsor/zee1.png.jpeg'
import vertivSponsor1 from '../sponsor/vertiv1.png.jpeg'
import vertivSponsor2 from '../sponsor/vertiv2.png.jpeg'
import vertivSponsor3 from '../sponsor/vertiv3.png.jpeg'
import vertivSponsor4 from '../sponsor/vertiv4.png.jpeg'
import vertivSponsor5 from '../sponsor/vertiv5.png.jpeg'
import vertivSponsor6 from '../sponsor/vertiv6.png.jpeg'
import colorssponsor1 from '../sponsor/colors1.png.jpeg'
import colorssponsor2 from '../sponsor/colors2.png.jpeg'
import colorssponsor3 from '../sponsor/colors3.png.jpeg'
import kesgkingsponsor1 from '../sponsor/keshking1.png.jpeg'
import kesgkingsponsor2 from '../sponsor/keshking2.png.jpeg'
import kesgkingsponsor3 from '../sponsor/keshking3.png.jpeg'
import kesgkingsponsor4 from '../sponsor/keshking4.png.jpeg'
import kesgkingsponsor5 from '../sponsor/keshking5.png.jpeg'
import kesgkingsponsor6 from '../sponsor/keshking6.png.jpeg'
import { fallbackGallery } from '../data/fallback'
import { mandalMapEmbedUrl } from '../data/location'
import { useLanguage } from '../i18n/useLanguage'

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
  const { data: gallery = fallbackGallery } = useQuery({
    queryKey: ['gallery-preview'],
    queryFn: async () => (await api.get('/gallery')).data,
    retry: 1,
  })
  const translatedGallery = tObject('galleryItems')
  const galleryPreview = gallery.slice(0, 6).map((item, index) => ({
    ...item,
    imageUrl: homeGalleryImages[index % homeGalleryImages.length],
    title: translatedGallery[item._id]?.title || item.title,
    story: translatedGallery[item._id]?.story || item.story,
  }))

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-[calc(100vh-64px)] min-h-130 overflow-hidden bg-[#fffdf9]">
        <div className="relative h-full w-full">
          <motion.img
            src={heroGanpati}
            alt="Ganpati Bappa"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700"
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

          <div className="sponsor-marquee mt-8 overflow-hidden">
            <div className="sponsor-marquee-track">
              {[...sponsors, ...sponsors].map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveSponsor(item)}
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
                      <img src={item.logo} alt={item.name} className="h-full w-full object-contain" />
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

      {/* MANDAL HISTORY SECTION */}
      <section className="bg-white px-4 py-10 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl bg-[#f6f1e7] shadow-2xl"
          >
            <img src={historyGanpati} alt="Ganpati History" className="h-72 w-full object-cover sm:h-105" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* PHOTO GALLERY PREVIEW */}
      <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle title={t('utsavMemories')}>
            {t('galleryPreviewCopy')}
          </SectionTitle>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPreview.map((item, index) => (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group min-w-0 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-orange-200 sm:rounded-3xl"
              >
                <div className="relative h-52 overflow-hidden sm:h-72">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
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
              </motion.article>
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

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl shadow-2xl"
            >
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
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

function SponsorGalleryModal({ sponsor, gallery, onClose }) {
  const photos = gallery?.photos?.length ? gallery.photos : homeGalleryImages

  return (
    <motion.div
      className="fixed inset-0 z-[250] overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-md sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="mx-auto min-h-[90vh] max-w-7xl overflow-hidden rounded-[2rem] bg-[#fff9ed] shadow-2xl ring-1 ring-orange-200"
      >
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-orange-200 bg-[#fff9ed]/90 px-5 py-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-orange-100">
              {sponsor.logo ? (
                <img src={sponsor.logo} alt={sponsor.name} className="h-full w-full object-contain p-2" />
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
            <motion.figure
              key={`${sponsor.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-orange-100"
            >
              <img
                src={photo}
                alt={`${sponsor.name} memory ${index + 1}`}
                className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                  index % 3 === 0 ? 'h-96 sm:h-[34rem]' : index % 3 === 1 ? 'h-72' : 'h-80 sm:h-96'
                }`}
              />
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Home
