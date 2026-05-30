const { z } = require("zod");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { createRazorpayOrder, verifyRazorpaySignature } = require("../services/razorpayService");
const { buildReceipt } = require("../services/receiptService");
const { sendWhatsAppReceipt } = require("../services/whatsappService");
const { nextReceiptNumber } = require("../services/counterService");
const { logAudit } = require("../services/auditService");
const { normalizeIndianPhone } = require("../utils/phone");

const createOrderSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    email: z.string().email().optional().or(z.literal("")),
    address: z.string().optional(),
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      size: z.string().optional(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ).min(1),
});

const verifyOrderSchema = z.object({
  orderId: z.string(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string().optional(),
});

const updateOrderStatusSchema = z.object({
  status: z.enum(["paid", "processing", "ready", "delivered", "cancelled", "failed"]),
});

function getMongoProductItems(items) {
  return items.filter((item) => mongoose.Types.ObjectId.isValid(item.productId));
}

async function assertStockAvailable(items) {
  const quantitiesByProduct = new Map();
  getMongoProductItems(items).forEach((item) => {
    quantitiesByProduct.set(item.productId, (quantitiesByProduct.get(item.productId) || 0) + item.quantity);
  });

  for (const [productId, quantity] of quantitiesByProduct.entries()) {
    const product = await Product.findById(productId);
    if (!product || !product.isActive) throw new Error("One or more products are unavailable");
    if (product.stock < quantity) throw new Error(`${product.name} has only ${product.stock} in stock`);
  }
}

async function decrementStock(items) {
  const quantitiesByProduct = new Map();
  getMongoProductItems(items).forEach((item) => {
    quantitiesByProduct.set(item.productId, (quantitiesByProduct.get(item.productId) || 0) + item.quantity);
  });

  await Promise.all(
    [...quantitiesByProduct.entries()].map(async ([productId, quantity]) => {
      const result = await Product.updateOne({ _id: productId, stock: { $gte: quantity } }, { $inc: { stock: -quantity } });
      if (result.modifiedCount !== 1) throw new Error("Stock changed before payment confirmation. Please try again.");
    })
  );
}

const createOrder = asyncHandler(async (req, res) => {
  req.body.customer.phone = normalizeIndianPhone(req.body.customer.phone);
  await assertStockAvailable(req.body.items);
  const amount = req.body.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  await User.findOneAndUpdate(
    { phone: req.body.customer.phone },
    { name: req.body.customer.name, phone: req.body.customer.phone, email: req.body.customer.email },
    { upsert: true, returnDocument: "after" }
  );
  const order = await Order.create({ ...req.body, amount });
  const razorpayOrder = await createRazorpayOrder({
    amount,
    receipt: order._id.toString(),
    notes: { type: "shop", orderId: order._id.toString() },
  });

  order.razorpayOrderId = razorpayOrder.id;
  await order.save();
  await logAudit({ action: "create", entity: "order", entityId: order._id.toString(), message: "Order created", metadata: { amount } });

  res.status(201).json({
    order,
    razorpayOrder,
    razorpayKeyId: process.env.RAZORPAY_KEY_ID || "rzp_test_dev_mode",
  });
});

const verifyOrder = asyncHandler(async (req, res) => {
  const valid = verifyRazorpaySignature(req.body);
  if (!valid) return res.status(400).json({ message: "Payment verification failed" });

  const order = await Order.findById(req.body.orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });
  const wasPaid = order.status === "paid";

  if (!wasPaid) {
    await assertStockAvailable(order.items);
    await decrementStock(order.items);
  }

  order.status = "paid";
  order.razorpayPaymentId = req.body.razorpayPaymentId;
  if (!order.receiptNumber) order.receiptNumber = await nextReceiptNumber("ORD");
  const receiptUrl = await buildReceipt({
    type: "order",
    id: order._id,
    receiptNumber: order.receiptNumber,
    name: order.customer.name,
    phone: order.customer.phone,
    amount: order.amount,
    items: order.items,
  });
  order.receiptUrl = receiptUrl;
  await order.save();
  await logAudit({ action: "paid", entity: "order", entityId: order._id.toString(), message: "Order paid", metadata: { receiptNumber: order.receiptNumber } });

  await sendWhatsAppReceipt({
    phone: order.customer.phone,
    name: order.customer.name,
    referenceId: order._id,
    receiptNumber: order.receiptNumber,
    amount: order.amount,
    receiptUrl,
    type: "order",
  });

  res.json({ order });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { returnDocument: "after", runValidators: true }
  );
  if (!order) return res.status(404).json({ message: "Order not found" });
  await logAudit({
    actor: req.user?.email,
    action: "status_update",
    entity: "order",
    entityId: order._id.toString(),
    message: `Order status changed to ${order.status}`,
  });
  res.json(order);
});

module.exports = {
  createOrder,
  verifyOrder,
  updateOrderStatus,
  createOrderSchema,
  verifyOrderSchema,
  updateOrderStatusSchema,
};
