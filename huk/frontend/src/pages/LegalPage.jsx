import { motion } from 'framer-motion'
import PageMeta from '../components/PageMeta'
import { useLanguage } from '../i18n/useLanguage'

const legalContent = {
  en: {
    privacy: {
      label: 'Privacy Policy',
      title: 'Privacy Policy',
      description: 'How Hukmilane Lanecha Raja handles devotee, donation, order, and admin information.',
      intro:
        'We collect only the information needed to manage donations, merchandise orders, receipts, gallery/admin records, and communication with devotees.',
      sections: [
        ['Information We Collect', 'Name, phone number, email, address, order details, donation details, payment references, and admin activity records where required.'],
        ['How We Use It', 'To process orders and donations, generate receipts, support devotees, maintain records, and improve the website experience.'],
        ['Payments', 'Online payments are processed through Razorpay. Sensitive card, UPI, or banking details are handled by the payment provider, not stored directly on this website.'],
        ['Media & Uploads', 'Images used for gallery/product management may be stored with a cloud image provider such as Cloudinary.'],
        ['Data Sharing', 'We do not sell personal data. Information is shared only with service providers required for payment, hosting, receipt, or communication features.'],
      ],
    },
    terms: {
      label: 'Terms & Conditions',
      title: 'Terms & Conditions',
      description: 'Terms for using Hukmilane Lanecha Raja website, donations, shop, and admin features.',
      intro:
        'By using this website, you agree to use it respectfully for devotional, donation, merchandise, gallery, and community information purposes.',
      sections: [
        ['Website Use', 'Do not misuse forms, attempt unauthorized admin access, upload harmful content, or disrupt the website.'],
        ['Donations & Orders', 'Donation and shop payments must use accurate details. Orders and receipts depend on successful payment confirmation.'],
        ['Content', 'Images, text, logos, and devotional content belong to the mandal or their respective owners and should not be reused without permission.'],
        ['Admin Access', 'Admin features are restricted to authorized mandal members only. Activity may be recorded for safety and accountability.'],
        ['Updates', 'These terms may be updated as the website, payment flow, or mandal services evolve.'],
      ],
    },
    refund: {
      label: 'Refund Policy',
      title: 'Refund Policy',
      description: 'Refund and cancellation guidance for donations and merchandise orders.',
      intro:
        'Refunds are handled carefully and depend on the payment status, order status, and the nature of the contribution.',
      sections: [
        ['Donations', 'Donations are generally non-refundable, except in cases such as duplicate payment, failed transaction, or an approved correction request.'],
        ['Merchandise Orders', 'Shop orders may be cancelled or corrected before processing. Once packed or delivered, refunds depend on the issue reported.'],
        ['Payment Failures', 'If money is deducted but the payment is not confirmed, Razorpay or the bank may reverse it according to their processing timeline.'],
        ['How To Request', 'Contact the mandal with your name, phone number, amount, order/donation reference, and payment proof.'],
        ['Review Timeline', 'Requests are reviewed by the mandal team and payment provider where applicable.'],
      ],
    },
  },
  mr: {
    privacy: {
      label: 'गोपनीयता धोरण',
      title: 'गोपनीयता धोरण',
      description: 'भक्त, देणगी, ऑर्डर आणि प्रशासनाशी संबंधित माहिती कशी वापरली जाते.',
      intro:
        'देणगी, दुकान ऑर्डर, पावत्या, गॅलरी/अॅडमिन नोंदी आणि भक्तांशी संपर्कासाठी आवश्यक तेवढीच माहिती घेतली जाते.',
      sections: [
        ['आम्ही कोणती माहिती घेतो', 'नाव, फोन नंबर, ईमेल, पत्ता, ऑर्डर तपशील, देणगी तपशील, पेमेंट संदर्भ आणि आवश्यक अॅडमिन नोंदी.'],
        ['माहितीचा वापर', 'ऑर्डर आणि देणगी प्रक्रिया, पावती निर्मिती, भक्तांना मदत, नोंदी ठेवणे आणि वेबसाइट अनुभव सुधारण्यासाठी.'],
        ['पेमेंट', 'ऑनलाइन पेमेंट Razorpay द्वारे प्रक्रिया होते. कार्ड, UPI किंवा बँक तपशील वेबसाइटवर थेट साठवले जात नाहीत.'],
        ['मीडिया आणि अपलोड', 'गॅलरी/उत्पादन प्रतिमा Cloudinary सारख्या क्लाउड सेवा प्रदात्याकडे साठवल्या जाऊ शकतात.'],
        ['माहिती शेअरिंग', 'वैयक्तिक माहिती विकली जात नाही. पेमेंट, होस्टिंग, पावती किंवा संपर्क सुविधांसाठी आवश्यक सेवांसोबतच माहिती शेअर केली जाते.'],
      ],
    },
    terms: {
      label: 'नियम व अटी',
      title: 'नियम व अटी',
      description: 'वेबसाइट, देणगी, दुकान आणि अॅडमिन सुविधांसाठी वापर अटी.',
      intro:
        'ही वेबसाइट भक्ती, देणगी, वस्तू खरेदी, गॅलरी आणि मंडळ माहिती यासाठी आदराने वापरणे अपेक्षित आहे.',
      sections: [
        ['वेबसाइट वापर', 'फॉर्मचा गैरवापर, अनधिकृत अॅडमिन प्रवेश, हानिकारक सामग्री अपलोड किंवा वेबसाइटमध्ये अडथळा आणू नये.'],
        ['देणगी आणि ऑर्डर', 'देणगी व दुकान पेमेंटसाठी योग्य तपशील द्यावेत. ऑर्डर आणि पावती यशस्वी पेमेंटवर अवलंबून असतात.'],
        ['सामग्री', 'प्रतिमा, मजकूर, लोगो आणि भक्ती सामग्री मंडळाची किंवा संबंधित मालकांची आहे. परवानगीशिवाय वापर करू नये.'],
        ['अॅडमिन प्रवेश', 'अॅडमिन सुविधा फक्त अधिकृत मंडळ सदस्यांसाठी आहेत. सुरक्षिततेसाठी क्रियांची नोंद होऊ शकते.'],
        ['बदल', 'वेबसाइट, पेमेंट किंवा मंडळ सेवा बदलल्यास या अटी अपडेट होऊ शकतात.'],
      ],
    },
    refund: {
      label: 'रिफंड धोरण',
      title: 'रिफंड धोरण',
      description: 'देणगी आणि दुकान ऑर्डरसाठी रिफंड व रद्द करण्याचे मार्गदर्शन.',
      intro:
        'रिफंड पेमेंट स्थिती, ऑर्डर स्थिती आणि योगदानाच्या स्वरूपावर अवलंबून काळजीपूर्वक हाताळले जातात.',
      sections: [
        ['देणगी', 'देणगी सामान्यतः परत केली जात नाही; मात्र डुप्लिकेट पेमेंट, अयशस्वी व्यवहार किंवा मंजूर दुरुस्ती विनंतीमध्ये विचार होऊ शकतो.'],
        ['दुकान ऑर्डर', 'प्रक्रिया सुरू होण्यापूर्वी ऑर्डर रद्द किंवा दुरुस्त केली जाऊ शकते. पॅक/डिलिव्हरी नंतर रिफंड तक्रारीवर अवलंबून असतो.'],
        ['पेमेंट अयशस्वी', 'रक्कम कपात झाली पण पेमेंट पुष्टी झाले नाही तर Razorpay किंवा बँक त्यांच्या वेळेनुसार रक्कम परत करू शकतात.'],
        ['विनंती कशी करावी', 'नाव, फोन नंबर, रक्कम, ऑर्डर/देणगी संदर्भ आणि पेमेंट पुरावा मंडळाला द्या.'],
        ['पुनरावलोकन वेळ', 'विनंत्या मंडळ टीम आणि लागू असल्यास पेमेंट प्रदात्याकडून तपासल्या जातील.'],
      ],
    },
  },
}

function LegalPage({ page }) {
  const { language } = useLanguage()
  const content = legalContent[language]?.[page] || legalContent.en[page] || legalContent.en.privacy

  return (
    <main className="bg-[#fff8ea] px-4 py-12 text-stone-950 sm:px-6 lg:py-16">
      <PageMeta title={content.title} description={content.description} />
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-5xl rounded-[1.5rem] border border-[#e7c579]/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(93,25,0,.10)] sm:p-9 lg:p-12"
      >
        <p className="text-xs font-black uppercase tracking-[0.34em] text-[#b91111]">{content.label}</p>
        <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-[#9f1111] sm:text-6xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{content.intro}</p>

        <div className="mt-10 grid gap-5">
          {content.sections.map(([title, body]) => (
            <section key={title} className="rounded-2xl bg-[#fff7e8] p-5">
              <h2 className="font-serif text-2xl font-black text-[#9f1111]">{title}</h2>
              <p className="mt-3 leading-8 text-stone-700">{body}</p>
            </section>
          ))}
        </div>
      </motion.section>
    </main>
  )
}

export default LegalPage
