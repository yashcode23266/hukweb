import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ganpatiImage from '../assets/ganpati-optimized.png'
import millImage from '../assets/mill.jpeg'
import peopleImage from '../assets/people.jpeg'
import image2014 from '../assets/2014.jpeg'
import image2015 from '../assets/2015.jpeg'
import bananaImage from '../assets/banana.jpeg'
import coconutImage from '../assets/coconut.jpeg'
import shivaImage from '../assets/shiva.jpeg'
import { useLanguage } from '../i18n/useLanguage'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

// Add or replace Events page images here.
// 1. Put your image inside frontend/src/assets
// 2. Import it above
// 3. Replace the matching value below
const moreThanEventsImages = [
  {
    duration: 36,
    reverse: false,
    images: [
      { src: image2015, height: 'h-56' },
      { src: peopleImage, height: 'h-72' },
      { src: bananaImage, height: 'h-48' },
    ],
  },
  {
    duration: 42,
    reverse: true,
    images: [
      { src: coconutImage, height: 'h-64' },
      { src: image2014, height: 'h-52' },
      { src: shivaImage, height: 'h-80' },
    ],
  },
  {
    duration: 38,
    reverse: false,
    images: [
      { src: ganpatiImage, height: 'h-52' },
      { src: millImage, height: 'h-72' },
      { src: image2015, height: 'h-60' },
    ],
  },
  {
    duration: 45,
    reverse: true,
    images: [
      { src: peopleImage, height: 'h-80' },
      { src: bananaImage, height: 'h-48' },
      { src: coconutImage, height: 'h-64' },
    ],
  },
  {
    duration: 40,
    reverse: false,
    images: [
      { src: shivaImage, height: 'h-56' },
      { src: image2014, height: 'h-72' },
      { src: ganpatiImage, height: 'h-52' },
    ],
  },
]

const eventImages = {
  hero: image2015,
  diwali: peopleImage,
  youth: millImage,
  patriotic: image2014,
  moreThanEvents: moreThanEventsImages,
}

