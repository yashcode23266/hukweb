import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { festivalDate } from '../utils/format'

function getParts() {
  const diff = Math.max(0, festivalDate().getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Countdown() {
  const { t } = useLanguage()
  const [parts, setParts] = useState(getParts)

  useEffect(() => {
    const id = setInterval(() => setParts(getParts()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
      {Object.entries(parts).map(([label, value]) => (
        <div key={label} className="glass rounded-lg p-3 text-center shadow-sm sm:p-4">
          <div className="text-3xl font-black leading-none text-brand-red sm:text-4xl">{String(value).padStart(2, '0')}</div>
          <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-stone-600 sm:text-xs">{t(`countdown${label[0].toUpperCase()}${label.slice(1)}`)}</div>
        </div>
      ))}
    </div>
  )
}

export default Countdown
