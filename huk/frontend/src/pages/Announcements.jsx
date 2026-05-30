import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { api } from '../api/client'
import SectionTitle from '../components/SectionTitle'
import { fallbackAnnouncements } from '../data/fallback'

function Announcements() {
  const { data = fallbackAnnouncements } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => (await api.get('/announcements')).data,
    retry: 1,
  })

  return (
    <section className="px-4 py-12 sm:px-6">
      <SectionTitle eyebrow="Updates" title="Latest Announcements">
        Aarti timings, seva notices, crowd guidance, and mandal updates in one place.
      </SectionTitle>
      <div className="mx-auto max-w-4xl space-y-4">
        {data.map((item, index) => (
          <motion.article
            key={item._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-lg border border-orange-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black uppercase tracking-widest text-red-800">
                {item.category || 'Update'}
              </span>
              {item.isPinned ? <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-red-950">Pinned</span> : null}
            </div>
            <h2 className="mt-3 text-2xl font-black text-stone-950">{item.title}</h2>
            <p className="mt-2 leading-7 text-stone-700">{item.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Announcements
