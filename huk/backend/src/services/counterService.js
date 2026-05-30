const Counter = require("../models/Counter");

async function nextReceiptNumber(prefix) {
  const year = new Date().getFullYear();
  const key = `${prefix}-${year}`;
  const counter = await Counter.findOneAndUpdate(
    { key },
    { $inc: { value: 1 } },
    { upsert: true, returnDocument: "after" }
  );

  return `${prefix}-${year}-${String(counter.value).padStart(4, "0")}`;
}

module.exports = { nextReceiptNumber };
