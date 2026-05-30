const XLSX = require("xlsx");
const Order = require("../models/Order");
const Donation = require("../models/Donation");
const User = require("../models/User");
const Product = require("../models/Product");
const Gallery = require("../models/Gallery");
const Announcement = require("../models/Announcement");
const AuditLog = require("../models/AuditLog");
const asyncHandler = require("../utils/asyncHandler");

const dashboard = asyncHandler(async (_req, res) => {
  const [users, orders, donations, productCount] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Donation.countDocuments(),
    Product.countDocuments(),
  ]);
  const products = await Product.find().sort({ createdAt: -1 }).limit(20);
  const galleryItems = await Gallery.find().sort({ year: -1, createdAt: -1 }).limit(20);
  const announcements = await Announcement.find().sort({ isPinned: -1, publishedAt: -1 }).limit(20);

  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(25);
  const recentDonations = await Donation.find().sort({ createdAt: -1 }).limit(25);
  const recentUsers = await User.find().sort({ createdAt: -1 }).limit(10);
  const auditLogs = await AuditLog.find().sort({ createdAt: -1 }).limit(30);

  res.json({
    stats: { users, orders, donations, products: productCount, gallery: galleryItems.length },
    products,
    galleryItems,
    announcements,
    recentUsers,
    recentOrders,
    recentDonations,
    auditLogs,
  });
});

const exportExcel = asyncHandler(async (_req, res) => {
  const [users, orders, donations, products, auditLogs] = await Promise.all([
    User.find().lean(),
    Order.find().lean(),
    Donation.find().lean(),
    Product.find().lean(),
    AuditLog.find().lean(),
  ]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(users), "Users");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(orders), "Orders");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(donations), "Donations");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(products), "Products");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(auditLogs), "Audit Logs");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  res.setHeader("Content-Disposition", "attachment; filename=ganpati-mandal-export.xlsx");
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.send(buffer);
});

module.exports = { dashboard, exportExcel };
