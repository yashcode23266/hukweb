import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { useLanguage } from '../i18n/useLanguage'

function SocialWork() {
  const { t } = useLanguage()
  const initiatives = [
    [t('foodSeva'), t('foodSevaCopy')],
    [t('volunteerSupport'), t('volunteerSupportCopy')],
    [t('communityHelp'), t('communityHelpCopy')],
  ]

  return (
    <>
      <section className="bg-[#fffaf0] px-4 py-10 text-center sm:px-6 sm:py-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-red-700 sm:tracking-[0.24em]">{t('eventsEyebrow')}</p>
          <h1 className="mt-3 wrap-break-word font-serif text-3xl font-black leading-tight text-[#b91717] sm:text-6xl">
            {t('socialTitle')}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-stone-700 sm:text-lg sm:leading-8">
            {t('socialCopy')}
          </p>
          <Link to="/donate" className="mt-8 inline-flex rounded-full bg-[#b91717] px-6 py-3 font-black text-white shadow-xl shadow-red-900/20">
            {t('supportSeva')}
          </Link>
        </motion.div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-16">
        <SectionTitle eyebrow={t('sevaAreas')} title={t('sevaSectionTitle')} />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {initiatives.map(([title, body], index) => (
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

export default SocialWork
