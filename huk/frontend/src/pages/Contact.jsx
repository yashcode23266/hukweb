import SectionTitle from '../components/SectionTitle'
import { useLanguage } from '../i18n/useLanguage'

function Contact() {
  const { t } = useLanguage()
  const mapQuery = encodeURIComponent('Shree Ganpati Mandal Mumbai Maharashtra India')

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12">
      <SectionTitle eyebrow={t('locationEyebrow')} title={t('locationTitle')}>
        {t('locationCopy')}
      </SectionTitle>

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">
        <div className="min-w-0 rounded-lg border border-orange-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="wrap-break-wordword text-base font-black uppercase tracking-[0.22em] text-brand-red sm:text-lg sm:tracking-[0.3em]">{t('address')}</p>
          <h2 className="mt-2 wrap-break-word text-2xl font-black leading-tight text-stone-950">{t('mandalAddressTitle')}</h2>
          <p className="mt-3 text-lg font-semibold leading-7 text-stone-950 sm:text-xl">{t('mandalAddressShort')}</p>

          <p className="mt-6 wrap-break-word text-base font-black uppercase tracking-[0.22em] text-brand-red sm:text-lg sm:tracking-[0.3em]">{t('contact')}</p>
          <div className="mt-4 space-y-3 wrap-break-word text-base font-semibold leading-7 text-stone-950 sm:text-xl">
            <p>{t('contactPhoneFooter')}</p>
            <p>{t('contactEmailFooter')}</p>
            <p>{t('contactUpiFooter')}</p>
          </div>

          <a
            className="mt-6 inline-flex rounded-full bg-red-700 px-5 py-3 text-sm font-black text-white sm:text-base"
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noreferrer"
          >
            {t('openDirections')}
          </a>
        </div>

        <div className="overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm">
          <iframe
            className="h-72 w-full sm:h-105 lg:h-130"
            title={t('locationTitle')}
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
