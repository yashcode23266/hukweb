import { motion } from 'framer-motion'
import logo from '../assets/logo.png.jpeg'
import SectionTitle from '../components/SectionTitle'

const values = [
  ['Devotion', 'Every celebration begins with Ganpati Bappa and the faith of the devotees.'],
  ['Seva', 'We keep community service, transparency, and volunteer support at the heart of the mandal.'],
  ['Tradition', 'Our utsav carries forward Mumbai mandal culture with discipline, warmth, and pride.'],
]

function About() {
  return (
    <>
      <section className="bg-[#fffaf0] px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto grid size-64 place-items-center rounded-full bg-[#b91717] p-8 shadow-xl shadow-red-950/20"
          >
            <img src={logo} alt="Hukmilane Lanecha Raja logo" className="h-full w-full object-contain" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-red-700">Mandal Info</p>
            <h1 className="mt-3 font-serif text-5xl font-black leading-tight text-[#b91717] sm:text-7xl">
              About Hukmilane Lanecha Raja
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">
              *Hukmill Lane Cha Raja, located in the Delisle Road area of Mumbai, is recognized as the oldest public Ganesh idol in the locality. The **Hukmill Lane Sarvajanik Ganeshotsav Mandal* was established in *1934* by mill workers and local residents of Girangaon with the aim of promoting unity, brotherhood, and devotion towards Lord Ganesha. With a rich legacy spanning over nine decades, this Ganpati is considered a living symbol of Girangaon's cultural heritage.

                The unique identity of Hukmill Lane Cha Raja is its tradition of presenting *"Something New Every Year."* Over the years, Lord Ganesha has been depicted in various divine forms such as *Jai Malhar, Lord Krishna, Kalki, and Lord Shiva*, offering devotees a fresh and unique darshan experience each year.

From *1990 to 2016, renowned sculptor **Kashinath Matavkar* created several memorable idols for the mandal. Some of the most famous creations included a Ganesh idol made entirely from real bananas, another crafted using *5,555 coconuts, and the grand **Bahubali-themed Ganesh idol of 2015. The banana Ganpati attracted massive crowds, with devotees queuing up for nearly **500 to 600 meters* to seek blessings. The uniqueness of this idol also drew the attention of celebrated actor *Shatrughan Sinha*, who visited the mandal along with his family for darshan.

Hukmill Lane Cha Raja is known not only for its magnificent idols but also for its commitment to social service. The mandal regularly organizes *blood donation camps* and *health check-up camps*. During the COVID-19 pandemic, it provided ration kits to needy families, setting an inspiring example of community service.

In recognition of its outstanding work, the mandal was awarded the prestigious *Second Runner-Up* title in the *Mumbai Cha Raja Competition* in *2014*.

A perfect blend of *tradition, innovation, social responsibility, and unwavering devotion to Lord Ganesha, **Hukmill Lane Cha Raja* continues to be a symbol of faith for millions of devotees and a source of pride for Girangaon
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <SectionTitle eyebrow="Our Foundation" title="Faith, service, and togetherness">
          A modern digital presence for a traditional mandal, designed for devotees, volunteers, and supporters.
        </SectionTitle>

        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {values.map(([title, body], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-lg border border-orange-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 h-1.5 w-16 rounded-full bg-linear-to-r from-red-700 via-orange-500 to-amber-300" />
              <h2 className="text-2xl font-black text-stone-950">{title}</h2>
              <p className="mt-3 leading-7 text-stone-700">{body}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}

export default About
