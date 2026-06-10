import { motion } from 'framer-motion'
import { useState } from 'react'
import { api } from '../api/client'
import { openRazorpayCheckout } from '../api/razorpay'
import { useLanguage } from '../i18n/useLanguage'
import { money } from '../utils/format'

const amounts = [501, 1001, 2100, 5101]
const bankDetails = [
  ['Account Number', '123456789012'],
  ['IFSC', 'HDFC0001234'],
  ['UPI', 'ganpatimandal@upi'],
]

const donationText = {
  en: {
    title: 'Offer Seva With Devotion',
    subtitle: 'Your contribution supports Ganesh Utsav, seva, and community initiatives.',
    onlineDonation: 'Online Donation',
    copy: 'Copy',
    receiptNote: 'Receipt will be generated after successful donation.',
    purposes: ['Ganpati Utsav Seva', 'Prasad Seva', 'Social Work', 'Community Support'],
  },
  mr: {
    title: 'भक्तिभावाने सेवा अर्पण करा',
    subtitle: 'आपले योगदान गणेश उत्सव, सेवा आणि समाजोपयोगी उपक्रमांना मदत करते.',
    onlineDonation: 'ऑनलाइन देणगी',
    copy: 'कॉपी',
    receiptNote: 'यशस्वी देणगीनंतर पावती तयार केली जाईल.',
    purposes: ['गणपती उत्सव सेवा', 'प्रसाद सेवा', 'सामाजिक कार्य', 'समुदाय सहाय्य'],
  },
}

function Donation() {
  const [donor, setDonor] = useState({ name: '', phone: '', email: '', pan: '' })
  const { t, language } = useLanguage()
  const ui = donationText[language] || donationText.en
  const donationPurposes = ui.purposes
  const [amount, setAmount] = useState(1101)
  const [purpose, setPurpose] = useState(donationPurposes[0])
  const selectedPurpose = donationPurposes.includes(purpose) ? purpose : donationPurposes[0]
  const [status, setStatus] = useState('')

  async function donate(event) {
    event.preventDefault()
    try {
      setStatus(t('openingPayment'))
      const { data } = await api.post('/donations', { donor, amount, purpose: selectedPurpose })
      const payment = await openRazorpayCheckout({
        key: data.razorpayKeyId,
        amount: data.razorpayOrder.amount,
        name: t('mandalAddressTitle'),
        orderId: data.razorpayOrder.id,
        description: t('donationDescription'),
        prefill: donor,
      })
      const verified = await api.post('/donations/verify', {
        donationId: data.donation._id,
        razorpayOrderId: payment.razorpay_order_id,
        razorpayPaymentId: payment.razorpay_payment_id,
        razorpaySignature: payment.razorpay_signature,
      })
      setStatus(`${t('donationSuccessful')} ${t('receipt')}: ${verified.data.donation.receiptUrl}`)
    } catch (error) {
      setStatus(error.response?.data?.message || error.message || t('donationFailed'))
    }
  }

  function copyDetail(value) {
    navigator.clipboard?.writeText(value)
  }

  return (
    <main className="bg-[#fff8ea] px-4 py-10 text-stone-950 sm:px-6 lg:py-14">
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-[#e7c579]/60 bg-linear-to-br from-[#fffaf0] via-[#fff1da] to-[#ffe8bf] px-5 py-14 text-center shadow-[0_28px_90px_rgba(93,25,0,.10)] sm:px-8 lg:py-18"
      >
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb72e]/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,#9f1111_1px,transparent_0)] [background-size:26px_26px]" />
        <div className="relative">
          <p className="text-xs font-black uppercase tracking-[0.34em] text-[#b91111]">{t('donationEyebrow')}</p>
          <h1 className="mt-4 font-serif text-5xl font-black leading-none text-[#9f1111] sm:text-7xl">{ui.title}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-700">
            {ui.subtitle}
          </p>
        </div>
      </motion.section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-7 lg:grid-cols-[.92fr_1.08fr]">
        <div className="space-y-6">
          <div className="rounded-[1.25rem] bg-[#650808] p-5 text-amber-50 shadow-[0_26px_80px_rgba(93,12,0,.20)] sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-amber-300">{t('directBank')}</p>
            <h2 className="mt-3 font-serif text-4xl font-black">{t('sevaFund')}</h2>
            <dl className="mt-6 grid gap-3">
              {bankDetails.map(([label, value]) => (
                <div key={label} className="grid gap-3 rounded-2xl bg-white/10 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="min-w-0">
                    <dt className="text-sm font-black text-amber-200">{label === 'Account Number' ? t('accountNumber') : label}</dt>
                    <dd className="wrap-break-word mt-1 font-bold">{value}</dd>
                  </div>
                  <button type="button" onClick={() => copyDetail(value)} className="rounded-full bg-[#2b0505] px-4 py-2 text-sm font-black text-amber-100 shadow-lg shadow-black/20">
                    {ui.copy}
                  </button>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <form onSubmit={donate} className="min-w-0 rounded-[1.25rem] border border-[#e7c579]/70 bg-white p-5 shadow-[0_24px_80px_rgba(93,25,0,.14)] sm:p-7">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#b91111]">{ui.onlineDonation}</p>
          <h2 className="mt-3 font-serif text-4xl font-black text-[#9f1111]">{t('razorpayDonation')}</h2>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {amounts.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setAmount(item)}
                className={`rounded-full px-3 py-3 text-sm font-black transition sm:px-4 sm:text-base ${
                  amount === item ? 'bg-[#b91111] text-white shadow-lg shadow-red-950/15' : 'bg-[#fff1d6] text-[#8d0909] hover:bg-[#ffe4ad]'
                }`}
              >
                {money(item)}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <input
              className="focus-ring rounded-2xl border border-[#e7c579] bg-[#fffdf7] px-4 py-3"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <select
              className="focus-ring rounded-2xl border border-[#e7c579] bg-[#fffdf7] px-4 py-3 font-bold"
              value={selectedPurpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              {donationPurposes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {['name', 'phone', 'email', 'pan'].map((field) => (
              <input
                key={field}
                className="focus-ring min-w-0 rounded-2xl border border-[#e7c579] bg-[#fffdf7] px-4 py-3"
                placeholder={
                  field === 'name'
                    ? t('name')
                    : field === 'phone'
                      ? t('customerPhone')
                      : field === 'email'
                        ? t('customerEmail')
                        : t('pan')
                }
                value={donor[field]}
                required={field === 'name' || field === 'phone'}
                onChange={(e) => setDonor({ ...donor, [field]: e.target.value })}
              />
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-[#fff7e8] p-4 text-sm font-bold text-stone-700">
            {ui.receiptNote}
          </div>
          <button className="mt-5 w-full rounded-full bg-[#b91111] px-5 py-4 font-black text-white shadow-xl shadow-red-950/15 transition hover:-translate-y-0.5 hover:bg-[#8f0d0d]">
            {status === t('openingPayment') ? t('openingPayment') : t('donateSecurely')}
          </button>
          {status ? <p className="mt-4 wrap-break-word rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-800">{status}</p> : null}
        </form>
      </section>
    </main>
  )
}

export default Donation

