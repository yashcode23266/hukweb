import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'

const initiatives = [
  ['Food & Prasad Seva', 'Support organized food and prasad distribution during the utsav.'],
  ['Volunteer Support', 'Help with darshan management, visitor guidance, and mandal operations.'],
  ['Community Help', 'Contribute toward local welfare activities and emergency support initiatives.'],
]

function SocialWork() {
  return (
    <>
      <section className="bg-[#fffaf0] px-4 py-16 text-center sm:px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-red-700">Initiatives</p>
          <h1 className="mt-3 font-serif text-5xl font-black leading-tight text-[#b91717] sm:text-7xl">
            Social Work
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-700">
            Seva is the heart of the mandal. Donations and volunteer efforts help us serve devotees and the local community with care.
          </p>
          <Link to="/donate" className="mt-8 inline-flex rounded-full bg-[#b91717] px-6 py-3 font-black text-white shadow-xl shadow-red-900/20">
            Support Seva
          </Link>
        </motion.div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Seva Areas" title="Ways the mandal supports the community" />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {initiatives.map(([title, body], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-red-700 via-orange-500 to-amber-300" />
              <h2 className="text-2xl font-black text-stone-950">{title}</h2>
              <p className="mt-3 leading-7 text-stone-700">{body}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}

export default SocialWork
