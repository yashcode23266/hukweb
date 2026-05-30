function normalizeIndianPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  throw new Error("Enter a valid 10-digit Indian phone number");
}

module.exports = { normalizeIndianPhone };
