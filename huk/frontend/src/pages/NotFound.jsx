import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage'

const content = {
  en: {
    eyebrow: '404',
    title: 'This page could not be found',
    copy: 'The link may be old or the page may have moved. Return to the Mandal homepage to continue.',
    action: 'Return Home',
  },
  mr: {
    eyebrow: '४०४',
    title: 'हे पृष्ठ सापडले नाही',
    copy: 'ही लिंक जुनी असू शकते किंवा पृष्ठ हलवले गेले असू शकते. पुढे जाण्यासाठी मंडळाच्या मुख्यपृष्ठावर परत या.',
    action: 'मुख्यपृष्ठावर जा',
  },
}

function NotFound() {
  const { language } = useLanguage()
  const text = content[language] || content.en

  return (
    <section className="grid min-h-[65vh] place-items-center bg-[#fff8ea] px-4 py-16 text-center">
      <div className="max-w-2xl">
        <p className="text-sm font-black uppercase tracking-[0.35em] text-brand-red">{text.eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-brand-dark-red sm:text-6xl">{text.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-stone-700">{text.copy}</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-brand-red px-7 py-3 font-black text-white shadow-xl transition hover:-translate-y-0.5">
          {text.action}
        </Link>
      </div>
    </section>
  )
}

export default NotFound
