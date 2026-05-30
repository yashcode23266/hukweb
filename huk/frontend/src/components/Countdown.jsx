import { useEffect, useState } from 'react'
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
  const [parts, setParts] = useState(getParts)

  useEffect(() => {
    const id = setInterval(() => setParts(getParts()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {Object.entries(parts).map(([label, value]) => (
        <div key={label} className="glass rounded-lg p-3 text-center shadow-sm">
          <div className="text-2xl font-black text-red-800 sm:text-4xl">{String(value).padStart(2, '0')}</div>
          <div className="text-xs font-bold uppercase tracking-widest text-stone-600">{label}</div>
        </div>
      ))}
    </div>
  )
}

export default Countdown
