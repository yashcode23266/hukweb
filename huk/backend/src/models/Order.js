const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: String,
      address: String,
    },
    items: [
      {
        productId: String,
        name: String,
        size: String,
        quantity: Number,
        price: Number,
      },
    ],
    amount: { type: Number, required: true },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    receiptNumber: { type: String, unique: true, sparse: true },
    status: {
      type: String,
      enum: ["created", "paid", "processing", "ready", "delivered", "cancelled", "failed"],
      default: "created",
    },
    receiptUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
