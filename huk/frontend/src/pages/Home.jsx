import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Countdown from '../components/Countdown'
import SectionTitle from '../components/SectionTitle'
import ganpati from '../assets/ganpati.png.jpeg'
import { useLanguage } from '../i18n/LanguageContext'

function Home() {
  const { t } = useLanguage()

  const highlights = [
    [t('dailyAarti'), t('dailyAartiCopy')],
    [t('prasadSeva'), t('prasadSevaCopy')],
    [t('culturalNights'), t('culturalNightsCopy')],
  ]

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[82vh] overflow-hidden bg-[#f8f8f8] px-4">

        {/* SOFT BACKGROUND GLOW */}
        <div className="absolute inset-0 overflow-hidden">

          {/* CENTER GLOW */}
          <div className="absolute left-1/2 top-1/2 h-162.5 w-162.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/20 blur-[120px]" />

          {/* TOP ORANGE GLOW */}
          <div className="absolute left-1/2 top-[20%] h-1054w-105anslate-x-1/2 rounded-full bg-brand-orange/15 blur-[90px]" />

          {/* LIGHT BACKGROUND */}
          <div className="absolute inset-0 bg-linear-to-b from-[#f7f7f7] via-[#f5f5f5] to-[#f1f1f1]" />
        </div>

        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center justify-center">

          {/* HALO */}
          <div className="mandala-halo scale-[1.15] opacity-70" />

          {/* GANPATI IMAGE */}
          <motion.img
            src={ganpati}
            alt="Ganpati Bappa"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="
              relative
              z-10
              max-h-190
              w-auto
              object-contain
              drop-shadow-[0_25px_45px_rgba(0,0,0,0.28)]
            "
          />
        </div>
      </section>

      {/* COUNTDOWN SECTION */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-orange-200">
          <Countdown />
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="px-4 py-16 sm:px-6">

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          {/* LEFT CARD */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="parchment-panel rounded-3xl p-8"
          >
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">
              Vakratunda Mahakaya
            </p>

            <h2 className="mt-4 font-serif text-4xl font-black leading-tight text-brand-dark-red sm:text-5xl">
              वक्रतुंड महाकाय सूर्यकोटि समप्रभ
            </h2>

            <p className="mt-5 text-lg font-semibold leading-8 text-stone-700">
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा
            </p>

            <div className="mt-8 rounded-3xl bg-linear-to-br from-brand-gold via-brand-orange to-brand-red p-1 shadow-xl">
              <div className="rounded-[1.3rem] bg-white p-6">

                <p className="mt-3 leading-7 text-stone-700">
                  A digital platform for devotees to connect with darshan,
                  seva, donation, announcements, shop and gallery memories.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div>

            <SectionTitle
              eyebrow={t('welcomeEyebrow')}
              title={t('welcomeTitle')}
            >
              {t('welcomeCopy')}
            </SectionTitle>

            <div className="grid gap-5 md:grid-cols-3">

              {highlights.map(([title, body], index) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="
                    rounded-3xl
                    border
                    border-orange-200
                    bg-white
                    p-6
                    shadow-lg
                    transition
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >

                  <div className="mb-5 h-2 w-16 rounded-full bg-linear-to-r from-brand-red via-brand-orange to-brand-gold" />

                  <h3 className="text-xl font-black text-brand-dark-red">
                    {title}
                  </h3>

                  <p className="mt-3 leading-7 text-stone-700">
                    {body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* MANDAL HISTORY SECTION */}
      <section className="bg-white px-4 py-20 sm:px-6">

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          {/* IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              overflow-hidden
              rounded-3xl
              bg-[#f6f1e7]
              shadow-2xl
            "
          >
            <img
              src={ganpati}
              alt="Ganpati History"
              className="
                h-105
                w-full
                object-cover
              "
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-red">
              Mandal History
            </p>

            <h2 className="mt-4 font-serif text-4xl font-black leading-tight text-brand-dark-red sm:text-6xl">
              A living tradition of devotion, seva, and celebration.
            </h2>

            <p className="mt-6 text-lg leading-8 text-stone-700">
              Inspired by Mumbai’s grand mandal tradition, this digital
              experience brings darshan updates, donations, gallery memories,
              shop orders and seva management into one place for devotees
              and volunteers.
            </p>

            <Link
              to="/about"
              className="
                mt-8
                inline-flex
                rounded-full
                bg-brand-red
                px-8
                py-4
                font-black
                text-white
                shadow-xl
                transition
                hover:-translate-y-1
              "
            >
              Read More
            </Link>
          </motion.div>
        </div>
      </section>

    {/* CONTACT SECTION */}
      <section className="bg-[#f7eded] px-4 py-16 sm:px-6">

        <div className="mx-auto max-w-7xl">

          {/* TITLE */}
          <h2 className="mb-10 text-center font-serif text-4xl font-black text-brand-red">
            Contact Us
          </h2>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            {/* LEFT INFO */}
            <div className="space-y-6">

              {/* PHONE */}
              <div className="flex items-start gap-6">
                <div className="mt-1 text-4xl text-brand-red">
                  ☎
                </div>

                <div>
                  <p className="text-2xl font-medium text-stone-800">
                    022 24711414
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-6">
                <div className="mt-1 text-4xl text-brand-red">
                  ✉
                </div>

                <div>
                  <p className="text-2xl font-medium text-stone-800">
                    mumbaicharaja.lsum@gmail.com
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-start gap-6">
                <div className="mt-1 text-4xl text-brand-red">
                  📍
                </div>

                <div>
                  <p className="max-w-xl text-2xl leading-relaxed text-stone-800">
                    Lalbaug Sarvajanik Utsav Mandal Ganesh Galli,
                    9/10 Kalyani Nivas, Lalbaug,
                    Mumbai, Maharashtra 400012, India
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT MAP */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl shadow-2xl"
            >
              <iframe
                title="Google Map"
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