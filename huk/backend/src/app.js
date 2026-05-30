require("dotenv").config();
const express = require("express");
const path = require("path");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const { apiLimiter, authLimiter, cors, corsOptions, helmet, paymentLimiter } = require("./middleware/securityMiddleware");

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors(corsOptions));
app.use("/api", apiLimiter);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/receipts", express.static(path.join(__dirname, "..", "receipts")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Ganpati Mandal API" });
});

app.use("/api/auth", authLimiter, require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", paymentLimiter, require("./routes/orderRoutes"));
app.use("/api/donations", paymentLimiter, require("./routes/donationRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
