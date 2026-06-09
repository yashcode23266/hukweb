import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ganpatiImage from '../assets/ganpati-optimized.png'
import logoImage from '../assets/logo.png.jpeg'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

const timeline = [
  ['1934', 'Mandal Established', 'Mill workers and Girangaon families came together with faith, unity, and devotion.'],
  ['1990-2016', 'Kashinath Matavkar Era', 'A defining creative period shaped by memorable idols and devotional artistry.'],
  ['2015', 'Bahubali Theme Ganpati', 'A grand theme that became one of the mandal’s most remembered modern creations.'],
  ['Today', 'Digital Devotion & Community Seva', 'Darshan memories, seva work, donations, and community updates continue with a modern presence.'],
]

const divineForms = [
  ['Jai Malhar', 'Royal strength, folk devotion, and a powerful darshan mood.'],
  ['Lord Krishna', 'Graceful, musical, and filled with divine charm.'],
  ['Kalki', 'A vision of protection, courage, and cosmic renewal.'],
  ['Lord Shiva', 'Meditative energy, austerity, and timeless spiritual force.'],
]

const creations = [
  ['Banana Ganpati', 'A rare devotional creation remembered for its freshness, imagination, and festive wonder.'],
  ['5,555 Coconut Ganpati', 'A striking idol concept that transformed everyday offerings into a grand spiritual form.'],
  ['Bahubali Ganpati', 'A dramatic large-scale theme that brought cinematic scale to the mandal’s darshan experience.'],
]

const seva = [
  ['Blood Donation Camps', 'Devotees and volunteers come together to serve the city beyond the festival days.'],
  ['Health Check-Up Camps', 'Community wellness initiatives built around care, access, and local support.'],
  ['COVID Ration Support', 'Essential ration support for families during a difficult time for Mumbai.'],
]

