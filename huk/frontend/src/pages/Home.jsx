import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import Countdown from '../components/Countdown'
import SectionTitle from '../components/SectionTitle'
import ganpati from '../assets/ganpati-optimized.jpeg'
import { fallbackGallery } from '../data/fallback'
import { useLanguage } from '../i18n/useLanguage'

function Home() {
  const { t, tList, tObject } = useLanguage()
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
      <section className="relative min-h-[56vh] overflow-hidden bg-[#f8f8f8] px-3 sm:min-h-[72vh] sm:px-4 lg:min-h-[82vh]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/20 blur-[80px] sm:h-162.5 sm:w-162.5 sm:blur-[120px]" />
          <div className="absolute left-1/2 top-[20%] h-55 w-55 -translate-x-1/2 rounded-full bg-brand-orange/15 blur-[70px] sm:h-105 sm:w-105 sm:blur-[90px]" />
          <div className="absolute inset-0 bg-linear-to-b from-[#f7f7f7] via-[#f5f5f5] to-[#f1f1f1]" />
        </div>

        <div className="relative mx-auto flex min-h-[56vh] max-w-7xl items-center justify-center sm:min-h-[72vh] lg:min-h-[82vh]">
          <motion.img
            src={ganpati}
            alt="Ganpati Bappa"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-h-[min(58vh,420px)] w-[min(94vw,760px)] object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.24)] sm:max-h-155max-h-[760px]"
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

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {tList('mandalFacts').map((item, index) => (
              <motion.article
                key={`${item.label}-${item.value}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="min-w-0 rounded-lg border border-orange-200 bg-white p-5 shadow-sm"
              >
                <p className="wrap-break-word text-xs font-black uppercase tracking-[0.18em] text-brand-red sm:tracking-[0.22em]">{item.label}</p>
                <h3 className="mt-2 wrap-break-word text-xl font-black leading-tight text-stone-950 sm:text-2xl">{item.value}</h3>
                <p className="mt-3 leading-7 text-stone-700">{item.body}</p>
              </motion.article>
            ))}
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
            <img src={ganpati} alt="Ganpati History" className="h-72 w-full object-cover sm:h-105" />
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
                <div className="text-base font-black uppercase tracking-[0.22em] text-brand-red sm:text-xl sm:tracking-[0.3em]">{t('phone')}</div>
                <p className="wrap-break-word text-lg font-semibold leading-7 text-stone-950 sm:text-xl">
                  {t('contactPhoneValue')}
                </p>
              </div>

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
                src="https://www.google.com/maps?q=Lalbaug%20Mumbai&output=embed"
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
