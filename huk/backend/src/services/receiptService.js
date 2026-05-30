const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

function money(amount) {
  return `INR ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function buildReceipt({ type, id, receiptNumber, name, phone, amount, items = [] }) {
  const mandalName = process.env.MANDAL_NAME || "Shree Ganpati Mandal";
  const mandalAddress = process.env.MANDAL_ADDRESS || "Mumbai, Maharashtra, India";
  const mandalContact = process.env.MANDAL_CONTACT || "+91 98765 43210";
  const dir = path.join(__dirname, "..", "..", "receipts");
  fs.mkdirSync(dir, { recursive: true });

  const fileName = `${type}-${receiptNumber || id}.pdf`;
  const filePath = path.join(dir, fileName);
  const publicUrl = `${process.env.API_BASE_URL || "http://localhost:5000"}/receipts/${fileName}`;

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 48 });
    const stream = fs.createWriteStream(filePath);

    stream.on("finish", () => resolve(publicUrl));
    stream.on("error", reject);
    doc.pipe(stream);

    doc.rect(0, 0, doc.page.width, 96).fill("#b42318");
    doc.fillColor("#fff7ed").fontSize(24).text(mandalName, 48, 24, { align: "center" });
    doc.fillColor("#ffedd5").fontSize(10).text(`${mandalAddress} | ${mandalContact}`, 48, 56, { align: "center" });
    doc.fillColor("#7a2e0e").fontSize(16).text("Official Receipt", 48, 120, { align: "center" });
    doc.moveDown(2);

    doc.roundedRect(48, 158, doc.page.width - 96, 150, 8).fillAndStroke("#fff7ed", "#fed7aa");
    doc.fillColor("#111827").fontSize(12);
    doc.text(`Receipt Type: ${type.toUpperCase()}`, 68, 178);
    doc.text(`Receipt Number: ${receiptNumber || id}`);
    doc.text(`Reference ID: ${id}`);
    doc.text(`Name: ${name}`);
    doc.text(`Phone: ${phone}`);
    doc.text(`Amount: ${money(amount)}`);
    doc.text(`Date: ${new Date().toLocaleString("en-IN")}`);
    doc.y = 330;
    doc.moveDown();

    if (items.length) {
      doc.fontSize(15).fillColor("#b42318").text("Items");
      doc.moveDown(0.5).fillColor("#111827").fontSize(12);
      items.forEach((item) => {
        doc.text(`${item.name}${item.size ? ` (${item.size})` : ""} x ${item.quantity} - ${money(item.price * item.quantity)}`);
      });
      doc.moveDown();
    }

    doc
      .fillColor("#7a2e0e")
      .fontSize(12)
      .text("Thank you for supporting our Ganpati Utsav seva and community celebrations.")
      .moveDown()
      .fontSize(10)
      .fillColor("#6b7280")
      .text("This is a computer-generated receipt.");

    doc.end();
  });
}

module.exports = { buildReceipt };
