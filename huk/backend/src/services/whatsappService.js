async function sendWhatsAppReceipt({ phone, name, referenceId, receiptNumber, amount, receiptUrl, type }) {
  const token = process.env.META_WHATSAPP_TOKEN;
  const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID;

  const message = `Namaste ${name}, your ${type} ${receiptNumber || referenceId} for INR ${amount} is confirmed. Receipt: ${receiptUrl}`;

  if (!token || !phoneNumberId) {
    console.log("WhatsApp dev mode:", message);
    return { devMode: true, message };
  }

  const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: { preview_url: true, body: message },
    }),
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`WhatsApp send failed: ${payload}`);
  }

  return response.json();
}

module.exports = { sendWhatsAppReceipt };
