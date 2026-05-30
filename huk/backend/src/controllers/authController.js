const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const { logAudit } = require("../services/auditService");

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@mandal.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin12345";

  const emailOk = email === adminEmail;
  const passwordOk = adminPassword.startsWith("$2")
    ? await bcrypt.compare(password, adminPassword)
    : password === adminPassword;

  if (!emailOk || !passwordOk) {
    await logAudit({ actor: email, action: "login_failed", entity: "admin", message: "Invalid admin login attempt" });
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: "1d",
  });

  await logAudit({ actor: email, action: "login_success", entity: "admin", message: "Admin logged in" });

  res.json({ token, admin: { email, role: "admin" } });
});

module.exports = { loginAdmin };
