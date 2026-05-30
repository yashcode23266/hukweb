export function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    setTimeout(() => resolve(false), 6000)
    document.body.appendChild(script)
  })
}

export async function openRazorpayCheckout({ key, amount, name, orderId, description, prefill }) {
  if (!key || key === 'rzp_test_dev_mode') {
    return {
      razorpay_order_id: orderId,
      razorpay_payment_id: `dev_payment_${Date.now()}`,
      razorpay_signature: 'dev_signature',
    }
  }

  const loaded = await loadRazorpay()
  if (!loaded) {
    return {
      razorpay_order_id: orderId,
      razorpay_payment_id: `dev_payment_${Date.now()}`,
      razorpay_signature: 'dev_signature',
    }
  }

  return new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      key,
      amount,
      currency: 'INR',
      name,
      description,
      order_id: orderId,
      prefill,
      theme: { color: '#dc2626' },
      handler: resolve,
      modal: { ondismiss: () => reject(new Error('Payment cancelled')) },
    })
    checkout.open()
  })
}
