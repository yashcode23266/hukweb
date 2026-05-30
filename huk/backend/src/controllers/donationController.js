const { z } = require("zod");
const Donation = require("../models/Donation");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { createRazorpayOrder, verifyRazorpaySignature } = require("../services/razorpayService");
const { buildReceipt } = require("../services/receiptService");
const { sendWhatsAppReceipt } = require("../services/whatsappService");
const { nextReceiptNumber } = require("../services/counterService");
const { logAudit } = require("../services/auditService");
const { normalizeIndianPhone } = require("../utils/phone");

const createDonationSchema = z.object({
  donor: z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    email: z.string().email().optional().or(z.literal("")),
    pan: z.string().optional(),
  }),
  amount: z.number().positive(),
  purpose: z.string().optional(),
});

const verifyDonationSchema = z.object({
  donationId: z.string(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string().optional(),
});

const offlineDonationSchema = z.object({
  donor: z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    email: z.string().email().optional().or(z.literal("")),
    pan: z.string().optional(),
  }),
  amount: z.coerce.number().positive(),
  purpose: z.string().optional(),
  paymentMode: z.enum(["cash", "bank", "upi", "cheque", "other"]),
  paymentReference: z.string().optional(),
});

const createDonation = asyncHandler(async (req, res) => {
  req.body.donor.phone = normalizeIndianPhone(req.body.donor.phone);
  await User.findOneAndUpdate(
    { phone: req.body.donor.phone },
    { name: req.body.donor.name, phone: req.body.donor.phone, email: req.body.donor.email },
    { upsert: true, returnDocument: "after" }
  );
  const donation = await Donation.create(req.body);
  const razorpayOrder = await createRazorpayOrder({
    amount: donation.amount,
    receipt: donation._id.toString(),
    notes: { type: "donation", donationId: donation._id.toString() },
  });

  donation.razorpayOrderId = razorpayOrder.id;
  await donation.save();
  await logAudit({ action: "create", entity: "donation", entityId: donation._id.toString(), message: "Online donation created", metadata: { amount: donation.amount } });

  res.status(201).json({
    donation,
    razorpayOrder,
    razorpayKeyId: process.env.RAZORPAY_KEY_ID || "rzp_test_dev_mode",
  });
});

const verifyDonation = asyncHandler(async (req, res) => {
  const valid = verifyRazorpaySignature(req.body);
  if (!valid) return res.status(400).json({ message: "Payment verification failed" });

  const donation = await Donation.findById(req.body.donationId);
  if (!donation) return res.status(404).json({ message: "Donation not found" });

  donation.status = "paid";
  donation.razorpayPaymentId = req.body.razorpayPaymentId;
  if (!donation.receiptNumber) donation.receiptNumber = await nextReceiptNumber("DON");
  const receiptUrl = await buildReceipt({
    type: "donation",
    id: donation._id,
    receiptNumber: donation.receiptNumber,
    name: donation.donor.name,
    phone: donation.donor.phone,
    amount: donation.amount,
  });
  donation.receiptUrl = receiptUrl;
  await donation.save();
  await logAudit({ action: "paid", entity: "donation", entityId: donation._id.toString(), message: "Donation paid", metadata: { receiptNumber: donation.receiptNumber } });

  await sendWhatsAppReceipt({
    phone: donation.donor.phone,
    name: donation.donor.name,
    referenceId: donation._id,
    receiptNumber: donation.receiptNumber,
    amount: donation.amount,
    receiptUrl,
    type: "donation",
  });

  res.json({ donation });
});

const createOfflineDonation = asyncHandler(async (req, res) => {
  req.body.donor.phone = normalizeIndianPhone(req.body.donor.phone);
  await User.findOneAndUpdate(
    { phone: req.body.donor.phone },
    { name: req.body.donor.name, phone: req.body.donor.phone, email: req.body.donor.email },
    { upsert: true, returnDocument: "after" }
  );

  const donation = await Donation.create({
    ...req.body,
    status: "paid",
    receiptNumber: await nextReceiptNumber("DON"),
  });

  donation.receiptUrl = await buildReceipt({
    type: "donation",
    id: donation._id,
    receiptNumber: donation.receiptNumber,
    name: donation.donor.name,
    phone: donation.donor.phone,
    amount: donation.amount,
  });
  await donation.save();
  await logAudit({
    actor: req.user?.email,
    action: "create_offline",
    entity: "donation",
    entityId: donation._id.toString(),
    message: "Offline donation recorded",
    metadata: { amount: donation.amount, paymentMode: donation.paymentMode, receiptNumber: donation.receiptNumber },
  });

  await sendWhatsAppReceipt({
    phone: donation.donor.phone,
    name: donation.donor.name,
    referenceId: donation._id,
    receiptNumber: donation.receiptNumber,
    amount: donation.amount,
    receiptUrl: donation.receiptUrl,
    type: "donation",
  });

  res.status(201).json(donation);
});

module.exports = {
  createDonation,
  verifyDonation,
  createOfflineDonation,
  createDonationSchema,
  verifyDonationSchema,
  offlineDonationSchema,
};
