import { useState } from 'react'
import { api } from '../api/client'
import { openRazorpayCheckout } from '../api/razorpay'
import SectionTitle from '../components/SectionTitle'
import { useLanguage } from '../i18n/useLanguage'
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
      setStatus(t('openingPayment'))
      const { data } = await api.post('/donations', { donor, amount, purpose: t('donationPurpose') })
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

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12">
      <SectionTitle eyebrow={t('donationEyebrow')} title={t('donationTitle')}>
        {t('donationCopy')}
      </SectionTitle>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="min-w-0 rounded-lg bg-red-900 p-5 text-amber-50 shadow-xl sm:p-8">
          <p className="wrap-break-word text-sm font-black uppercase tracking-[0.16em] text-amber-300 sm:tracking-[0.2em]">{t('directBank')}</p>
          <h2 className="mt-3 wrap-break-word text-2xl font-black sm:text-3xl">{t('sevaFund')}</h2>
          <dl className="mt-6 grid gap-4 text-sm">
            <div className="min-w-0 rounded-lg bg-white/10 p-4"><dt className="font-bold">{t('accountNumber')}</dt><dd className="wrap-break-word">123456789012</dd></div>
            <div className="min-w-0 rounded-lg bg-white/10 p-4"><dt className="font-bold">IFSC</dt><dd className="wrap-break-word">HDFC0001234</dd></div>
            <div className="min-w-0 rounded-lg bg-white/10 p-4"><dt className="font-bold">UPI</dt><dd className="wrap-break-word">ganpatimandal@upi</dd></div>
          </dl>
        </div>

        <form onSubmit={donate} className="min-w-0 rounded-lg border border-orange-200 bg-white p-5 shadow-lg sm:p-6">
          <h2 className="wrap-break-word text-2xl font-black">{t('razorpayDonation')}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {amounts.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setAmount(item)}
                className={`rounded-full px-3 py-3 text-sm font-black sm:px-4 sm:text-base ${amount === item ? 'bg-red-700 text-white' : 'bg-orange-100 text-red-900'}`}
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
                className="focus-ring min-w-0 rounded-md border border-orange-200 px-3 py-3"
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
          <button className="mt-5 w-full rounded-full bg-red-700 px-5 py-3 font-black text-white">{t('donateSecurely')}</button>
          {status ? <p className="mt-4 wrap-break-word rounded-md bg-green-50 p-3 text-sm font-bold text-green-800">{status}</p> : null}
        </form>
      </div>
    </section>
  )
}

export default Donation
