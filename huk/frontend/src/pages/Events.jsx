import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'
import { useLanguage } from '../i18n/useLanguage'

function Events() {
  const { t } = useLanguage()
  const events = [
    [t('eventAarti'), t('eventAartiCopy')],
    [t('eventCulture'), t('eventCultureCopy')],
    [t('eventPrasad'), t('eventPrasadCopy')],
    [t('eventVisarjan'), t('eventVisarjanCopy')],
  ]

  return (
    <>
      <section className="bg-[#fffaf0] px-4 py-10 text-center sm:px-6 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-red-700 sm:tracking-[0.24em]">{t('eventsEyebrow')}</p>
          <h1 className="mt-3 wrap-break-word font-serif text-3xl font-black leading-tight text-[#b91717] sm:text-6xl">
            {t('eventsTitle')}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-stone-700 sm:text-lg sm:leading-8">
            {t('eventsCopy')}
          </p>
        </motion.div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-16">
        <SectionTitle eyebrow={t('utsavHighlights')} title={t('eventsSectionTitle')} />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {events.map(([title, body], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="min-w-0 rounded-lg border border-orange-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700 sm:tracking-[0.2em]">{t('eventLabel')}</p>
              <h2 className="mt-2 wrap-break-word text-xl font-black text-stone-950 sm:text-3xl">{title}</h2>
              <p className="mt-3 leading-7 text-stone-700">{body}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Events
