import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ganpatiImage from '../assets/mill.jpeg'
import mill from '../assets/1mill.jpeg'
import ganpatiHero from '../assets/ganpati-optimized.png'
import shivaImage from '../assets/shiva.jpeg'
import people from '../assets/people.jpeg'
import bahu from '../assets/bahu.jpeg'
import image2014 from '../assets/2014.jpeg'
import image2015 from '../assets/2015.jpeg'
import bananaImage from '../assets/banana.jpeg'
import coconutImage from '../assets/coconut.jpeg'
import krishImage from '../assets/krish.png'
import logoImage from '../assets/logo.png.jpeg'
import { useLanguage } from '../i18n/useLanguage'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

const divineFormImages = [image2014, krishImage, ganpatiHero, shivaImage]
const creationImages = [bananaImage, coconutImage, image2015]
const timelineImages = [ganpatiImage, mill, bahu, people]

const aboutContent = {
  en: {
    heroKicker: 'Established 1934',
    heroTitle: 'Hukmil Lane Cha Raja',
    heroCopy: 'Preserving Tradition with Majestic Grandeur.',
    exploreLegacy: 'Explore Legacy',
    viewGallery: 'View Gallery',
    visualKicker: 'Girangaon Spirit',
    visualTitle: 'Mill workers, local families, and one shared devotion.',
    originKicker: 'Origin Story',
    originTitle: 'Born From Faith & Unity',
    originPartOne: 'Hukmill Lane Cha Raja',
    originPartTwo:
      ', located in the Delisle Road area of Mumbai, is recognized as the oldest public Ganesh idol in the locality. The ',
    originHighlight: 'Hukmill Lane Sarvajanik Ganeshotsav Mandal',
    originPartThree:
      ' was established in 1934 by mill workers and local residents of Girangaon with the aim of promoting unity, brotherhood, and devotion towards Lord Ganesha.',
    timelineKicker: 'Timeline Journey',
    timelineTitle: 'A Legacy In Motion',
    divineKicker: 'Darshan Memories',
    divineTitle: 'Divine Forms Through The Years',
    creationsKicker: 'Iconic Creations',
    creationsTitle: 'Crafted With Devotion',
    sculptorLine: 'Created by renowned sculptor Kashinath Matavkar.',
    sevaKicker: 'Social Seva',
    sevaTitle: 'Beyond Celebration',
    timeline: [
      ['1934', 'Mandal Established', 'Mill workers and Girangaon families came together with faith, unity, and devotion.'],
      ['1990-2016', 'Kashinath Matavkar Era', 'A defining creative period shaped by memorable idols and devotional artistry.'],
      ['2015', 'Bahubali Theme Ganpati', 'A grand theme that became one of the mandal’s most remembered modern creations.'],
      ['Today', 'Digital Devotion & Community Seva', 'Darshan memories, seva work, donations, and community updates continue with a modern presence.'],
    ],
    divineForms: [
      ['Jai Malhar', 'Royal strength, folk devotion, and a powerful darshan mood.'],
      ['Lord Krishna', 'Graceful, musical, and filled with divine charm.'],
      ['Kalki', 'A vision of protection, courage, and cosmic renewal.'],
      ['Lord Shiva', 'Meditative energy, austerity, and timeless spiritual force.'],
    ],
    creations: [
      ['Banana Ganpati', 'A rare devotional creation remembered for its freshness, imagination, and festive wonder.'],
      ['5,555 Coconut Ganpati', 'A striking idol concept that transformed everyday offerings into a grand spiritual form.'],
      ['Bahubali Ganpati', 'A dramatic large-scale theme that brought cinematic scale to the mandal’s darshan experience.'],
    ],
    seva: [
      ['Blood Donation Camps', 'Devotees and volunteers come together to serve the city beyond the festival days.'],
      ['Health Check-Up Camps', 'Community wellness initiatives built around care, access, and local support.'],
      ['COVID Ration Support', 'Essential ration support for families during a difficult time for Mumbai.'],
    ],
  },
  mr: {
    heroKicker: 'स्थापना १९३४',
    heroTitle: 'हुकमिल लेनचा राजा',
    heroCopy: 'भव्यतेने परंपरा जपणारा श्रद्धेचा उत्सव.',
    exploreLegacy: 'परंपरा पाहा',
    viewGallery: 'गॅलरी पाहा',
    visualKicker: 'गिरणगावची भावना',
    visualTitle: 'गिरणी कामगार, स्थानिक कुटुंबे आणि एकच सामूहिक श्रद्धा.',
    originKicker: 'उगम कथा',
    originTitle: 'श्रद्धा आणि एकतेतून जन्म',
    originPartOne: 'हुकमिल लेनचा राजा',
    originPartTwo:
      ', मुंबईतील डिलाई रोड परिसरात स्थित असून, या भागातील सर्वात जुनी सार्वजनिक गणेशमूर्ती म्हणून ओळखला जातो. ',
    originHighlight: 'हुकमिल लेन सार्वजनिक गणेशोत्सव मंडळ',
    originPartThree:
      ' याची स्थापना १९३४ मध्ये गिरणगावातील गिरणी कामगार आणि स्थानिक रहिवाशांनी एकता, बंधुभाव आणि श्री गणेशावरील भक्ती वाढवण्यासाठी केली.',
    timelineKicker: 'परंपरेचा प्रवास',
    timelineTitle: 'चालती-बोलती परंपरा',
    divineKicker: 'दर्शन आठवणी',
    divineTitle: 'वर्षानुवर्षांची दिव्य रूपे',
    creationsKicker: 'अविस्मरणीय निर्मिती',
    creationsTitle: 'भक्तीने घडवलेली कला',
    sculptorLine: 'प्रसिद्ध मूर्तिकार काशिनाथ माटावकर यांनी साकारलेली निर्मिती.',
    sevaKicker: 'सामाजिक सेवा',
    sevaTitle: 'उत्सवाच्या पलीकडे',
    timeline: [
      ['१९३४', 'मंडळाची स्थापना', 'गिरणगावातील कामगार आणि कुटुंबे श्रद्धा, एकता आणि भक्तीने एकत्र आली.'],
      ['१९९०-२०१६', 'काशिनाथ माटावकर  युग', 'अविस्मरणीय मूर्ती आणि भक्तिमय कलाकृतींनी घडवलेला महत्त्वाचा काळ.'],
      ['२०१५', 'बाहुबली थीम गणपती', 'मंडळाच्या आधुनिक काळातील सर्वात लक्षवेधी आणि भव्य संकल्पनांपैकी एक.'],
      ['आज', 'डिजिटल भक्ती आणि समाजसेवा', 'दर्शन आठवणी, सेवा, देणगी आणि समाजातील अपडेट्स आधुनिक पद्धतीने पुढे चालू आहेत.'],
    ],
    divineForms: [
      ['जय मल्हार', 'राजेशाही ताकद, लोकभक्ती आणि प्रभावी दर्शनाचा भाव.'],
      ['श्रीकृष्ण', 'कृपा, माधुर्य आणि दिव्य मोहकतेने भरलेले रूप.'],
      ['कल्की', 'संरक्षण, धैर्य आणि नव्या ऊर्जेची दिव्य कल्पना.'],
      ['भगवान शिव', 'ध्यान, तपस्या आणि चिरंतन आध्यात्मिक शक्ती.'],
    ],
    creations: [
      ['केळी गणपती', 'ताजेपणा, कल्पकता आणि उत्सवातील वेगळेपणासाठी आठवणीत राहिलेली निर्मिती.'],
      ['५,५५५ नारळ गणपती', 'नैवेद्य आणि श्रद्धेला भव्य आध्यात्मिक रूप देणारी अनोखी संकल्पना.'],
      ['बाहुबली गणपती', 'दर्शनाला सिनेमॅटिक भव्यता देणारी नाट्यमय आणि मोठ्या प्रमाणातील संकल्पना.'],
    ],
    seva: [
      ['रक्तदान शिबिरे', 'उत्सवाच्या दिवसांपलीकडेही शहरासाठी भक्त आणि स्वयंसेवकांची सेवा.'],
      ['आरोग्य तपासणी शिबिरे', 'काळजी, सुविधा आणि स्थानिक मदतीवर आधारित समाजोपयोगी उपक्रम.'],
      ['कोविड रेशन मदत', 'मुंबईसाठी कठीण काळात कुटुंबांना आवश्यक रेशन सहाय्य.'],
    ],
  },
}

