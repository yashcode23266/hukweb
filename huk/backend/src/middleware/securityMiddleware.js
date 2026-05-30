const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

function parseOrigins() {
  return (process.env.CLIENT_URL || "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const corsOptions = {
  origin(origin, callback) {
    const allowedOrigins = parseOrigins();
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: false,
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many payment requests. Please try again later." },
});

module.exports = {
  helmet,
  cors,
  corsOptions,
  apiLimiter,
  authLimiter,
  paymentLimiter,
};
