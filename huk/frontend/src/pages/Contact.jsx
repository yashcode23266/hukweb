import SectionTitle from '../components/SectionTitle'
import { useLanguage } from '../i18n/LanguageContext'

function Contact() {
  const { t } = useLanguage()
  const mapQuery = encodeURIComponent('Shree Ganpati Mandal Mumbai Maharashtra India')

  return (
    <section className="px-4 py-12 sm:px-6">
      <SectionTitle eyebrow={t('locationEyebrow')} title={t('locationTitle')}>
        {t('locationCopy')}
      </SectionTitle>

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[420px_1fr]">
        <div className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-700">{t('address')}</p>
          <h2 className="mt-2 text-2xl font-black text-stone-950">Shree Ganpati Mandal</h2>
          <p className="mt-3 leading-7 text-stone-700">Mumbai, Maharashtra, India</p>

          <p className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-red-700">{t('contact')}</p>
          <div className="mt-3 space-y-2 text-stone-700">
            <p>Phone: +91 98765 43210</p>
            <p>Email: seva@ganpatimandal.org</p>
            <p>UPI: ganpatimandal@upi</p>
          </div>

          <a
            className="mt-6 inline-flex rounded-full bg-red-700 px-5 py-3 font-black text-white"
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noreferrer"
          >
            {t('openDirections')}
          </a>
        </div>

        <div className="overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm">
          <iframe
            className="h-[520px] w-full"
            title="Shree Ganpati Mandal map location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          />
        </div>
      </div>
    </section>
  )
}

export default Contact