function About() {
  const { language } = useLanguage()
  const content = aboutContent[language] || aboutContent.en

  return (
    <main className="overflow-hidden bg-[#fff7e8] text-stone-950">
      <section className="relative grid min-h-[calc(100vh-64px)] place-items-center bg-[radial-gradient(circle_at_center,#ffb21c_0%,#9f1010_42%,#3c0303_100%)] px-4 py-20 text-center text-white sm:px-6">
        <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,transparent_0_16px,rgba(255,214,94,.42)_17px_18px)] opacity-30" />
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
              alt={content.heroTitle}
              className="relative mx-auto h-34 w-34 rounded-full object-contain drop-shadow-[0_0_45px_rgba(255,210,87,.85)] sm:h-44 sm:w-44"
            />
          </div>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.35em] text-yellow-200 sm:text-base">
            {content.heroKicker}
          </p>
          <h1 className="mt-5 font-serif text-5xl font-black leading-none text-[#ffe7a3] drop-shadow-2xl sm:text-7xl lg:text-8xl">
            {content.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-orange-50 sm:text-2xl">{content.heroCopy}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#legacy"
              className="rounded-full bg-[#ffd66b] px-8 py-4 text-base font-black text-[#6f0808] shadow-[0_18px_50px_rgba(255,196,42,.35)] transition hover:-translate-y-1 hover:bg-white"
            >
              {content.exploreLegacy}
            </a>
            <Link
              to="/gallery"
              className="rounded-full border border-yellow-200/60 bg-white/10 px-8 py-4 text-base font-black text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white hover:text-[#8e0808]"
            >
              {content.viewGallery}
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
            className="relative aspect-4/3 overflow-hidden rounded-lg bg-[#5d0707] shadow-2xl lg:aspect-5/4"
          >
            <img
              src={mill}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#3d0303]/95 via-[#3d0303]/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-200">{content.visualKicker}</p>
              <p className="mt-3 max-w-xl text-2xl font-black leading-tight">{content.visualTitle}</p>
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
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#b91111]">{content.originKicker}</p>
              <h2 className="mt-4 max-w-3xl wrap-break-word font-serif text-4xl font-black leading-tight text-[#921111] sm:text-5xl lg:text-6xl">
                {content.originTitle}
              </h2>
              <p className="mt-7 max-w-3xl wrap-break-word text-lg leading-9 text-stone-800 sm:text-xl sm:leading-10">
                <span className="font-black text-[#b91111]">{content.originPartOne}</span>
                {content.originPartTwo}
                <span className="font-black text-[#b98205]">{content.originHighlight}</span>
                {content.originPartThree}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#4b0505] px-4 py-16 text-white sm:px-6 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffd56a_1px,transparent_1px)] bg-size-[34px_34px] opacity-20" />
        <div className="relative mx-auto max-w-5xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-200">{content.timelineKicker}</p>
            <h2 className="mt-4 font-serif text-4xl font-black text-[#ffe0a1] sm:text-6xl">
              {content.timelineTitle}
            </h2>
          </motion.div>
          <div className="relative mt-14 space-y-10 before:absolute before:left-4 before:top-2 before:h-full before:w-px before:bg-linear-to-b before:from-yellow-300 before:via-red-300 before:to-transparent sm:before:left-1/2">
            {content.timeline.map(([year, title, copy], index) => (
              <motion.article
                key={`${year}-${title}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className={`relative pl-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0 ${index % 2 ? 'sm:text-left' : 'sm:text-right'}`}
              >
                <div className="absolute left-0 top-3 h-9 w-9 rounded-full border-4 border-[#4b0505] bg-[#ffd56a] shadow-[0_0_30px_rgba(255,213,106,.9)] sm:left-1/2 sm:-translate-x-1/2" />
                <div className={index % 2 ? 'sm:col-start-2' : ''}>
                  <span className="font-serif text-6xl font-black text-white/10 sm:text-7xl">{year}</span>
                  <h3 className="-mt-5 text-2xl font-black text-[#ffe0a1]">{title}</h3>
                  <p className="mt-4 leading-8 text-orange-50/85">{copy}</p>
                </div>
                <div
                  className={`mt-5 aspect-4/3 w-full overflow-hidden rounded-xl border border-yellow-200/20 bg-[#2d0202] shadow-[0_18px_45px_rgba(0,0,0,.25)] sm:mt-0 sm:w-52 ${
                    index % 2 ? 'sm:col-start-1 sm:row-start-1 sm:justify-self-end' : 'sm:col-start-2 sm:justify-self-start'
                  }`}
                >
                  <img
                    src={timelineImages[index] || ganpatiImage}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#260202] px-4 py-16 text-white sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-sm font-black uppercase tracking-[0.35em] text-yellow-200">{content.divineKicker}</p>
            <h2 className="mt-4 font-serif text-4xl font-black text-[#ffe0a1] sm:text-6xl">{content.divineTitle}</h2>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.divineForms.map(([title, copy], index) => (
              <motion.article
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="group overflow-hidden rounded-lg border border-yellow-200/15 bg-[#fff7e8] shadow-2xl"
              >
                <img
                  src={divineFormImages[index] || ganpatiImage}
                  alt=""
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <div className="mb-5 h-1 w-20 rounded-full bg-linear-to-r from-[#cf130b] to-[#ffd56a]" />
                  <h3 className="font-serif text-3xl font-black text-[#921111]">{title}</h3>
                  <p className="mt-4 leading-7 text-stone-700">{copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff7e8] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b91111]">
              {content.creationsKicker}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-black text-[#921111] sm:text-6xl">
              {content.creationsTitle}
            </h2>
          </motion.div>
          <div className="mt-14 space-y-14">
            {content.creations.map(([title, copy], index) => (
              <motion.article
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className={`grid gap-8 lg:grid-cols-2 lg:items-center ${index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="relative grid min-h-80 place-items-center overflow-hidden rounded-lg bg-[#5a0808] p-2 shadow-2xl sm:min-h-96">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,213,106,.22),transparent_58%)]" />
                  <img
                    src={creationImages[index] || ganpatiImage}
                    alt=""
                    className="relative max-h-[76vh] min-h-72 w-full object-contain drop-shadow-[0_25px_55px_rgba(0,0,0,.55)] sm:min-h-84 lg:max-h-115"
                  />
                </div>
                <div>
                  <div className="mb-6 h-1 w-28 rounded-full bg-linear-to-r from-[#c20d0d] to-[#f2b11d]" />
                  <h3 className="font-serif text-4xl font-black text-[#921111] sm:text-5xl">{title}</h3>
                  <p className="mt-5 text-lg leading-9 text-stone-800">{copy}</p>
                  <p className="mt-6 text-base font-black uppercase tracking-[0.22em] text-[#b98205]">
                    {content.sculptorLine}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff1df] px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#b91111]">{content.sevaKicker}</p>
            <h2 className="mt-4 font-serif text-4xl font-black text-[#921111] sm:text-6xl">{content.sevaTitle}</h2>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.seva.map(([title, copy]) => (
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