const eventsText = {
  en: {
    label: 'Cultural & Community Activities',
    title: 'Celebrating Culture Beyond The Festival',
    subtitle: 'From Ganesh Utsav to community celebrations, every event brings people together.',
    viewEvents: 'View Events',
    exploreGallery: 'Explore Gallery',
    storyTitle: 'A Mandal That Celebrates Together',
    story:
      'Hukmill Lane Sarvajanik Ganeshotsav Mandal actively organizes various cultural, sports, and community activities throughout the year. Our annual Diwali Deepotsav brings together people of all age groups, with exciting games and competitions for children, youth, and senior citizens alike. The Mandal also organizes cricket tournaments, encouraging sportsmanship and community participation among young people.',
    quote: 'Strengthening community bonds through culture, sports, and patriotism.',
    diwaliTitle: 'Diwali Deepotsav',
    diwaliCopy:
      'A warm evening of glowing diyas, children’s games, family participation, friendly competitions, and festive togetherness.',
    youthTitle: 'Energy Of The Youth',
    youthCopy:
      'Cricket tournaments bring young people together through sportsmanship, teamwork, discipline, and the joy of local community participation.',
    patrioticTitle: 'Patriotism & Unity',
    patrioticCopy:
      'Independence Day and Republic Day are marked with flag hoisting, respectful gatherings, and a shared sense of national pride.',
    togetherTitle: 'More Than Events. A Shared Tradition.',
    togetherQuote: 'Every celebration becomes a memory for the community.',
    communityCollage: [
      ['Togetherness', 'Families gathered in celebration', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1300&q=80'],
      ['Youth', 'Cricket, games, and community energy', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=80'],
      ['Culture', 'Festival lights and shared traditions', 'https://images.unsplash.com/photo-1606293926249-ed16f8e41e6b?auto=format&fit=crop&w=900&q=80'],
      ['Patriotism', 'Unity through national celebrations', 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=900&q=80'],
    ],
    galleryTitle: 'Event Memories',
    gallery: ['Diwali Celebrations', 'Cricket Tournaments', 'Patriotic Events', 'Ganesh Utsav Moments', 'Community Gatherings'],
    finalQuote: 'A vibrant blend of culture, sports, community service, and patriotism.',
    mandal: 'Hukmill Lane Sarvajanik Ganeshotsav Mandal',
    finalLine: 'Celebrating Every Moment Together.',
    join: 'Join Community',
    viewGallery: 'View Gallery',
  },
  mr: {
    label: 'सांस्कृतिक आणि सामुदायिक उपक्रम',
    title: 'उत्सवाच्या पलीकडचा सांस्कृतिक सोहळा',
    subtitle: 'गणेशोत्सवापासून सामुदायिक कार्यक्रमांपर्यंत प्रत्येक उपक्रम लोकांना एकत्र आणतो.',
    viewEvents: 'कार्यक्रम पाहा',
    exploreGallery: 'गॅलरी पाहा',
    storyTitle: 'एकत्र साजरा करणारे मंडळ',
    story:
      'हुकमिल लेन सार्वजनिक गणेशोत्सव मंडळ वर्षभर विविध सांस्कृतिक, क्रीडा आणि सामुदायिक उपक्रमांचे आयोजन करते. आमचा वार्षिक दिवाळी दीपोत्सव सर्व वयोगटातील लोकांना एकत्र आणतो, ज्यामध्ये लहान मुले, तरुण आणि ज्येष्ठ नागरिकांसाठी खेळ आणि स्पर्धा आयोजित केल्या जातात. मंडळ क्रिकेट स्पर्धांचेही आयोजन करते, ज्यातून तरुणांमध्ये क्रीडाभावना आणि सामुदायिक सहभाग वाढतो.',
    quote: 'संस्कृती, क्रीडा आणि देशभक्तीमधून समुदायाचे नाते अधिक मजबूत करणे.',
    diwaliTitle: 'दिवाळी दीपोत्सव',
    diwaliCopy:
      'दिव्यांचा प्रकाश, मुलांचे खेळ, कुटुंबांचा सहभाग, मैत्रीपूर्ण स्पर्धा आणि उत्सवी एकत्रितपणाने भरलेली संध्याकाळ.',
    youthTitle: 'तरुणाईची ऊर्जा',
    youthCopy:
      'क्रिकेट स्पर्धा तरुणांना क्रीडाभावना, संघभावना, शिस्त आणि स्थानिक समुदायाच्या आनंदातून एकत्र आणतात.',
    patrioticTitle: 'देशभक्ती आणि एकता',
    patrioticCopy:
      'स्वातंत्र्य दिन आणि प्रजासत्ताक दिन ध्वजारोहण, आदरपूर्ण सभा आणि राष्ट्रीय अभिमानाच्या भावनेने साजरे केले जातात.',
    togetherTitle: 'कार्यक्रमांपेक्षा अधिक. एक सामायिक परंपरा.',
    togetherQuote: 'प्रत्येक उत्सव समुदायासाठी आठवण बनतो.',
    communityCollage: [
      ['एकत्रितपणा', 'उत्सवात एकत्र आलेली कुटुंबे', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1300&q=80'],
      ['तरुणाई', 'क्रिकेट, खेळ आणि समुदायाची ऊर्जा', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=80'],
      ['संस्कृती', 'उत्सवी प्रकाश आणि सामायिक परंपरा', 'https://images.unsplash.com/photo-1606293926249-ed16f8e41e6b?auto=format&fit=crop&w=900&q=80'],
      ['देशभक्ती', 'राष्ट्रीय सोहळ्यांतून एकता', 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=900&q=80'],
    ],
    galleryTitle: 'कार्यक्रमांच्या आठवणी',
    gallery: ['दिवाळी उत्सव', 'क्रिकेट स्पर्धा', 'देशभक्ती कार्यक्रम', 'गणेशोत्सव क्षण', 'समुदाय मेळावे'],
    finalQuote: 'संस्कृती, क्रीडा, समाजसेवा आणि देशभक्तीचा उत्साही संगम.',
    mandal: 'हुकमिल लेन सार्वजनिक गणेशोत्सव मंडळ',
    finalLine: 'प्रत्येक क्षण एकत्र साजरा करताना.',
    join: 'समुदायात सामील व्हा',
    viewGallery: 'गॅलरी पाहा',
  },
}

function VisualPanel({ label, src = ganpatiImage, tall = false, warm = false }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg shadow-[0_28px_80px_rgba(121,28,0,.15)] ${
        tall ? 'min-h-[520px]' : 'min-h-[360px]'
      } ${warm ? 'bg-[#ffe0a1]' : 'bg-[#fff0d4]'}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,198,65,.3),rgba(255,250,240,.36)),repeating-linear-gradient(90deg,rgba(154,17,17,.055)_0_1px,transparent_1px_42px)]" />
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#7c0909]/45 via-transparent to-transparent" />
      <p className="absolute bottom-6 left-6 right-6 text-sm font-black uppercase tracking-[0.28em] text-[#ffe0a1]">
        {label}
      </p>
    </div>
  )
}

function Events() {
  const { language } = useLanguage()
  const text = eventsText[language] || eventsText.en

  return (
    <main className="overflow-hidden bg-[#fff7e8] text-stone-950">
      <section className="relative min-h-[calc(100vh-64px)] bg-linear-to-br from-[#fffdf5] via-[#fff1d5] to-[#ffd98a] px-4 py-16 sm:px-6 lg:py-20">
        <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,transparent_0_20px,rgba(193,16,16,.07)_21px_22px)] opacity-60" />
        <div className="absolute left-1/2 top-4 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#ffc44d]/30 blur-3xl" />
        {[...Array(18)].map((_, index) => (
          <span
            key={index}
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#d59a18]/55 shadow-[0_0_18px_rgba(255,195,72,.65)]"
            style={{
              left: `${7 + ((index * 17) % 86)}%`,
              top: `${11 + ((index * 31) % 74)}%`,
              animation: `event-light ${5 + (index % 4)}s ease-in-out ${index * 0.18}s infinite alternate`,
            }}
          />
        ))}

        <div className="relative mx-auto flex min-h-[calc(100vh-180px)] max-w-7xl flex-col items-center justify-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b91111]">{text.label}</p>
            <h1 className="mx-auto mt-5 max-w-6xl font-serif text-5xl font-black leading-none text-[#a20f0f] sm:text-7xl lg:text-8xl">
              {text.title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-stone-800 sm:text-2xl">{text.subtitle}</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a href="#events-story" className="rounded-full bg-[#b91111] px-8 py-4 text-center font-black text-white shadow-xl shadow-red-950/20 transition hover:-translate-y-1 hover:bg-[#8d0909]">
                {text.viewEvents}
              </a>
              <Link to="/gallery" className="rounded-full border border-[#b91111]/25 bg-white/75 px-8 py-4 text-center font-black text-[#8d0909] shadow-lg transition hover:-translate-y-1 hover:border-[#b91111]">
                {text.exploreGallery}
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.12 }} className="relative mt-14 w-full max-w-5xl">
            <div className="absolute -inset-6 rounded-full bg-[#ffc44d]/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-lg border border-[#e9c56f]/50 bg-white/55 p-3 shadow-[0_30px_90px_rgba(121,28,0,.16)] backdrop-blur-sm">
              <VisualPanel label={text.label} src={eventImages.hero} />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="events-story" className="bg-[#fffaf0] px-4 py-18 sm:px-6 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <div className="h-1 w-28 rounded-full bg-linear-to-r from-[#b91111] to-[#e7aa24]" />
            <h2 className="mt-8 font-serif text-5xl font-black leading-tight text-[#a20f0f] sm:text-7xl">
              {text.storyTitle}
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <p className="text-lg leading-9 text-stone-800 sm:text-xl sm:leading-10">{text.story}</p>
            <blockquote className="mt-8 border-l-4 border-[#d69b19] pl-6 font-serif text-3xl font-black leading-tight text-[#8d0909]">
              “{text.quote}”
            </blockquote>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fff7e8] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <VisualPanel label={text.diwaliTitle} src={eventImages.diwali} tall warm />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b91111]">Deepotsav</p>
            <h2 className="mt-4 font-serif text-5xl font-black text-[#9f1111] sm:text-7xl">{text.diwaliTitle}</h2>
            <p className="mt-6 max-w-xl text-lg leading-9 text-stone-700 sm:text-xl">{text.diwaliCopy}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fff1df] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <div className="h-px max-w-sm bg-linear-to-r from-[#d69b19] to-transparent" />
            <h2 className="mt-7 font-serif text-5xl font-black text-[#9f1111] sm:text-7xl">{text.youthTitle}</h2>
            <p className="mt-6 max-w-xl text-lg leading-9 text-stone-700 sm:text-xl">{text.youthCopy}</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <VisualPanel label={text.youthTitle} src={eventImages.youth} />
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#fffaf0] px-4 py-16 sm:px-6 lg:py-24">
        <div className="absolute inset-0 bg-linear-to-r from-orange-100/45 via-white/20 to-emerald-100/40" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <VisualPanel label={text.patrioticTitle} src={eventImages.patriotic} />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b91111]">15 August / 26 January</p>
            <h2 className="mt-4 font-serif text-5xl font-black text-[#9f1111] sm:text-7xl">{text.patrioticTitle}</h2>
            <p className="mt-6 max-w-xl text-lg leading-9 text-stone-700 sm:text-xl">{text.patrioticCopy}</p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fff7e8] px-4 py-18 sm:px-6 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(255,196,77,.24),transparent_32%),radial-gradient(circle_at_18%_80%,rgba(185,17,17,.08),transparent_30%)]" />
        <div className="absolute inset-0 opacity-35 bg-[repeating-linear-gradient(90deg,rgba(154,17,17,.04)_0_1px,transparent_1px_56px)]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mx-auto max-w-5xl text-center"
          >
            <h2 className="mx-auto font-serif text-5xl font-black leading-[1.04] text-[#9f1111] sm:text-6xl lg:text-7xl">
              {text.togetherTitle}
            </h2>
            <div className="mx-auto mt-8 h-px max-w-2xl bg-linear-to-r from-transparent via-[#d69b19] to-transparent" />
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-stone-700">
              Celebrating culture, devotion, unity, and community through every generation.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative mx-auto mt-14 h-[680px] max-w-6xl overflow-hidden rounded-[2rem] border border-[#e7c579]/50 bg-[#fffaf0]/45 p-3 shadow-[0_32px_100px_rgba(121,28,0,.14)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-linear-to-b from-[#fff7e8] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-linear-to-t from-[#fff7e8] to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,196,77,.18),transparent_55%)]" />

            <div className="relative grid h-full grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              {eventImages.moreThanEvents.map(({ duration, reverse, images }, columnIndex) => (
                <motion.div
                  key={columnIndex}
                  animate={{ y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
                  transition={{ duration, repeat: Infinity, ease: 'linear' }}
                  className={`space-y-3 ${columnIndex === 4 ? 'hidden lg:block' : ''}`}
                >
                  {[...images, ...images].map(({ src, height }, imageIndex) => (
                    <figure
                      key={`${columnIndex}-${imageIndex}`}
                      className={`group relative ${height} overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_18px_55px_rgba(121,28,0,.13)]`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#6f0808]/45 via-transparent to-transparent opacity-80 transition group-hover:opacity-95" />
                    </figure>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-linear-to-br from-[#fffaf0] via-[#fff0d0] to-[#ffe6b2] px-4 py-20 text-center sm:px-6 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,190,46,.25),transparent_42%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5b72f]/12 blur-3xl" />
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative mx-auto max-w-5xl">
          <blockquote className="font-serif text-4xl font-black leading-tight text-[#9f1111] sm:text-6xl">
            “{text.finalQuote}”
          </blockquote>
          <p className="mt-8 text-xl font-black text-stone-800">{text.mandal}</p>
          <p className="mt-8 font-serif text-4xl font-black text-[#b98205]">{text.finalLine}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/gallery" className="rounded-full border border-[#b91111]/25 bg-white/75 px-8 py-4 font-black text-[#8d0909] shadow-lg transition hover:-translate-y-1 hover:border-[#b91111]">
              {text.viewGallery}
            </Link>
          </div>
        </motion.div>
      </section>

      <style>{`
        @keyframes event-light {
          from { transform: translate3d(0, 0, 0) scale(1); opacity: .35; }
          to { transform: translate3d(12px, -22px, 0) scale(1.28); opacity: .9; }
        }
      `}</style>
    </main>
  )
}

export default Events
