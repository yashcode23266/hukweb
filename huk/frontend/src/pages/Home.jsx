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
import { fallbackGallery } from '../data/fallback'
import { mandalMapEmbedUrl } from '../data/location'
import { useLanguage } from '../i18n/useLanguage'

const sponsors = [
  { name: 'Zee Marathi', logo: zeeLogo },
  { name: 'VERTIV', logo: vrtLogo },
  { name: 'Colors Marathi', logo: colorsMarathiLogo },
  { name: 'Kesh King', logo: keshLogo },
  { name: 'RR Kabel', logo: rrLogo },
  { name: 'CP Plus', logo: cpLogo },
  { name: 'Rapido', logo: rapidoLogo },
]

function Home() {
  const { t, tObject } = useLanguage()
  const { data: gallery = fallbackGallery } = useQuery({
    queryKey: ['gallery-preview'],
    queryFn: async () => (await api.get('/gallery')).data,
    retry: 1,
  })
  const translatedGallery = tObject('galleryItems')
  const galleryPreview = gallery.slice(0, 6).map((item) => ({
    ...item,
    title: translatedGallery[item._id]?.title || item.title,
    story: translatedGallery[item._id]?.story || item.story,
  }))

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-[calc(100vh-64px)] min-h-[520px] overflow-hidden bg-[#fffdf9]">
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
                  className="sponsor-card min-w-52.5 rounded-lg border border-orange-200 bg-white px-5 py-5 text-center shadow-sm sm:min-w-60"
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

      {/* DONATION CTA SECTION */}
      <section className="bg-[#fff1f1] px-4 py-12 text-center sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <h2 className="font-serif text-3xl font-black text-brand-red sm:text-6xl">{t('donation')}</h2>
          <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-stone-800 sm:mt-6 sm:text-2xl sm:leading-9">
            {t('homeDonationCopy')}
          </p>
          <Link
            to="/donate"
            className="mt-8 inline-flex rounded-full bg-brand-red px-8 py-4 text-base font-bold text-white shadow-xl shadow-red-900/20 transition hover:-translate-y-1 hover:bg-brand-dark-red sm:mt-10 sm:px-12 sm:py-5 sm:text-xl"
          >
            {t('donateNow')}
          </Link>
        </motion.div>
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

export default Home
