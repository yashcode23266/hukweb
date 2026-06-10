import { motion } from 'framer-motion'
import ganpatiImage from '../assets/ganpati-optimized.png'
import millImage from '../assets/mill.jpeg'
import peopleImage from '../assets/people.jpeg'
import oldMandalImage from '../assets/1mill.jpeg'
import { useLanguage } from '../i18n/useLanguage'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

// Add or replace Social Work page images here.
// 1. Put your image inside frontend/src/assets
// 2. Import it above
// 3. Replace the matching value below
const socialWorkImages = {
  hero: peopleImage,
  story: millImage,
  chapters: [peopleImage, millImage, oldMandalImage],
  final: ganpatiImage,
}

const pageText = {
  en: {
    label: 'Social Service',
    title: 'Seva Beyond Celebration',
    subtitle: 'Devotion to Lord Ganesha. Responsibility towards Society.',
    micro: 'Every act of service is an offering to Bappa.',
    support: 'Support Seva',
    volunteer: 'Become Volunteer',
    storyTitle: 'When Devotion Becomes Service',
    story:
      'Hukmill Lane Sarvajanik Ganeshotsav Mandal is not limited to celebrating the Ganesh festival alone; it is also committed to serving society through various welfare initiatives. During the challenging period of the COVID-19 pandemic, the Mandal extended support to needy families by distributing ration supplies. Free health check-up camps were also organized to promote the well-being of local residents. In 2021, the Mandal successfully conducted a blood donation camp, making a meaningful contribution to society.',
    storyQuote: 'Social service remains one of our core values.',
    chapters: [
      ['COVID Relief Support', 'Helping needy families through ration distribution during difficult times.'],
      ['Health Check-Up Camps', 'Supporting wellness and healthcare for local residents.'],
      ['Blood Donation Camp 2021', 'Making a meaningful contribution to society through donation drives.'],
    ],
    finalQuote: 'A perfect blend of devotion to Lord Ganesha and service to society.',
    mandal: 'Hukmill Lane Sarvajanik Ganeshotsav Mandal',
    bappa: 'Ganpati Bappa Morya!',
  },
  mr: {
    label: 'सामाजिक सेवा',
    title: 'उत्सवाच्या पलीकडची सेवा',
    subtitle: 'श्री गणेशावरील भक्ती आणि समाजाप्रती जबाबदारी.',
    micro: 'सेवेचा प्रत्येक क्षण बाप्पाला अर्पण आहे.',
    support: 'सेवेला साथ द्या',
    volunteer: 'स्वयंसेवक बना',
    storyTitle: 'भक्ती जेव्हा सेवेत बदलते',
    story:
      'हुकमिल लेन सार्वजनिक गणेशोत्सव मंडळ केवळ गणेशोत्सव साजरा करण्यापुरते मर्यादित नसून विविध समाजोपयोगी उपक्रमांद्वारे समाजसेवेसाठीही कटिबद्ध आहे. कोविड-१९ महामारीच्या कठीण काळात मंडळाने गरजू कुटुंबांना रेशन साहित्य वाटप करून मदत केली. स्थानिक रहिवाशांच्या आरोग्यासाठी मोफत आरोग्य तपासणी शिबिरेही आयोजित केली गेली. २०२१ मध्ये मंडळाने रक्तदान शिबिर यशस्वीपणे आयोजित करून समाजासाठी अर्थपूर्ण योगदान दिले.',
    storyQuote: 'सामाजिक सेवा हे आमच्या मुख्य मूल्यांपैकी एक आहे.',
    chapters: [
      ['कोविड मदतकार्य', 'कठीण काळात गरजू कुटुंबांना रेशन वाटपातून मदत.'],
      ['आरोग्य तपासणी शिबिरे', 'स्थानिक रहिवाशांच्या आरोग्य आणि वैद्यकीय मदतीसाठी उपक्रम.'],
      ['रक्तदान शिबिर २०२१', 'रक्तदान मोहिमेद्वारे समाजासाठी अर्थपूर्ण योगदान.'],
    ],
    finalQuote: 'श्री गणेशावरील भक्ती आणि समाजसेवेचा सुंदर संगम.',
    mandal: 'हुकमिल लेन सार्वजनिक गणेशोत्सव मंडळ',
    bappa: 'गणपती बाप्पा मोरया!',
  },
}

function ImageFrame({ label, src = ganpatiImage, tall = false }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-[#fff0d4] shadow-[0_28px_80px_rgba(121,28,0,.15)] ${
        tall ? 'min-h-140' : 'min-h-90'
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,198,65,.28),rgba(255,250,240,.35)),repeating-linear-gradient(90deg,rgba(154,17,17,.05)_0_1px,transparent_1px_42px)]" />
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#7c0909]/45 via-transparent to-transparent" />
      <p className="absolute bottom-6 left-6 right-6 text-sm font-black uppercase tracking-[0.28em] text-[#ffe0a1]">
        {label}
      </p>
    </div>
  )
}

