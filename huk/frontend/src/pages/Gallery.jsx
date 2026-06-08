import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { api } from '../api/client'
import SectionTitle from '../components/SectionTitle'
import { fallbackGallery } from '../data/fallback'
import { useLanguage } from '../i18n/useLanguage'

function Gallery() {
  const { t, tObject } = useLanguage()
  const [year, setYear] = useState('all')
  const { data = fallbackGallery } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => (await api.get('/gallery')).data,
    retry: 1,
  })
  const years = useMemo(() => ['all', ...new Set(data.map((item) => item.year))], [data])
  const visible = year === 'all' ? data : data.filter((item) => String(item.year) === String(year))
  const translatedGallery = tObject('galleryItems')
  const translatedVisible = visible.map((item) => ({
    ...item,
    title: translatedGallery[item._id]?.title || item.title,
    story: translatedGallery[item._id]?.story || item.story,
  }))

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12">
      <SectionTitle eyebrow={t('galleryEyebrow')} title={t('galleryTitle')}>
        {t('galleryCopy')}
      </SectionTitle>
      <div className="mx-auto mb-8 flex max-w-7xl gap-2 overflow-x-auto pb-2">
        {years.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setYear(item)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-black shadow-sm sm:text-base ${
              String(year) === String(item) ? 'bg-red-700 text-white' : 'bg-white text-red-800'
            }`}
          >
            {item === 'all' ? t('allYears') : item}
          </button>
        ))}
      </div>
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {translatedVisible.map((item, index) => (
          <motion.article
            key={item._id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="min-w-0 overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm"
          >
            <img src={item.imageUrl} alt={item.title} className="h-52 w-full object-cover sm:h-72" />
            <div className="p-5">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-red-700 sm:tracking-[0.2em]">{item.year}</p>
              <h2 className="mt-1 wrap-break-word text-xl font-black leading-tight text-stone-950">{item.title}</h2>
              <p className="mt-2 leading-7 text-stone-700">{item.story}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Gallery
