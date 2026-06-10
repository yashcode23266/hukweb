import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import image1990 from '../assets/1990.jpeg'
import image1991 from '../assets/1991.jpeg'
import image1992 from '../assets/1992.jpeg'
import image1993 from '../assets/1993.jpeg'
import image1994 from '../assets/1994.jpeg'
import image1995 from '../assets/1995.jpeg'
import image1996 from '../assets/1996.jpeg'
import image1997 from '../assets/1997.jpeg'
import image1998 from '../assets/1998.jpeg'
import image1999 from '../assets/1999.jpeg'
import image2000 from '../assets/2000.jpeg'
import image2001 from '../assets/2001.jpeg'
import image2002 from '../assets/2002.jpeg'
import image2003 from '../assets/2003.jpeg'
import image2004 from '../assets/2004.jpeg'
import image2005 from '../assets/2005.jpeg'
import image2006 from '../assets/2006.jpeg'
import image2007 from '../assets/2007.jpeg'
import image2008 from '../assets/2008.jpeg'
import image2009 from '../assets/2009.jpeg'
import image2010 from '../assets/2010.jpeg'
import image2011 from '../assets/2011.jpeg'
import image2012 from '../assets/2012.jpeg'
import image2013 from '../assets/2013.jpeg'
import image2014 from '../assets/2014.jpeg'
import image2015 from '../assets/2015.jpeg'
import image2016 from '../assets/2016.jpeg'
import image2017 from '../assets/2017.jpeg'
import image2018 from '../assets/2018.jpeg'
import image2019 from '../assets/2019.jpeg'
import image2020 from '../assets/2020.jpeg'
import image2021 from '../assets/2021.jpeg'
import image2022 from '../assets/2022.jpeg'
import image2023 from '../assets/20233.jpeg'
import image2024 from '../assets/20244.jpeg'
import image2025 from '../assets/2025.jpeg'
import { useLanguage } from '../i18n/useLanguage'

const currentYear = 2025

const copy = {
  en: {
    brand: 'Hukmill Lane Cha Raja',
    since: 'Since 1934',
    title: 'Hukmill Lane Cha Raja Archive',
    intro: 'Scrolling through decades of Hukmill Lane Cha Raja memories.',
    scroll: 'Scroll to explore',
    range: `1990 — ${currentYear}`,
    close: 'Close',
    themes: [
      'Beginning of preserved memories.',
      'Devotion carried through generations.',
      'A new era of celebration.',
      'Faith, artistry, and community.',
      'Tradition with majestic grandeur.',
    ],
    finalQuote: 'Every year leaves behind a new memory.',
    bappa: 'Ganpati Bappa Morya!',
  },
  mr: {
    brand: 'हुकमिल लेनचा राजा',
    since: '१९३४ पासून',
    title: 'हुकमिल लेनचा राजा संग्रह',
    intro: 'हुकमिल लेनचा राजा यांच्या दशकानुदशकांच्या आठवणींचा प्रवास.',
    scroll: 'पाहण्यासाठी स्क्रोल करा',
    range: `१९९० — ${currentYear}`,
    close: 'बंद करा',
    themes: [
      'जपलेल्या आठवणींची सुरुवात.',
      'पिढ्यानपिढ्या वाहणारी भक्ती.',
      'उत्सवाच्या नव्या पर्वाची सुरुवात.',
      'श्रद्धा, कला आणि समुदाय.',
      'भव्यतेने जपलेली परंपरा.',
    ],
    finalQuote: 'प्रत्येक वर्ष एक नवी आठवण मागे ठेवते.',
    bappa: 'गणपती बाप्पा मोरया!',
  },
}

