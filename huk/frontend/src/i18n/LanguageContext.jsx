import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const translations = {
  en: {
    navHome: 'Home',
    navShop: 'Shop',
    navDonate: 'Donate',
    navUpdates: 'Updates',
    navGallery: 'Gallery',
    navContact: 'Contact',
    navAdmin: 'Admin',
    sevaDonation: 'Seva Donation',
    shree: 'Shree',
    mandalName: 'Ganpati Mandal',
    footerLine: 'Darshan, seva, celebrations, and community support.',
    langToggle: 'मराठी',

    heroBadge: 'Ganpati Bappa Morya',
    heroTitle: 'Shree Ganpati Mandal Utsav',
    heroCopy: 'A devotional, festive, and modern digital home for darshan updates, seva donations, shop orders, and memories from every year of celebration.',
    donateNow: 'Donate Now',
    visitShop: 'Visit Shop',
    welcomeEyebrow: 'Welcome',
    welcomeTitle: 'A Mandal Built Around Seva',
    welcomeCopy: 'Keep devotees informed, accept secure donations, sell volunteer merchandise, and share receipts automatically through WhatsApp.',
    dailyAarti: 'Daily Aarti',
    dailyAartiCopy: 'Morning and evening aarti with live mandal updates.',
    prasadSeva: 'Prasad Seva',
    prasadSevaCopy: 'Community food distribution handled by volunteer teams.',
    culturalNights: 'Cultural Nights',
    culturalNightsCopy: 'Bhajan, dhol pathak, and family-friendly performances.',
    supportUtsav: 'Support the Utsav',
    supportUtsavCopy: 'Bank details and Razorpay donations with PDF receipts.',
    merchTitle: 'T-Shirts and ID Cards',
    merchCopy: 'Cart checkout, payment verification, receipts, and WhatsApp confirmation.',

    shopEyebrow: 'Shop',
    shopTitle: 'Festival Merchandise',
    shopCopy: 'Buy volunteer T-shirts and official ID cards with secure Razorpay checkout.',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    cart: 'Cart',
    cartEmpty: 'Your cart is empty.',
    total: 'Total',
    paySecurely: 'Pay Securely',

    donationEyebrow: 'Donation',
    donationTitle: 'Offer Seva With Secure Receipts',
    donationCopy: 'Choose direct bank transfer or Razorpay online donation.',
    directBank: 'Direct Bank Details',
    sevaFund: 'Shree Ganpati Mandal Seva Fund',
    accountNumber: 'Account Number',
    razorpayDonation: 'Razorpay Donation',
    donateSecurely: 'Donate Securely',

    locationEyebrow: 'Location',
    locationTitle: 'Visit The Mandal',
    locationCopy: 'Find darshan location, contact details, and directions.',
    address: 'Address',
    contact: 'Contact',
    openDirections: 'Open Directions',
  },
  mr: {
    navHome: 'मुख्यपृष्ठ',
    navShop: 'दुकान',
    navDonate: 'देणगी',
    navUpdates: 'सूचना',
    navGallery: 'गॅलरी',
    navContact: 'संपर्क',
    navAdmin: 'अॅडमिन',
    sevaDonation: 'सेवा देणगी',
    shree: 'श्री',
    mandalName: 'गणपती मंडळ',
    footerLine: 'दर्शन, सेवा, उत्सव आणि समाजकार्य.',
    langToggle: 'English',

    heroBadge: 'गणपती बाप्पा मोरया',
    heroTitle: 'श्री गणपती मंडळ उत्सव',
    heroCopy: 'दर्शनाच्या सूचना, सेवा देणगी, दुकानातील ऑर्डर आणि प्रत्येक वर्षाच्या आठवणींसाठी भक्तिमय आणि आधुनिक डिजिटल स्थान.',
    donateNow: 'आता देणगी द्या',
    visitShop: 'दुकान पहा',
    welcomeEyebrow: 'स्वागत',
    welcomeTitle: 'सेवेभोवती उभे असलेले मंडळ',
    welcomeCopy: 'भक्तांना माहिती द्या, सुरक्षित देणगी स्वीकारा, स्वयंसेवक साहित्य विक्री करा आणि पावत्या WhatsApp वर पाठवा.',
    dailyAarti: 'दैनिक आरती',
    dailyAartiCopy: 'सकाळ-संध्याकाळ आरती आणि मंडळाच्या ताज्या सूचना.',
    prasadSeva: 'प्रसाद सेवा',
    prasadSevaCopy: 'स्वयंसेवकांच्या मदतीने भक्तांसाठी प्रसाद वितरण.',
    culturalNights: 'सांस्कृतिक कार्यक्रम',
    culturalNightsCopy: 'भजन, ढोल पथक आणि कुटुंबासाठी कार्यक्रम.',
    supportUtsav: 'उत्सवाला हातभार लावा',
    supportUtsavCopy: 'बँक तपशील आणि Razorpay देणगीसह PDF पावती.',
    merchTitle: 'टी-शर्ट आणि ओळखपत्र',
    merchCopy: 'कार्ट चेकआउट, पेमेंट पडताळणी, पावती आणि WhatsApp पुष्टी.',

    shopEyebrow: 'दुकान',
    shopTitle: 'उत्सव साहित्य',
    shopCopy: 'स्वयंसेवक टी-शर्ट आणि अधिकृत ओळखपत्र सुरक्षित Razorpay चेकआउटसह खरेदी करा.',
    addToCart: 'कार्टमध्ये जोडा',
    outOfStock: 'स्टॉक संपला',
    cart: 'कार्ट',
    cartEmpty: 'तुमचा कार्ट रिकामा आहे.',
    total: 'एकूण',
    paySecurely: 'सुरक्षित पैसे द्या',

    donationEyebrow: 'देणगी',
    donationTitle: 'सुरक्षित पावतीसह सेवा अर्पण करा',
    donationCopy: 'थेट बँक ट्रान्सफर किंवा Razorpay ऑनलाइन देणगी निवडा.',
    directBank: 'थेट बँक तपशील',
    sevaFund: 'श्री गणपती मंडळ सेवा निधी',
    accountNumber: 'खाते क्रमांक',
    razorpayDonation: 'Razorpay देणगी',
    donateSecurely: 'सुरक्षित देणगी द्या',

    locationEyebrow: 'स्थान',
    locationTitle: 'मंडळाला भेट द्या',
    locationCopy: 'दर्शन स्थान, संपर्क तपशील आणि दिशा पहा.',
    address: 'पत्ता',
    contact: 'संपर्क',
    openDirections: 'दिशा उघडा',
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language === 'mr' ? 'mr' : 'en'
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === 'en' ? 'mr' : 'en')),
      t: (key) => translations[language][key] || translations.en[key] || key,
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
