import { useState } from 'react'
import { api } from '../api/client'
import { openRazorpayCheckout } from '../api/razorpay'
import SectionTitle from '../components/SectionTitle'
import { useLanguage } from '../i18n/LanguageContext'
import { money } from '../utils/format'

const amounts = [501, 1101, 2101, 5101]

function Donation() {
  const [donor, setDonor] = useState({ name: '', phone: '', email: '', pan: '' })
  const { t } = useLanguage()
  const [amount, setAmount] = useState(1101)
  const [status, setStatus] = useState('')

  async function donate(event) {
    event.preventDefault()
    try {
      setStatus('Opening payment...')
      const { data } = await api.post('/donations', { donor, amount, purpose: 'Ganpati Utsav Seva' })
      const payment = await openRazorpayCheckout({
        key: data.razorpayKeyId,
        amount: data.razorpayOrder.amount,
        name: 'Shree Ganpati Mandal',
        orderId: data.razorpayOrder.id,
        description: 'Donation',
        prefill: donor,
      })
      const verified = await api.post('/donations/verify', {
        donationId: data.donation._id,
        razorpayOrderId: payment.razorpay_order_id,
        razorpayPaymentId: payment.razorpay_payment_id,
        razorpaySignature: payment.razorpay_signature,
      })
      setStatus(`Donation successful. Receipt: ${verified.data.donation.receiptUrl}`)
    } catch (error) {
      setStatus(error.response?.data?.message || error.message || 'Donation failed. Please try again.')
    }
  }

  return (
    <section className="px-4 py-12 sm:px-6">
      <SectionTitle eyebrow={t('donationEyebrow')} title={t('donationTitle')}>
        {t('donationCopy')}
      </SectionTitle>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-red-900 p-8 text-amber-50 shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">{t('directBank')}</p>
          <h2 className="mt-3 text-3xl font-black">{t('sevaFund')}</h2>
          <dl className="mt-6 grid gap-4 text-sm">
            <div className="rounded-lg bg-white/10 p-4"><dt className="font-bold">{t('accountNumber')}</dt><dd>123456789012</dd></div>
            <div className="rounded-lg bg-white/10 p-4"><dt className="font-bold">IFSC</dt><dd>HDFC0001234</dd></div>
            <div className="rounded-lg bg-white/10 p-4"><dt className="font-bold">UPI</dt><dd>ganpatimandal@upi</dd></div>
          </dl>
        </div>

        <form onSubmit={donate} className="rounded-lg border border-orange-200 bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-black">{t('razorpayDonation')}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {amounts.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setAmount(item)}
                className={`rounded-full px-4 py-3 font-black ${amount === item ? 'bg-red-700 text-white' : 'bg-orange-100 text-red-900'}`}
              >
                {money(item)}
              </button>
            ))}
          </div>
          <input
            className="focus-ring mt-4 w-full rounded-md border border-orange-200 px-3 py-3"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {['name', 'phone', 'email', 'pan'].map((field) => (
              <input
                key={field}
                className="focus-ring rounded-md border border-orange-200 px-3 py-3"
                placeholder={field.toUpperCase()}
                value={donor[field]}
                required={field === 'name' || field === 'phone'}
                onChange={(e) => setDonor({ ...donor, [field]: e.target.value })}
              />
            ))}
          </div>
          <button className="mt-5 w-full rounded-full bg-red-700 px-5 py-3 font-black text-white">{t('donateSecurely')}</button>
          {status ? <p className="mt-4 break-words rounded-md bg-green-50 p-3 text-sm font-bold text-green-800">{status}</p> : null}
        </form>
      </div>
    </section>
  )
}

export default Donation
