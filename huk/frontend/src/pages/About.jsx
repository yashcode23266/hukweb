import { motion } from 'framer-motion'
import logo from '../assets/logo.png.jpeg'
import SectionTitle from '../components/SectionTitle'
import { useLanguage } from '../i18n/useLanguage'

function About() {
  const { t, tList } = useLanguage()
  const values = [
    [t('valueDevotion'), t('valueDevotionCopy')],
    [t('valueSeva'), t('valueSevaCopy')],
    [t('valueTradition'), t('valueTraditionCopy')],
  ]

  return (
    <>
      <section className="bg-[#fffaf0] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto grid size-36 place-items-center rounded-full bg-[#b91717] p-5 shadow-xl shadow-red-950/20 sm:size-64 sm:p-8"
          >
            <img src={logo} alt="Hukmilane Lanecha Raja logo" className="h-full w-full object-contain" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-red-700 sm:tracking-[0.24em]">{t('aboutEyebrow')}</p>
            <h1 className="mt-3 wrap-break-word font-serif text-3xl font-black leading-tight text-[#b91717] sm:text-6xl">
              {t('aboutTitle')}
            </h1>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-stone-700 sm:text-lg">
              {tList('aboutParagraphs').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <SectionTitle eyebrow={t('legacyHighlightsEyebrow')} title={t('legacyHighlightsTitle')} />

        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {tList('legacyHighlights').map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="min-w-0 rounded-lg border border-orange-200 bg-[#fffaf0] p-5 shadow-sm sm:p-6"
            >
              <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700 sm:tracking-[0.2em]">0{index + 1}</p>
              <h2 className="mt-3 wrap-break-word text-xl font-black leading-tight text-stone-950 sm:text-2xl">{item.title}</h2>
              <p className="mt-3 leading-7 text-stone-700">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <SectionTitle eyebrow={t('foundationEyebrow')} title={t('foundationTitle')}>
          {t('foundationCopy')}
        </SectionTitle>

        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {values.map(([title, body], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="min-w-0 rounded-lg border border-orange-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-5 h-1.5 w-16 rounded-full bg-linear-to-r from-red-700 via-orange-500 to-amber-300" />
              <h2 className="wrap-break-word text-xl font-black text-stone-950 sm:text-2xl">{title}</h2>
              <p className="mt-3 leading-7 text-stone-700">{body}</p>
            </motion.article>
          ))}
        </div>
      </section>

    </>
  )
}

export default About