function SocialWork() {
  const { language } = useLanguage()
  const text = pageText[language] || pageText.en

  return (
    <main className="overflow-hidden bg-[#fff7e8] text-stone-950">
      <section className="relative min-h-[calc(100vh-64px)] bg-linear-to-br from-[#fffdf5] via-[#fff4df] to-[#ffe8bd] px-4 py-16 sm:px-6 lg:py-20">
        <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,transparent_0_20px,rgba(193,16,16,.07)_21px_22px)] opacity-70" />
        <div className="absolute left-1/2 top-10 h-115 w-115 -translate-x-1/2 rounded-full bg-[#ffc44d]/25 blur-3xl" />
        {[...Array(14)].map((_, index) => (
          <span
            key={index}
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#d59a18]/50 shadow-[0_0_18px_rgba(255,195,72,.65)]"
            style={{
              left: `${8 + ((index * 19) % 84)}%`,
              top: `${12 + ((index * 29) % 72)}%`,
              animation: `seva-light ${5 + (index % 4)}s ease-in-out ${index * 0.18}s infinite alternate`,
            }}
          />
        ))}

        <div className="relative mx-auto flex min-h-[calc(100vh-180px)] max-w-7xl flex-col items-center justify-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b91111]">{text.label}</p>
            <h1 className="mx-auto mt-5 max-w-5xl font-serif text-5xl font-black leading-none text-[#a20f0f] sm:text-7xl lg:text-8xl">
              {text.title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-stone-800 sm:text-2xl">{text.subtitle}</p>
            <p className="mt-5 font-serif text-2xl font-black text-[#b98205]">{text.micro}</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.12 }}
            className="relative mt-14 w-full max-w-5xl"
          >
            <div className="absolute -inset-6 rounded-full bg-[#ffc44d]/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-lg border border-[#e9c56f]/50 bg-white/55 p-3 shadow-[0_30px_90px_rgba(121,28,0,.16)] backdrop-blur-sm">
              <ImageFrame label={text.micro} src={socialWorkImages.hero} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-4 py-18 sm:px-6 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <div className="h-1 w-28 rounded-full bg-linear-to-r from-[#b91111] to-[#e7aa24]" />
            <h2 className="mt-8 font-serif text-5xl font-black leading-tight text-[#a20f0f] sm:text-7xl">
              {text.storyTitle}
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <div className="mb-8 overflow-hidden rounded-lg bg-[#fff0d4] shadow-[0_24px_70px_rgba(121,28,0,.12)]">
              <img src={socialWorkImages.story} alt="" className="h-64 w-full object-cover sm:h-82" />
            </div>
            <p className="text-lg leading-9 text-stone-800 sm:text-xl sm:leading-10">{text.story}</p>
            <blockquote className="mt-8 border-l-4 border-[#d69b19] pl-6 font-serif text-3xl font-black leading-tight text-[#8d0909]">
              “{text.storyQuote}”
            </blockquote>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fff7e8] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-20">
          {text.chapters.map(([title, copy], index) => (
            <motion.article
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className={`grid gap-10 lg:grid-cols-2 lg:items-center ${index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <ImageFrame label={title} src={socialWorkImages.chapters[index] || socialWorkImages.hero} />
              <div>
                <div className="mb-7 h-px max-w-sm bg-linear-to-r from-[#d69b19] to-transparent" />
                <h3 className="font-serif text-4xl font-black text-[#9f1111] sm:text-6xl">{title}</h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-stone-700 sm:text-xl">{copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative bg-linear-to-br from-[#fffaf0] via-[#fff0d0] to-[#ffe6b2] px-4 py-20 text-center sm:px-6 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,190,46,.25),transparent_42%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5b72f]/12 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,17,17,.08),transparent_36%)]" />
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative mx-auto max-w-5xl">
          <blockquote className="font-serif text-4xl font-black leading-tight text-[#9f1111] sm:text-6xl">
            “{text.finalQuote}”
          </blockquote>
          <p className="mt-8 text-xl font-black text-stone-800">{text.mandal}</p>
          <p className="mt-8 font-serif text-4xl font-black text-[#b98205]">{text.bappa}</p>
        </motion.div>
      </section>

      <style>{`
        @keyframes seva-light {
          from { transform: translate3d(0, 0, 0) scale(1); opacity: .35; }
          to { transform: translate3d(12px, -22px, 0) scale(1.28); opacity: .9; }
        }
      `}</style>
    </main>
  )
}

export default SocialWork
