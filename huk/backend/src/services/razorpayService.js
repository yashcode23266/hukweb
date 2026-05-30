const crypto = require("crypto");
const Razorpay = require("razorpay");

function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return null;
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

async function createRazorpayOrder({ amount, receipt, notes }) {
  const razorpay = getRazorpay();
  if (!razorpay) {
    return {
      id: `dev_order_${Date.now()}`,
      amount: amount * 100,
      currency: "INR",
      receipt,
      notes,
      devMode: true,
    };
  }

  return razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt,
    notes,
  });
}

function verifyRazorpaySignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
  if (!process.env.RAZORPAY_KEY_SECRET) return true;

  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpaySignature));
}

module.exports = { createRazorpayOrder, verifyRazorpaySignature };