const galleryImageCycle = [
  image1990,
  image1991,
  image1992,
  image1993,
  image1994,
  image1995,
  image1996,
  image1997,
  image1998,
  image1999,
  image2000,
  image2001,
  image2002,
  image2003,
  image2004,
  image2005,
  image2006,
  image2007,
  image2008,
  image2009,
  image2010,
  image2011,
  image2012,
  image2013,
  image2014,
  image2015,
  image2016,
  image2017,
  image2018,
  image2019,
  image2020,
  image2021,
  image2022,
  image2023,
  image2024,
  image2025,
]

// Add new year-wise photos here.
// Example:
// import ganpati2026 from '../assets/ganpati-2026.jpeg'
// const yearImages = { 2026: ganpati2026 }
const yearImages = {
  1990: image1990,
  1991: image1991,
  1992: image1992,
  1993: image1993,
  1994: image1994,
  1995: image1995,
  1996: image1996,
  1997: image1997,
  1998: image1998,
  1999: image1999,
  2000: image2000,
  2001: image2001,
  2002: image2002,
  2003: image2003,
  2004: image2004,
  2005: image2005,
  2006: image2006,
  2007: image2007,
  2008: image2008,
  2009: image2009,
  2010: image2010,
  2011: image2011,
  2012: image2012,
  2013: image2013,
  2014: image2014,
  2015: image2015,
  2016: image2016,
  2017: image2017,
  2018: image2018,
  2019: image2019,
  2020: image2020,
  2021: image2021,
  2022: image2022,
  2023: image2023,
  2024: image2024,
  2025: image2025,
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

function buildArchive(text) {
  return Array.from({ length: currentYear - 1990 + 1 }, (_, index) => {
    const year = 1990 + index
    return {
      year,
      image: yearImages[year] || galleryImageCycle[index % galleryImageCycle.length],
      theme: text.themes[index % text.themes.length],
    }
  })
}

function Gallery() {
  const { language } = useLanguage()
  const text = copy[language] || copy.en
  const archive = useMemo(() => buildArchive(text), [text])
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const rowRef = useRef(null)
  const active = archive[activeIndex] || archive[0]
  const progress = archive.length > 1 ? (activeIndex / (archive.length - 1)) * 100 : 0

  function updateActiveIndex() {
    const row = rowRef.current
    if (!row) return

    const center = row.scrollLeft + row.clientWidth / 2
    const children = Array.from(row.children)
    let closestIndex = 0
    let closestDistance = Infinity

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2
      const distance = Math.abs(center - childCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  function handleWheel(event) {
    const row = rowRef.current
    if (!row || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return
    row.scrollBy({ left: event.deltaY, behavior: 'smooth' })
  }

  function focusArchiveItem(index) {
    setActiveIndex(index)
    rowRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <main className="overflow-hidden bg-[#fff8ea] text-stone-950">
      <section className="relative min-h-[calc(100vh-64px)] overflow-hidden px-4 py-6 sm:px-6 lg:py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,197,74,.18),transparent_46%)]" />
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative mx-auto max-w-7xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.34em] text-[#b91111]">{text.range}</p>
          <h1 className="mt-3 font-serif text-3xl font-black leading-none text-[#9f1111] sm:text-5xl lg:text-6xl">
            {text.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-700 sm:text-lg">{text.intro}</p>
        </motion.div>

        <div
          ref={rowRef}
          onScroll={updateActiveIndex}
          onWheel={handleWheel}
          className="relative mx-auto mt-5 flex max-w-7xl snap-x gap-8 overflow-x-auto scroll-smooth px-[36vw] pb-5 pt-3 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {archive.map((item, index) => {
            const isActive = index === activeIndex
            const distance = Math.abs(index - activeIndex)
            return (
              <motion.figure
                key={item.year}
                layout
                onClick={() => {
                  focusArchiveItem(index)
                  setSelectedItem(item)
                }}
                className={`group relative grid shrink-0 snap-center cursor-pointer place-items-center overflow-hidden rounded-[1.4rem] bg-[#fff1d6] p-3 shadow-[0_26px_80px_rgba(83,20,0,.14)] transition duration-500 sm:p-4 ${
                  isActive
                    ? 'h-auto w-auto max-w-[76vw] opacity-100'
                    : 'mt-8 h-auto w-auto max-w-[48vw] opacity-45 sm:max-w-70'
                } ${distance > 2 ? 'opacity-25' : ''}`}
              >
                <img
                  src={item.image}
                  alt={`Ganpati archive ${item.year}`}
                  className={`block h-auto w-auto object-contain transition duration-700 ${
                    isActive ? 'max-h-[46vh] max-w-[70vw] lg:max-h-[52vh]' : 'max-h-[28vh] max-w-[44vw] sm:max-h-[30vh]'
                  }`}
                />
              </motion.figure>
            )
          })}
        </div>

        <div className="relative mx-auto mt-3 max-w-4xl px-4">
          <div className="h-px bg-[#d8bc7a]" />
          <motion.div
            className="absolute left-4 top-0 h-px bg-[#9f1111]"
            animate={{ width: `calc(${progress}% - ${progress === 0 ? 0 : 16}px)` }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
          <motion.span
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-[#9f1111] bg-[#fff8ea] shadow-[0_0_0_6px_rgba(196,145,19,.12)]"
            animate={{ left: `calc(${progress}% + 10px)` }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </div>

        <motion.div
          key={active.year}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative mx-auto mt-3 max-w-3xl text-center"
        >
          <p className="font-serif text-6xl font-black leading-none text-[#9f1111] sm:text-8xl">{active.year}</p>
          <div className="mx-auto my-5 h-px max-w-sm bg-linear-to-r from-transparent via-[#c49113] to-transparent" />
          <p className="text-xl leading-8 text-stone-700">{active.theme}</p>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.28em] text-[#b91111]/70">{text.scroll}</p>
        </motion.div>
      </section>

      <section className="bg-[#fff8ea] px-4 py-20 text-center sm:px-6 lg:py-28">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto max-w-4xl">
          <blockquote className="font-serif text-4xl font-black leading-tight text-[#9f1111] sm:text-6xl">
            “{text.finalQuote}”
          </blockquote>
          <p className="mt-8 text-xl font-black text-stone-800">{text.brand}</p>
          <p className="mt-6 font-serif text-4xl font-black text-[#b98205]">{text.bappa}</p>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-[#3f0505]/35 px-4 py-8 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.article
              className="relative grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-[#dfbf75]/60 bg-[#fff8ea] shadow-[0_36px_120px_rgba(58,11,0,.28)] lg:grid-cols-[.9fr_1.1fr]"
              initial={{ opacity: 0, scale: 0.82, y: 36 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-[#c49113]/50 bg-[#fff8ea]/85 text-2xl leading-none text-[#9f1111] shadow-lg backdrop-blur transition hover:bg-[#9f1111] hover:text-white"
                aria-label={text.close}
              >
                ×
              </button>

              <div className="relative grid min-h-65 place-items-center overflow-hidden bg-[#fff0d1] p-5 sm:min-h-105">
                <motion.img
                  src={selectedItem.image}
                  alt={`Ganpati archive ${selectedItem.year}`}
                  className="h-full max-h-[68vh] w-full object-contain"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </div>

              <div className="relative flex flex-col justify-center px-7 py-10 sm:px-12">
                <p className="pointer-events-none absolute right-8 top-8 font-serif text-8xl font-black leading-none text-[#c49113]/16 sm:text-9xl">
                  {selectedItem.year}
                </p>
                <p className="relative text-xs font-black uppercase tracking-[0.3em] text-[#b91111]">{text.brand}</p>
                <h2 className="relative mt-5 font-serif text-6xl font-black leading-none text-[#9f1111] sm:text-8xl">
                  {selectedItem.year}
                </h2>
                <div className="relative my-7 h-px w-28 bg-linear-to-r from-[#9f1111] to-[#c49113]" />
                <p className="relative max-w-md text-xl leading-9 text-stone-700">{selectedItem.theme}</p>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Gallery
