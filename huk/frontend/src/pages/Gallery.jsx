import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { api } from '../api/client'
import SectionTitle from '../components/SectionTitle'
import { fallbackGallery } from '../data/fallback'

function Gallery() {
  const [year, setYear] = useState('all')
  const { data = fallbackGallery } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => (await api.get('/gallery')).data,
    retry: 1,
  })
  const years = useMemo(() => ['all', ...new Set(data.map((item) => item.year))], [data])
  const visible = year === 'all' ? data : data.filter((item) => String(item.year) === String(year))

  return (
    <section className="px-4 py-12 sm:px-6">
      <SectionTitle eyebrow="Gallery" title="Memories Through The Years">
        Past decorations, aarti evenings, seva moments, and stories from the mandal.
      </SectionTitle>
      <div className="mx-auto mb-8 flex max-w-7xl gap-2 overflow-x-auto">
        {years.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setYear(item)}
            className={`shrink-0 rounded-full px-4 py-2 font-black ${
              String(year) === String(item) ? 'bg-red-700 text-white' : 'bg-white text-red-800'
            }`}
          >
            {item === 'all' ? 'All Years' : item}
          </button>
        ))}
      </div>
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <motion.article
            key={item._id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="overflow-hidden rounded-lg border border-orange-200 bg-white shadow-sm"
          >
            <img src={item.imageUrl} alt={item.title} className="h-72 w-full object-cover" />
            <div className="p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-700">{item.year}</p>
              <h2 className="mt-1 text-xl font-black text-stone-950">{item.title}</h2>
              <p className="mt-2 text-stone-700">{item.story}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Gallery
