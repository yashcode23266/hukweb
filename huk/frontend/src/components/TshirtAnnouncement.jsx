import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import tshirtImage from '../assets/tshirt.jpeg'
import { useLanguage } from '../i18n/useLanguage'

const content = {
  en: {
    label: 'Official Announcement',
    title: 'Mandal T-Shirt Bookings Are Open',
    copy: 'Book the official Hukmill Lane Cha Raja festival T-shirt today.',
    action: 'Buy T-Shirt',
    close: 'Close announcement',
  },
  mr: {
    label: 'अधिकृत घोषणा',
    title: 'मंडळाच्या टी-शर्टची बुकिंग सुरू',
    copy: 'हुकमिल लेन चा राजा अधिकृत उत्सव टी-शर्ट आजच बुक करा.',
    action: 'टी-शर्ट खरेदी करा',
    close: 'घोषणा बंद करा',
  },
}

function TshirtAnnouncement() {
  const { language } = useLanguage()
  const text = content[language] || content.en
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('tshirtAnnouncementDismissed') === 'true') return undefined
    const timer = window.setTimeout(() => setIsOpen(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  function closeAnnouncement() {
    sessionStorage.setItem('tshirtAnnouncementDismissed', 'true')
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-300 grid place-items-center bg-black/65 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeAnnouncement()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="shop-announcement-title"
        className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-[#fffaf0] shadow-2xl ring-1 ring-amber-200"
      >
        <button
          type="button"
          onClick={closeAnnouncement}
          aria-label={text.close}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-2xl leading-none text-brand-red shadow-lg transition hover:bg-amber-50"
        >
          ×
        </button>

        <div className="grid sm:grid-cols-[0.85fr_1.15fr]">
          <div className="min-h-52 bg-[#f4e4c5] sm:min-h-96">
            <img src={tshirtImage} alt="Official Hukmill Lane Cha Raja T-shirt" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center px-6 py-7 text-center sm:px-8 sm:py-10 sm:text-left">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-red">{text.label}</p>
            <h2 id="shop-announcement-title" className="mt-3 font-serif text-3xl font-black leading-tight text-brand-dark-red sm:text-4xl">
              {text.title}
            </h2>
            <p className="mt-4 leading-7 text-stone-700">{text.copy}</p>
            <Link
              to="/shop"
              onClick={closeAnnouncement}
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-red px-6 py-3 font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-brand-dark-red"
            >
              {text.action}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TshirtAnnouncement
