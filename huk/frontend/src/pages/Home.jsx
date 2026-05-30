import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import Countdown from '../components/Countdown'
import SectionTitle from '../components/SectionTitle'
import ganpati from '../assets/ganpati.png.jpeg'
import { fallbackGallery } from '../data/fallback'

function Home() {
  const { data: gallery = fallbackGallery } = useQuery({
    queryKey: ['gallery-preview'],
    queryFn: async () => (await api.get('/gallery')).data,
    retry: 1,
  })
  const galleryPreview = gallery.slice(0, 6)

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[82vh] overflow-hidden bg-[#f8f8f8] px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-162.5-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/20 blur-[120px]" />
          <div className="absolute left-1/2 top-[20%] h-105 w-105 -translate-x-1/2 rounded-full bg-brand-orange/15 blur-[90px]" />
          <div className="absolute inset-0 bg-linear-to-b from-[#f7f7f7] via-[#f5f5f5] to-[#f1f1f1]" />
        </div>

        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center justify-center">
          <div className="mandala-halo scale-[1.15] opacity-70" />
          <motion.img
            src={ganpati}
            alt="Ganpati Bappa"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-h-190 w-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.28)]"
          />
        </div>
      </section>

      {/* COUNTDOWN SECTION */}
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-orange-200">
          <Countdown />
        </div>
      </section>

      {/* MANDAL HISTORY SECTION */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl bg-[#f6f1e7] shadow-2xl"
          >
            <img src={ganpati} alt="Ganpati History" className="h-105 w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-red">Mandal History</p>
            <h2 className="mt-4 font-serif text-4xl font-black leading-tight text-brand-dark-red sm:text-6xl">
              A living tradition of devotion, seva, and celebration.
            </h2>
            <p className="mt-6 text-lg leading-8 text-stone-700">
              Inspired by Mumbai's grand mandal tradition, this digital experience brings darshan updates,
              donations, gallery memories, shop orders and seva management into one place for devotees and volunteers.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex rounded-full bg-brand-red px-8 py-4 font-black text-white shadow-xl transition hover:-translate-y-1"
            >
              Read More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DONATION CTA SECTION */}
      <section className="bg-[#fff1f1] px-4 py-24 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <h2 className="font-serif text-5xl font-black text-brand-red sm:text-6xl">Donation</h2>
          <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-stone-800 sm:text-2xl">
            You can contribute in the form of donations for various social initiatives organized by the festival committee.
          </p>
          <Link
            to="/donate"
            className="mt-10 inline-flex rounded-full bg-brand-red px-12 py-5 text-xl font-bold text-white shadow-xl shadow-red-900/20 transition hover:-translate-y-1 hover:bg-brand-dark-red"
          >
            Donate Now
          </Link>
        </motion.div>
      </section>

      {/* PHOTO GALLERY PREVIEW */}
      <section className="bg-[#fffaf0] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Photo Gallery" title="Utsav Memories">
            A glimpse of past darshan, decoration, aarti, and seva moments from the mandal.
          </SectionTitle>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryPreview.map((item, index) => (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-orange-200"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-brand-red px-4 py-2 text-sm font-black text-white shadow-lg">
                    {item.year}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-black text-brand-dark-red">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 leading-7 text-stone-700">{item.story}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/gallery"
              className="inline-flex rounded-full bg-brand-red px-8 py-4 font-black text-white shadow-xl shadow-red-900/20 transition hover:-translate-y-1"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-[#f7eded] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center font-serif text-4xl font-black text-brand-red">Contact Us</h2>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="mt-1 text-sm font-black uppercase tracking-[0.2em] text-brand-red">Phone</div>
                <p className="text-2xl font-medium text-stone-800">022 24711414</p>
              </div>

              <div className="flex items-start gap-6">
                <div className="mt-1 text-sm font-black uppercase tracking-[0.2em] text-brand-red">Email</div>
                <p className="text-2xl font-medium text-stone-800">mumbaicharaja.lsum@gmail.com</p>
              </div>

              <div className="flex items-start gap-6">
                <div className="mt-1 text-sm font-black uppercase tracking-[0.2em] text-brand-red">Location</div>
                <p className="max-w-xl text-2xl leading-relaxed text-stone-800">
                  Lalbaug Sarvajanik Utsav Mandal Ganesh Galli, 9/10 Kalyani Nivas, Lalbaug,
                  Mumbai, Maharashtra 400012, India
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl shadow-2xl"
            >
              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Lalbaug%20Mumbai&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