function About() {
  return (
    <main className="overflow-hidden bg-[#fff7e8] text-stone-950">
      <section className="relative grid min-h-[calc(100vh-64px)] place-items-center bg-[radial-gradient(circle_at_center,#ffb21c_0%,#9f1010_42%,#3c0303_100%)] px-4 py-20 text-center text-white sm:px-6">
        <div className="absolute inset-0 opacity-30 bg-[repeating-radial-gradient(circle_at_center,transparent_0_16px,rgba(255,214,94,.42)_17px_18px)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,.12)_22%,rgba(0,0,0,.62)_76%)]" />
        <div className="pointer-events-none absolute inset-0">
          {[...Array(18)].map((_, index) => (
            <span
              key={index}
              className="absolute h-1.5 w-1.5 rounded-full bg-yellow-200/80 shadow-[0_0_18px_rgba(255,224,130,.9)]"
              style={{
                left: `${8 + ((index * 19) % 86)}%`,
                top: `${12 + ((index * 23) % 74)}%`,
                animation: `about-float ${5 + (index % 5)}s ease-in-out ${index * 0.25}s infinite alternate`,
              }}
            />
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center"
        >
          <div className="relative">
            <div className="absolute inset-8 rounded-full bg-yellow-300/30 blur-3xl" />
            <img
              src={logoImage}
              alt="Hukmill Lane Cha Raja logo"
              className="relative mx-auto h-34 w-34 rounded-full object-contain drop-shadow-[0_0_45px_rgba(255,210,87,.85)] sm:h-44 sm:w-44"
            />
          </div>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.35em] text-yellow-200 sm:text-base">
            Established 1934
          </p>
          <h1 className="mt-5 font-serif text-5xl font-black leading-none text-[#ffe7a3] drop-shadow-2xl sm:text-7xl lg:text-8xl">
            Hukmill Lane Cha Raja
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-orange-50 sm:text-2xl">
            Preserving Tradition with Majestic Grandeur.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#legacy"
              className="rounded-full bg-[#ffd66b] px-8 py-4 text-base font-black text-[#6f0808] shadow-[0_18px_50px_rgba(255,196,42,.35)] transition hover:-translate-y-1 hover:bg-white"
            >
              Explore Legacy
            </a>
            <Link
              to="/gallery"
              className="rounded-full border border-yellow-200/60 bg-white/10 px-8 py-4 text-base font-black text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white hover:text-[#8e0808]"
            >
              View Gallery
            </Link>
          </div>
        </motion.div>
      </section>

      <section id="legacy" className="bg-[#fff7e8] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative min-h-[320px] overflow-hidden rounded-lg bg-[#5d0707] shadow-2xl sm:min-h-[420px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,214,107,.22),rgba(82,6,6,.72)),repeating-linear-gradient(90deg,rgba(255,255,255,.08)_0_1px,transparent_1px_42px)]" />
            <img src={ganpatiImage} alt="" className="absolute bottom-0 left-1/2 h-[92%] max-w-full -translate-x-1/2 object-contain opacity-80" />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#3d0303] to-transparent p-7 text-white">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-200">Girangaon Spirit</p>
              <p className="mt-3 max-w-md text-2xl font-black">Mill workers, local families, and one shared devotion.</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="min-w-0"
          >
            <div className="border-l-4 border-[#c20d0d] pl-6 sm:pl-8">
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#b91111]">Origin Story</p>
              <h2 className="mt-4 max-w-3xl wrap-break-word font-serif text-4xl font-black leading-tight text-[#921111] sm:text-5xl lg:text-6xl">
                Born From Faith & Unity
              </h2>
              <p className="mt-7 max-w-3xl wrap-break-word text-lg leading-9 text-stone-800 sm:text-xl sm:leading-10">
                <span className="font-black text-[#b91111]">Hukmill Lane Cha Raja</span>, located in the Delisle Road
                area of Mumbai, is recognized as the oldest public Ganesh idol in the locality. The{' '}
                <span className="font-black text-[#b98205]">Hukmill Lane Sarvajanik Ganeshotsav Mandal</span> was
                established in 1934 by mill workers and local residents of Girangaon with the aim of promoting unity,
                brotherhood, and devotion towards Lord Ganesha.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#4b0505] px-4 py-16 text-white sm:px-6 lg:py-24">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#ffd56a_1px,transparent_1px)] bg-size-[34px_34px]" />
        <div className="relative mx-auto max-w-5xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-200">Timeline Journey</p>
            <h2 className="mt-4 font-serif text-4xl font-black text-[#ffe0a1] sm:text-6xl">A Legacy In Motion</h2>
          </motion.div>
          <div className="relative mt-14 space-y-10 before:absolute before:left-4 before:top-2 before:h-full before:w-px before:bg-linear-to-b before:from-yellow-300 before:via-red-300 before:to-transparent sm:before:left-1/2">
            {timeline.map(([year, title, copy], index) => (
              <motion.article
                key={year}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className={`relative pl-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0 ${index % 2 ? 'sm:text-left' : 'sm:text-right'}`}
              >
                <div className={`absolute left-0 top-3 h-9 w-9 rounded-full border-4 border-[#4b0505] bg-[#ffd56a] shadow-[0_0_30px_rgba(255,213,106,.9)] sm:left-1/2 sm:-translate-x-1/2`} />
                <div className={index % 2 ? 'sm:col-start-2' : ''}>
                  <span className="font-serif text-6xl font-black text-white/10 sm:text-7xl">{year}</span>
                  <h3 className="-mt-5 text-2xl font-black text-[#ffe0a1]">{title}</h3>
                  <p className="mt-3 leading-8 text-orange-50/85">{copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#260202] px-4 py-16 text-white sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-200">Darshan Memories</p>
            <h2 className="mt-4 font-serif text-4xl font-black text-[#ffe0a1] sm:text-6xl">Divine Forms Through The Years</h2>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {divineForms.map(([title, copy]) => (
              <motion.article
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="group relative min-h-80 overflow-hidden rounded-lg border border-yellow-200/15 bg-[#5a0808] p-6 shadow-2xl"
              >
                <img src={ganpatiImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 transition duration-500 group-hover:scale-105 group-hover:opacity-30" />
                <div className="absolute inset-0 bg-linear-to-t from-[#260202] via-[#4e0505]/70 to-transparent" />
                <div className="relative flex h-full flex-col justify-end">
                  <div className="mb-5 h-1 w-20 rounded-full bg-linear-to-r from-[#cf130b] to-[#ffd56a]" />
                  <h3 className="font-serif text-3xl font-black text-[#ffe0a1]">{title}</h3>
                  <p className="mt-4 leading-7 text-orange-50/85">{copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff7e8] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b91111]">Iconic Creations</p>
            <h2 className="mt-4 font-serif text-4xl font-black text-[#921111] sm:text-6xl">Crafted With Devotion</h2>
          </motion.div>
          <div className="mt-14 space-y-14">
            {creations.map(([title, copy], index) => (
              <motion.article
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className={`grid gap-8 lg:grid-cols-2 lg:items-center ${index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="relative min-h-80 overflow-hidden rounded-lg bg-[#5a0808] shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,213,106,.28),transparent_54%)]" />
                  <img src={ganpatiImage} alt="" className="absolute inset-0 h-full w-full object-contain p-8 drop-shadow-[0_25px_55px_rgba(0,0,0,.55)]" />
                </div>
                <div>
                  <div className="mb-6 h-1 w-28 rounded-full bg-linear-to-r from-[#c20d0d] to-[#f2b11d]" />
                  <h3 className="font-serif text-4xl font-black text-[#921111] sm:text-5xl">{title}</h3>
                  <p className="mt-5 text-lg leading-9 text-stone-800">{copy}</p>
                  <p className="mt-6 text-base font-black uppercase tracking-[0.22em] text-[#b98205]">
                    Created by renowned sculptor Kashinath Matavkar.
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff1df] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b91111]">Social Seva</p>
            <h2 className="mt-4 font-serif text-4xl font-black text-[#921111] sm:text-6xl">Beyond Celebration</h2>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {seva.map(([title, copy]) => (
              <motion.article
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="rounded-lg border border-orange-200/70 bg-white/80 p-7 shadow-[0_18px_50px_rgba(128,42,0,.12)] backdrop-blur"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#fff0c7] text-2xl text-[#b91111] shadow-inner">
                  ॐ
                </div>
                <h3 className="mt-8 text-2xl font-black text-[#780909]">{title}</h3>
                <p className="mt-4 leading-8 text-stone-700">{copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes about-float {
          from { transform: translate3d(0, 0, 0) scale(1); opacity: .45; }
          to { transform: translate3d(10px, -22px, 0) scale(1.35); opacity: 1; }
        }
      `}</style>
    </main>
  )
}

export default About
