const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: String,
      pan: String,
    },
    purpose: { type: String, default: "Ganpati Utsav Seva" },
    amount: { type: Number, required: true },
    paymentMode: { type: String, enum: ["razorpay", "cash", "bank", "upi", "cheque", "other"], default: "razorpay" },
    paymentReference: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    receiptNumber: { type: String, unique: true, sparse: true },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    receiptUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
