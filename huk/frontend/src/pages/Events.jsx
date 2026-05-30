import { motion } from 'framer-motion'
import SectionTitle from '../components/SectionTitle'

const events = [
  ['Aarti & Darshan', 'Daily devotional moments for devotees visiting the mandal.'],
  ['Cultural Celebration', 'Festive cultural activities that bring families and local residents together.'],
  ['Prasad Seva', 'Organized prasad distribution with volunteer coordination and crowd-friendly planning.'],
  ['Visarjan Preparation', 'Disciplined, devotional, and community-led preparation for the farewell procession.'],
]

function Events() {
  return (
    <>
      <section className="bg-[#fffaf0] px-4 py-16 text-center sm:px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-red-700">Initiatives</p>
          <h1 className="mt-3 font-serif text-5xl font-black leading-tight text-[#b91717] sm:text-7xl">
            Events
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-700">
            Explore the main devotional and cultural event areas managed by the mandal during Ganpati Utsav.
          </p>
        </motion.div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Utsav Highlights" title="Devotional experiences for the community" />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {events.map(([title, body], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-lg border border-orange-200 bg-white p-7 shadow-sm"
            >
              <p className="text-sm font-black uppercase tracking-[0.2em] text-red-700">Event</p>
              <h2 className="mt-2 text-3xl font-black text-stone-950">{title}</h2>
              <p className="mt-3 leading-7 text-stone-700">{body}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Events
