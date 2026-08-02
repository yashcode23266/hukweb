import { useState, useRef } from "react";
import { useLanguage } from "../i18n/useLanguage";
import imagetshirt from "../assets/tshirt.jpeg";
import imageidcard from "../assets/id.jpeg";

// ── Constants ─────────────────────────────────────────────────────────────────
const TSHIRT_SIZES = Array.from(
  { length: (48 - 18) / 2 + 1 },
  (_, i) => String(18 + i * 2)
);

const BACKEND_URL = "https://api.hukmillanecharaja.in";

// const BACKEND_URL = "http://localhost:8080";


const PRODUCT_CONFIG = [
  {
    id: "tshirt",
    type: "tshirt",
    price: 350,
    image: imagetshirt,
  },
  {
    id: "idcard",
    type: "idcard",
    price: 100,
    image: imageidcard,
  },
];

const shopText = {
  en: {
    eyebrow: "Limited Edition 2026",
    heroTitle: "Get Your Festival T-Shirt",
    heroSub: "Official Hukmill Lane Cha Raja T-shirt and volunteer ID card for devotees and volunteers.",
    buyNow: "Buy Now",
    availableSoon: "Available Soon",
    sizeHint: "Sizes 18 - 48 (step 2) · Same price all sizes",
    faqEyebrow: "Shop Help",
    faqTitle: "Frequently Asked Questions",
    faqCopy: "Everything you need to know before ordering the official mandal T-shirt or ID card.",
    products: {
      tshirt: {
        name: "Mandal T-Shirt",
        description: "Premium cotton festival T-shirt. Price is uniform across all sizes.",
        badge: "T-Shirt",
      },
      idcard: {
        name: "Volunteer ID Card",
        description: "Official laminated ID card for registered volunteers. Single standard size.",
        badge: "Volunteers",
      },
    },
    faqs: [
      {
        question: "How can I contact the Mandal for any enquiry?",
        answer: "Please reach out to us at Abhishek Bachankar on +91-9867174946 or Omkar Patne on +91-7208224609.",
      },
      {
        question: "How do I pay for my order?",
        answer: "Choose your product, size and quantity, enter your details, and continue to Razorpay. Available options may include UPI, cards, net banking, and supported wallets.",
      },
      {
        question: "Will I receive a payment receipt?",
        answer: "Yes. After payment is successfully verified, an order confirmation and downloadable receipt are shown on the screen. Keep the receipt for your records.",
      },
      {
        question: "Can I cancel my order or request a refund?",
        answer: "No. Once an order is successfully placed and payment is confirmed, it cannot be cancelled and the amount is non-refundable. Please verify the product, size, quantity, and customer details before paying.",
      },
      {
        question: "What if the transaction fails but money is debited?",
        answer: "If the payment fails but money is debited, the amount is normally reversed automatically to the original payment method within 5 to 7 working days. The exact time depends on your bank or payment provider. Keep the payment reference until the reversal is completed.",
      },
      {
        question: "How will I receive my T-shirt or ID card?",
        answer: "The T-shirt and ID card must be collected from the mandal. Please keep your booking ID, payment receipt, and registered phone number ready during collection.",
      },
    ],
  },
  mr: {
    eyebrow: "मर्यादित आवृत्ती २०२६",
    heroTitle: "उत्सवासाठी अधिकृत टी-शर्ट",
    heroSub: "भक्त आणि स्वयंसेवकांसाठी हुकमिल लेन चा राजा अधिकृत टी-शर्ट आणि स्वयंसेवक आयडी कार्ड.",
    buyNow: "आता खरेदी करा",
    sizeHint: "साइज 18 - 48 (2 च्या फरकाने) · सर्व साइजसाठी समान किंमत",
    faqEyebrow: "दुकान मदत",
    faqTitle: "वारंवार विचारले जाणारे प्रश्न",
    faqCopy: "अधिकृत मंडळ टी-शर्ट किंवा आयडी कार्ड ऑर्डर करण्यापूर्वी आवश्यक माहिती.",
    products: {
      tshirt: {
        name: "मंडळ टी-शर्ट",
        description: "प्रीमियम कॉटन उत्सव टी-शर्ट. सर्व साइजसाठी किंमत समान आहे.",
        badge: "टी-शर्ट",
      },
      idcard: {
        name: "स्वयंसेवक आयडी कार्ड",
        description: "नोंदणीकृत स्वयंसेवकांसाठी अधिकृत लॅमिनेटेड आयडी कार्ड. एकच स्टँडर्ड साइज.",
        badge: "स्वयंसेवक",
      },
    },
    faqs: [
      {
        question: "कुठल्या प्रकारच्या चौकशीसाठी मी मंडळाशी संपर्क करू शकतो?",
        answer: "कृपया अभिषेक बाचणकर यांच्याशी +91-9867174946 वर किंवा ओमकार पाटणे यांच्याशी +91-7208224609 वर संपर्क साधा.",
      },
      {
        question: "ऑर्डरचे पेमेंट कसे करायचे?",
        answer: "प्रोडक्ट, साइज आणि प्रमाण निवडा, तुमची माहिती भरा आणि Razorpay वर पेमेंट करा. UPI, कार्ड, नेट बँकिंग आणि उपलब्ध वॉलेट पर्याय वापरता येतील.",
      },
      {
        question: "मला पेमेंट पावती मिळेल का?",
        answer: "हो. पेमेंट यशस्वीरीत्या तपासल्यानंतर स्क्रीनवर ऑर्डर कन्फर्मेशन आणि डाउनलोड करता येणारी पावती दिसेल. पावती तुमच्या नोंदीसाठी जपून ठेवा.",
      },
      {
        question: "ऑर्डर रद्द किंवा रिफंड मिळू शकतो का?",
        answer: "नाही. ऑर्डर यशस्वीरीत्या झाल्यानंतर आणि पेमेंट कन्फर्म झाल्यानंतर ती रद्द करता येणार नाही आणि रक्कम परत केली जाणार नाही. पेमेंट करण्यापूर्वी प्रोडक्ट, साइज, प्रमाण आणि माहिती तपासा.",
      },
      {
        question: "व्यवहार फेल झाला पण पैसे डेबिट झाले तर?",
        answer: "पेमेंट फेल झाले पण पैसे डेबिट झाले असल्यास रक्कम सामान्यतः मूळ पेमेंट पद्धतीवर 5 ते 7 कामकाजाच्या दिवसांत आपोआप परत येते. अचूक वेळ बँक किंवा पेमेंट प्रदात्यावर अवलंबून असतो. रक्कम परत येईपर्यंत पेमेंट रेफरन्स जपून ठेवा.",
      },
      {
        question: "टी-शर्ट किंवा आयडी कार्ड कसे मिळेल?",
        answer: "टी-शर्ट आणि आयडी कार्ड मंडळातूनच घ्यावे लागेल. घेताना तुमचा बुकिंग आयडी, पेमेंट पावती आणि नोंदणीकृत फोन नंबर सोबत ठेवा.",
      },
    ],
  },
};

const idCardText = {
  en: {
    sectionTitle: "ID Card Details",
    namePlaceholder: "Name to print on ID card *",
    photoTitle: "Passport-size photo *",
    photoHelp: "Use a clear, front-facing photo. It will be cropped to passport size automatically.",
    camera: "Take Photo",
    gallery: "Choose from Gallery",
    processing: "Preparing photo...",
    photoRequired: "Please add a photo for the ID card.",
    photoInvalid: "Use a JPG, PNG, or WebP image up to 8 MB.",
    previewAlt: "Passport-size ID card preview",
    optimized: "Optimized photo",
  },
  mr: {
    sectionTitle: "आयडी कार्ड माहिती",
    namePlaceholder: "आयडी कार्डवर छापायचे नाव *",
    photoTitle: "पासपोर्ट साइज फोटो *",
    photoHelp: "समोरून काढलेला स्पष्ट फोटो वापरा. फोटो आपोआप पासपोर्ट साइजमध्ये क्रॉप केला जाईल.",
    camera: "फोटो काढा",
    gallery: "गॅलरीमधून निवडा",
    processing: "फोटो तयार होत आहे...",
    photoRequired: "आयडी कार्डसाठी फोटो जोडा.",
    photoInvalid: "8 MB पर्यंतचा JPG, PNG किंवा WebP फोटो वापरा.",
    previewAlt: "पासपोर्ट साइज आयडी कार्ड फोटो",
    optimized: "ऑप्टिमाइज केलेला फोटो",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

function validateName(name) {
  const trimmed = name.trim();
  if (!trimmed) return "Full name is required.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  if (!/^[a-zA-Z\s'.'-]+$/.test(trimmed)) return "Name can only contain letters and spaces.";
  return null;
}

function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, "");
  if (!cleaned) return "Phone number is required.";
  if (cleaned.length !== 10) return "Enter a valid 10-digit phone number.";
  if (!/^[6-9]/.test(cleaned)) return "Phone must start with 6, 7, 8, or 9.";
  return null;
}

function validateEmail(email) {
  if (!email.trim()) return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email address.";
  return null;
}

function validateCardName(name) {
  const trimmed = name.trim();
  if (!trimmed) return "Name for the ID card is required.";
  if (trimmed.length < 2) return "ID card name must be at least 2 characters.";
  if (!/^[\p{L}\p{M}\s'.-]+$/u.test(trimmed)) return "Use letters and spaces only for the ID card name.";
  return null;
}

function buildSizeNote(rows) {
  return rows
    .map((r) => `Size ${r.size} x${r.quantity}`)
    .join(", ");
}

const PASSPORT_PHOTO_WIDTH = 600;
const PASSPORT_PHOTO_HEIGHT = 771;
const TARGET_PHOTO_BYTES = 180 * 1024;
const MIN_PHOTO_QUALITY = 0.72;

function getDataUrlByteSize(dataUrl) {
  const base64 = dataUrl.split(",")[1] || "";
  const padding = (base64.match(/=*$/)?.[0].length || 0);
  return Math.max(0, Math.ceil((base64.length * 3) / 4) - padding);
}

function dataUrlToFile(dataUrl, fileName) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, { type: mime });
}

function createPassportPhoto(file) {
  return new Promise((resolve, reject) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type) || file.size > 8 * 1024 * 1024) {
      reject(new Error("INVALID_PHOTO"));
      return;
    }

    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = PASSPORT_PHOTO_WIDTH;
      canvas.height = PASSPORT_PHOTO_HEIGHT;
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("INVALID_PHOTO"));
        return;
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      const targetRatio = PASSPORT_PHOTO_WIDTH / PASSPORT_PHOTO_HEIGHT;
      const sourceRatio = image.naturalWidth / image.naturalHeight;
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = image.naturalWidth;
      let sourceHeight = image.naturalHeight;

      if (sourceRatio > targetRatio) {
        sourceWidth = sourceHeight * targetRatio;
        sourceX = (image.naturalWidth - sourceWidth) / 2;
      } else {
        sourceHeight = sourceWidth / targetRatio;
        sourceY = (image.naturalHeight - sourceHeight) / 2;
      }

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);

      URL.revokeObjectURL(objectUrl);
      let quality = 0.9;
      let photoBase64 = canvas.toDataURL("image/jpeg", quality);
      let photoByteSize = getDataUrlByteSize(photoBase64);

      while (photoByteSize > TARGET_PHOTO_BYTES && quality > MIN_PHOTO_QUALITY) {
        quality = Math.max(MIN_PHOTO_QUALITY, quality - 0.04);
        photoBase64 = canvas.toDataURL("image/jpeg", quality);
        photoByteSize = getDataUrlByteSize(photoBase64);
      }

      resolve({
        photoBase64,
        photoFileName: `${file.name.replace(/\.[^.]+$/, "") || "id-photo"}.jpg`,
        photoMimeType: "image/jpeg",
        photoWidth: PASSPORT_PHOTO_WIDTH,
        photoHeight: PASSPORT_PHOTO_HEIGHT,
        photoByteSize,
        compressionQuality: Number(quality.toFixed(2)),
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("INVALID_PHOTO"));
    };

    image.src = objectUrl;
  });
}

let razorpaySdkPromise;

function loadRazorpaySdk() {
  if (window.Razorpay) return Promise.resolve();
  if (razorpaySdkPromise) return razorpaySdkPromise;

  razorpaySdkPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById("razorpay-checkout-sdk");
    if (existingScript) {
      existingScript.addEventListener("load", resolve, { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Razorpay SDK failed to load.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = () => {
      razorpaySdkPromise = null;
      reject(new Error("Razorpay SDK failed to load."));
    };
    document.head.appendChild(script);
  });

  return razorpaySdkPromise;
}

async function openRazorpay(options) {
  await loadRazorpaySdk();
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error("Razorpay SDK not loaded."));
      return;
    }
    const rzp = new window.Razorpay({ ...options, handler: resolve });
    rzp.on("payment.failed", (resp) => reject(resp.error));
    rzp.open();
  });
}

// ── Segregated API calls ──────────────────────────────────────────────────────

/**
 * T-Shirt: POST /tshirt/createOrder  — plain JSON body
 */
async function createTshirtOrder(payload) {
  console.log("This is my payload ",payload);
  const res = await fetch(`${BACKEND_URL}/tshirt/createOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/**
 * T-Shirt: POST /tshirt/paymentCallback  — query params
 */
async function tshirtPaymentCallback(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BACKEND_URL}/tshirt/paymentCallback?${query}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/**
 * ID Card: POST /id-card/createOrder  — multipart/form-data
 *   - Part "orders": JSON blob (application/json)
 *   - Part "multipartFile": the passport photo file
 */
async function createIdCardOrder(payload, photoFile) {
  console.log("This ID CARD INPUT CONTENT ",payload);
  console.log("This ID CARD INPUT Photo ",photoFile);

  const formData = new FormData();

  // Spring @RequestBody expects the JSON part as a blob with application/json
  const jsonBlob = new Blob([JSON.stringify(payload)], { type: "application/json" });
  formData.append("orders", jsonBlob);
  formData.append("multipartFile", photoFile);

  const res = await fetch(`${BACKEND_URL}/id-card/createOrder`, {
    method: "POST",
    body: formData,
    // Do NOT set Content-Type header — browser sets it with boundary automatically
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/**
 * ID Card: POST /id-card/paymentCallback  — query params
 */
async function idCardPaymentCallback(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BACKEND_URL}/id-card/paymentCallback?${query}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// ── Processing Overlay ────────────────────────────────────────────────────────
function ProcessingOverlay({ message }) {
  return (
    <div style={s.processingOverlay}>
      <div style={s.processingCard}>
        <div style={s.spinnerWrap}>
          <svg style={s.spinner} viewBox="0 0 50 50">
            <circle
              cx="25" cy="25" r="20"
              fill="none"
              stroke="#b71c1c"
              strokeWidth="4"
              strokeDasharray="100 28"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p style={s.processingTitle}>Processing…</p>
        <p style={s.processingMsg}>{message}</p>
        <p style={s.processingHint}>Please don't close this window</p>
      </div>
    </div>
  );
}

// ── Reusable validated field ──────────────────────────────────────────────────
function ValidatedInput({ type = "text", placeholder, value, onChange, error, valid, hint, prefix, maxLength, required }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ position: "relative" }}>
        {prefix && <span style={s.fieldPrefix}>{prefix}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
          maxLength={maxLength}
          style={{
            ...s.input,
            paddingLeft: prefix ? 44 : 14,
            paddingRight: valid ? 36 : 14,
            borderColor: error ? "#ef4444" : valid ? "#22c55e" : "#f5deb3",
          }}
        />
        {valid && !error && <span style={s.fieldCheck}>✓</span>}
      </div>
      {error && <span style={s.fieldError}>{error}</span>}
      {!error && hint && <span style={s.fieldHint}>{hint}</span>}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Shop() {
  const { language } = useLanguage();
  const copy = shopText[language] || shopText.en;
  // # SHOP SALE PAUSED: this label powers the temporary "Available Soon" product buttons.
  const productActionLabel = language === "mr" ? "लवकरच उपलब्ध" : copy.availableSoon;
  const products = PRODUCT_CONFIG.map((product) => ({
    ...product,
    ...copy.products[product.id],
  }));

  const [activeProduct, setActiveProduct] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [failureData, setFailureData] = useState(null);

  return (
    <div style={s.page}>
      <section style={s.hero}>
        <div style={s.heroContent}>
          <p style={s.eyebrow}>{copy.eyebrow}</p>
          <h1 style={s.heroTitle}>{copy.heroTitle}</h1>
          <p style={s.heroSub}>{copy.heroSub}</p>
        </div>
        <div style={s.heroDeco} />
      </section>

      <main style={s.main}>
        <div style={s.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} copy={copy} actionLabel={productActionLabel}   onAdd={() => setActiveProduct(p)}/>
          ))}
        </div>
        <ShopFaq copy={copy} />
      </main>

      {activeProduct && (
        <OrderPopup
          product={activeProduct}
          idCopy={idCardText[language] || idCardText.en}
          onClose={() => setActiveProduct(null)}
          onSuccess={(data) => { setActiveProduct(null); setReceiptData(data); }}
          onFailure={(err) => { setActiveProduct(null); setFailureData(err); }}
        />
      )}

      {receiptData && <ReceiptPopup data={receiptData} onClose={() => setReceiptData(null)} />}
      {failureData && <FailurePopup error={failureData} onClose={() => setFailureData(null)} onRetry={() => setFailureData(null)} />}
    </div>
  );
}

function ShopFaq({ copy }) {
  return (
    <section style={s.faqSection} aria-labelledby="shop-faq-title">
      <div style={s.faqIntro}>
        <p style={s.faqEyebrow}>{copy.faqEyebrow}</p>
        <h2 id="shop-faq-title" style={s.faqTitle}>{copy.faqTitle}</h2>
        <p style={s.faqCopy}>{copy.faqCopy}</p>
      </div>
      <div style={s.faqList}>
        {copy.faqs.map((item, index) => (
          <details key={item.question} style={s.faqItem} open={index === 0}>
            <summary style={s.faqQuestion}>
              <span>{item.question}</span>
              <span aria-hidden="true" style={s.faqIcon}>+</span>
            </summary>
            <p style={s.faqAnswer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
function ProductCard({ product, copy, actionLabel, onAdd }) {
  return (
    <article style={s.card}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={product.image} alt={product.name} style={s.cardImg} />
        <span style={s.cardBadge}>{product.badge}</span>
        <span style={s.cardPrice}>{money(product.price)}</span>
      </div>
      <div style={s.cardBody}>
        <h2 style={s.cardTitle}>{product.name}</h2>
        <p style={s.cardDesc}>{product.description}</p>
        {product.type === "tshirt" && (
          <p style={s.sizeHint}>{copy.sizeHint}</p>
        )}
        {/* # SHOP SALE PAUSED BACKUP: uncomment this button and comment Buy Now below to pause sales again. */}
        {/*
        <button type="button" disabled style={{ ...s.addBtn, ...s.disabledAddBtn }}>
          {actionLabel}
        </button>
        */}

        {/* # BUY NOW ACTIVE: original checkout-opening button. */}
        <button type="button" onClick={onAdd} style={s.addBtn}>
          {copy.buyNow}
        </button>
      </div>
    </article>
  );
}

// ── Order Popup ───────────────────────────────────────────────────────────────
function OrderPopup({ product, idCopy, onClose, onSuccess, onFailure }) {
  const isTshirt = product.type === "tshirt";
  const isIdCard = product.type === "idcard";

  // T-shirt state — sizes + quantities
  const [rows, setRows] = useState([{ size: TSHIRT_SIZES[0], quantity: 1 }]);

  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ name: "", phoneNumber: "", email: "" });
  const [touched, setTouched] = useState({ name: false, phoneNumber: false, email: false });

  // ID Card specific state
  const [idCard, setIdCard] = useState({ cardholderName: "", photo: null, rawFile: null });
  const [idCardTouched, setIdCardTouched] = useState(false);
  const [photoError, setPhotoError] = useState(null);
  const [photoProcessing, setPhotoProcessing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState("Verifying your payment…");
  const [bridging, setBridging] = useState(false);
  const [inlineError, setInlineError] = useState(null);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // ID Card: quantity is always 1
  const totalQty = isIdCard ? 1 : rows.reduce((acc, r) => acc + r.quantity, 0);
  const totalAmt = totalQty * product.price;

  const nameError  = validateName(customer.name);
  const phoneError = validatePhone(customer.phoneNumber);
  const emailError = validateEmail(customer.email);
  const cardNameError = isIdCard ? validateCardName(idCard.cardholderName) : null;

  const nameValid  = !nameError  && customer.name.trim().length > 0;
  const phoneValid = !phoneError && customer.phoneNumber.length === 10;
  const emailValid = !emailError && customer.email.trim().length > 0;

  const phoneHint = !phoneError && customer.phoneNumber.length > 0 && customer.phoneNumber.length < 10
    ? `${10 - customer.phoneNumber.length} more digits needed`
    : null;

  function touch(field) { setTouched((t) => ({ ...t, [field]: true })); }

  function updateRow(i, field, value) {
    setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  }
  function addRow() { setRows((prev) => [...prev, { size: TSHIRT_SIZES[0], quantity: 1 }]); }
  function removeRow(i) { setRows((prev) => prev.filter((_, idx) => idx !== i)); }

  function goToStep2() {
    if (isTshirt && totalQty === 0) return;
    if (isTshirt) {
      const merged = {};
      rows.forEach(({ size, quantity }) => { merged[size] = (merged[size] || 0) + quantity; });
      setRows(Object.entries(merged).map(([size, quantity]) => ({ size, quantity })));
    }
    setStep(2);
  }

  function handlePhoneChange(val) {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    setCustomer((c) => ({ ...c, phoneNumber: digits }));
  }

  async function handleIdPhoto(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    setPhotoProcessing(true);
    setPhotoError(null);
    try {
      const processedPhoto = await createPassportPhoto(file);
      // Convert the base64 back to a File so we can send it via FormData
      const photoFile = dataUrlToFile(processedPhoto.photoBase64, processedPhoto.photoFileName);
      setIdCard((current) => ({ ...current, photo: processedPhoto, rawFile: photoFile }));
    } catch {
      setIdCard((current) => ({ ...current, photo: null, rawFile: null }));
      setPhotoError(idCopy.photoInvalid);
    } finally {
      setPhotoProcessing(false);
      input.value = "";
    }
  }

  function bridgeToFailure(errorObj, ms = 1500) {
    setBridging(true);
    setTimeout(() => {
      setBridging(false);
      onFailure(errorObj);
    }, ms);
  }

  async function handlePay(e) {
    e.preventDefault();
    setTouched({ name: true, phoneNumber: true, email: true });
    setIdCardTouched(true);

    if (nameError || phoneError || emailError) return;
    if (isIdCard && (cardNameError || !idCard.photo)) {
      if (!idCard.photo && !photoError) setPhotoError(idCopy.photoRequired);
      return;
    }

    try {
      setLoading(true);
      setInlineError(null);

      let order;

      if (isTshirt) {
        // ── T-Shirt: JSON body to /tshirt/createOrder ─────────────────────
        const payload = {
          name: customer.name.trim(),
          email: customer.email.trim(),
          phoneNumber: customer.phoneNumber,
          amount: totalAmt,
          sizeQuantities: rows.map((r) => ({ size: r.size, quantity: r.quantity })),
          totalQuantity: totalQty,
        };
        order = await createTshirtOrder(payload);
      } else {
        // ── ID Card: multipart/form-data to /id-card/createOrder ──────────
        const payload = {
          name: customer.name.trim(),
          email: customer.email.trim(),
          phoneNumber: customer.phoneNumber,
          amount: totalAmt,
          totalQuantity: 1,
          idCardHolderName: idCard.cardholderName.trim(),
        };
        order = await createIdCardOrder(payload, idCard.rawFile);
      }

      // ── Open Razorpay ─────────────────────────────────────────────────────
      let payment;
      try {
        payment = await openRazorpay({
          key: order.razorpayKeyId || "rzp_live_TI5mhuDx4N3Prw",
          amount: order.amount * 100,
          currency: "INR",
          name: "HukmillLane Cha Raja",
          description: `Order – ${product.name}`,
          order_id: order.razorpayOrderId,
          prefill: {
            name: customer.name.trim(),
            email: customer.email.trim(),
            contact: customer.phoneNumber,
          },
          notes: {
            name: customer.name.trim(),
            product: product.name,
            ...(isTshirt && { sizes_and_quantities: buildSizeNote(rows), total_pieces: String(totalQty) }),
            ...(isIdCard && { id_card_name: idCard.cardholderName.trim() }),
            customer_phone: customer.phoneNumber,
          },
          theme: { color: "#b71c1c" },
        });
      } catch (rzpErr) {
        setLoading(false);
        const callbackFn = isTshirt ? tshirtPaymentCallback : idCardPaymentCallback;
        if (rzpErr?.metadata) {
          callbackFn({
            razorpay_order_id: rzpErr.metadata.order_id || order.razorpayOrderId,
            razorpay_payment_id: rzpErr.metadata.payment_id || "",
            razorpay_signature: "",
          }).catch(() => {});
        }
        bridgeToFailure({
          code: rzpErr?.code || "PAYMENT_CANCELLED",
          description: rzpErr?.description || "Payment was cancelled or not completed. Please try again.",
          orderId: order.razorpayOrderId,
        });
        return;
      }

      // ── Verify payment with the correct backend endpoint ──────────────────
      setLoading(false);
      setVerifying(true);
      setVerifyMsg("Verifying your payment…");

      const slowTimer = setTimeout(() => {
        setVerifyMsg("Still confirming with our server… almost there.");
      }, 5000);

      const callbackFn = isTshirt ? tshirtPaymentCallback : idCardPaymentCallback;

      let verified;
      try {
        verified = await Promise.race([
          callbackFn({
            razorpay_order_id: payment.razorpay_order_id,
            razorpay_payment_id: payment.razorpay_payment_id,
            razorpay_signature: payment.razorpay_signature,
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("TIMEOUT")), 30000)
          ),
        ]);
      } catch (verifyErr) {
        clearTimeout(slowTimer);
        setVerifying(false);
        onFailure(
          verifyErr.message === "TIMEOUT"
            ? {
                code: "VERIFY_TIMEOUT",
                description: "Your payment was received but confirmation is taking too long. Please contact support with your payment ID.",
                orderId: order.razorpayOrderId,
                paymentId: payment.razorpay_payment_id,
              }
            : {
                code: "VERIFY_FAILED",
                description: verifyErr.message || "Payment verification failed. Contact support.",
                orderId: order.razorpayOrderId,
                paymentId: payment.razorpay_payment_id,
              }
        );
        return;
      }

      clearTimeout(slowTimer);
      setVerifying(false);

      if (verified?.orderStatus === "PAYMENT_SUCCESS") {
        onSuccess({
          ...verified,
          customerName: customer.name.trim(),
          productName: product.name,
          ...(isTshirt && { sizeQuantities: rows }),
        });
      } else {
        onFailure({
          description: "Payment verification failed. Contact support.",
          orderId: order.razorpayOrderId,
          paymentId: payment.razorpay_payment_id,
        });
      }
    } catch (err) {
      setVerifying(false);
      setInlineError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (verifying) return <ProcessingOverlay message={verifyMsg} />;
  if (bridging)  return <ProcessingOverlay message="Checking payment status…" />;

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.popup}>
        {/* Header */}
        <div style={s.popupHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={product.image} alt="" style={s.popupThumb} />
            <div>
              <p style={s.popupProductName}>{product.name}</p>
              <p style={s.popupProductPrice}>{money(product.price)} per piece</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Only show step indicator for T-shirt (ID card is always step 1 → 2) */}
            <div style={s.steps}>
              <span style={{ ...s.stepDot, background: "#b71c1c", color: "#fff" }}>1</span>
              <div style={s.stepLine} />
              <span style={{ ...s.stepDot, background: step === 2 ? "#b71c1c" : "#e0e0e0", color: step === 2 ? "#fff" : "#9e9e9e" }}>2</span>
            </div>
            <button onClick={onClose} style={s.closeBtn}>✕</button>
          </div>
        </div>

        {/* ── Step 1 ─────────────────────────────────────────────────────── */}
        {step === 1 && (
          <div style={s.popupBody}>
            {isTshirt ? (
              <>
                <p style={s.sectionLabel}>Select Sizes &amp; Quantities</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {rows.map((row, i) => (
                    <div key={i} style={s.modalRow}>
                      <select
                        value={row.size}
                        onChange={(e) => updateRow(i, "size", e.target.value)}
                        style={s.sizeSelect}
                      >
                        {TSHIRT_SIZES.map((sz) => (
                          <option key={sz} value={sz}>Size {sz}</option>
                        ))}
                      </select>
                      <div style={s.stepper}>
                        <button type="button" style={s.stepBtn} onClick={() => updateRow(i, "quantity", Math.max(1, row.quantity - 1))}>−</button>
                        <span style={s.stepNum}>{row.quantity}</span>
                        <button type="button" style={s.stepBtn} onClick={() => updateRow(i, "quantity", row.quantity + 1)}>+</button>
                      </div>
                      <span style={s.rowAmt}>{money(row.quantity * product.price)}</span>
                      {rows.length > 1 && (
                        <button type="button" style={s.removeRowBtn} onClick={() => removeRow(i)}>✕</button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addRow} style={s.addSizeBtn}>+ Add another size</button>
              </>
            ) : (
              /* ID Card — no size/quantity selection needed */
              <div style={s.idCardSummaryBox}>
                <span style={s.idCardSummaryIcon}>🪪</span>
                <div>
                  <p style={{ margin: "0 0 4px", fontWeight: 900, fontSize: 15, color: "#424242" }}>Volunteer ID Card</p>
                  <p style={{ margin: 0, fontSize: 13, color: "#757575", lineHeight: 1.5 }}>
                    1 laminated ID card · Standard size
                  </p>
                </div>
              </div>
            )}

            <div style={s.summaryBar}>
              <div>
                <span style={{ fontSize: 12, color: "#9e9e9e", fontWeight: 700 }}>TOTAL</span>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#b71c1c" }}>{money(totalAmt)}</div>
                <span style={{ fontSize: 12, color: "#757575" }}>{totalQty} {totalQty === 1 ? "piece" : "pieces"}</span>
              </div>
              <button
                type="button"
                disabled={isTshirt && totalQty === 0}
                onClick={goToStep2}
                style={{ ...s.primaryBtn, opacity: (isTshirt && totalQty === 0) ? 0.5 : 1 }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2 ─────────────────────────────────────────────────────── */}
        {step === 2 && (
          <div style={s.popupBody}>
            {/* Order Summary */}
            <div style={s.orderSummary}>
              <p style={s.sectionLabel}>Your Order</p>
              {isTshirt ? (
                rows.map((r) => (
                  <div key={r.size} style={s.summaryLine}>
                    <span style={{ fontWeight: 700, color: "#424242" }}>Size {r.size} × {r.quantity}</span>
                    <span style={{ fontWeight: 800, color: "#b71c1c" }}>{money(r.quantity * product.price)}</span>
                  </div>
                ))
              ) : (
                <div style={s.summaryLine}>
                  <span style={{ fontWeight: 700, color: "#424242" }}>ID Card × 1</span>
                  <span style={{ fontWeight: 800, color: "#b71c1c" }}>{money(product.price)}</span>
                </div>
              )}
              <div style={{ ...s.summaryLine, borderTop: "1px solid #f5deb3", paddingTop: 8, marginTop: 4 }}>
                <span style={{ fontWeight: 900, fontSize: 16 }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: 16, color: "#b71c1c" }}>{money(totalAmt)}</span>
              </div>
            </div>

            <form onSubmit={handlePay} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={s.sectionLabel}>Your Details</p>

              <ValidatedInput
                type="text" placeholder="Full Name *" value={customer.name} required
                onChange={(e) => { setCustomer({ ...customer, name: e.target.value }); touch("name"); }}
                error={touched.name ? nameError : null} valid={nameValid}
              />
              <ValidatedInput
                type="tel" placeholder="10-digit phone number *" value={customer.phoneNumber}
                required prefix="+91" maxLength={10}
                onChange={(e) => { handlePhoneChange(e.target.value); touch("phoneNumber"); }}
                error={touched.phoneNumber ? phoneError : null} valid={phoneValid} hint={phoneHint}
              />
              <ValidatedInput
                type="email" placeholder="Email Address *" value={customer.email} required
                onChange={(e) => { setCustomer({ ...customer, email: e.target.value }); touch("email"); }}
                error={touched.email ? emailError : null} valid={emailValid}
              />

              {/* ID Card extra fields */}
              {isIdCard && (
                <section style={s.idCardPanel} aria-labelledby="id-card-details-title">
                  <p id="id-card-details-title" style={s.idCardTitle}>{idCopy.sectionTitle}</p>

                  <ValidatedInput
                    type="text"
                    placeholder={idCopy.namePlaceholder}
                    value={idCard.cardholderName}
                    required
                    maxLength={60}
                    onChange={(event) => {
                      setIdCard((current) => ({ ...current, cardholderName: event.target.value }));
                      setIdCardTouched(true);
                    }}
                    error={idCardTouched ? cardNameError : null}
                    valid={!cardNameError && idCard.cardholderName.trim().length > 0}
                  />

                  <div>
                    <p style={s.idPhotoLabel}>{idCopy.photoTitle}</p>
                    <p style={s.idPhotoHelp}>{idCopy.photoHelp}</p>

                    <div style={s.idPhotoLayout}>
                      <div style={s.passportFrame}>
                        {idCard.photo ? (
                          <img
                            src={idCard.photo.photoBase64}
                            alt={idCopy.previewAlt}
                            style={s.passportPreview}
                          />
                        ) : (
                          <div style={s.passportPlaceholder} aria-hidden="true">
                            <span style={s.passportHead} />
                            <span style={s.passportBody} />
                          </div>
                        )}
                      </div>

                      <div style={s.idPhotoActions}>
                        <input
                          ref={cameraInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          capture="user"
                          onChange={handleIdPhoto}
                          style={s.hiddenFileInput}
                        />
                        <input
                          ref={galleryInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleIdPhoto}
                          style={s.hiddenFileInput}
                        />
                        <button
                          type="button"
                          onClick={() => cameraInputRef.current?.click()}
                          disabled={photoProcessing}
                          style={s.photoActionBtn}
                        >
                          {photoProcessing ? idCopy.processing : idCopy.camera}
                        </button>
                        <button
                          type="button"
                          onClick={() => galleryInputRef.current?.click()}
                          disabled={photoProcessing}
                          style={s.photoSecondaryBtn}
                        >
                          {idCopy.gallery}
                        </button>
                      </div>
                    </div>

                    {idCard.photo && (
                      <p style={s.optimizedPhotoNote}>
                        {idCopy.optimized}: {Math.max(1, Math.round(idCard.photo.photoByteSize / 1024))} KB · {idCard.photo.photoWidth} × {idCard.photo.photoHeight}
                      </p>
                    )}
                    {photoError && <p style={s.fieldError}>{photoError}</p>}
                  </div>
                </section>
              )}

              {inlineError && <div style={s.inlineError}>{inlineError}</div>}

              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button type="button" onClick={() => { setStep(1); setInlineError(null); }} style={s.backBtn}>← Back</button>
                <button
                  type="submit"
                  disabled={loading || photoProcessing}
                  style={{ ...s.primaryBtn, flex: 1, opacity: loading || photoProcessing ? 0.7 : 1 }}
                >
                  {loading ? "Processing…" : `Pay ${money(totalAmt)}`}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Receipt / Success Popup ───────────────────────────────────────────────────
function ReceiptPopup({ data, onClose }) {
  const receiptRef = useRef(null);

  const orderedAt = data.updatedAt
    ? new Date(data.updatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    : new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  const pricePerPiece = data.totalQuantity > 0 ? data.amount / data.totalQuantity : 0;

  function handleDownload() {
    const sizeRows = data.sizeQuantities?.length > 0
      ? `<div class="sizes">${data.sizeQuantities.map(sq => `<p>Size ${sq.size} × ${sq.quantity}</p>`).join("")}</div>`
      : "";

    const receiptHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/><title>Receipt – ${data.razorpayOrderId || "Order"}</title>
<style>
  body{font-family:'Segoe UI',sans-serif;max-width:480px;margin:40px auto;color:#212121}
  .header{text-align:center;border-bottom:2px solid #b71c1c;padding-bottom:16px;margin-bottom:24px}
  .header h1{color:#b71c1c;font-size:22px;margin:0 0 4px}.header p{color:#757575;font-size:13px;margin:0}
  .badge{display:inline-block;background:#dcfce7;color:#166534;padding:4px 14px;border-radius:20px;font-size:13px;font-weight:700;margin-bottom:16px}
  .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:14px}
  .row .label{color:#9e9e9e;font-weight:600}.row .value{font-weight:700;color:#212121}
  .total-row{display:flex;justify-content:space-between;padding:12px 0;font-size:18px;font-weight:900;color:#b71c1c;border-top:2px solid #b71c1c;margin-top:8px}
  .sizes{background:#fff9f0;border-radius:8px;padding:12px 14px;margin:12px 0}.sizes p{margin:4px 0;font-size:13px;font-weight:600}
  .footer{text-align:center;margin-top:32px;font-size:12px;color:#bdbdbd}
</style></head><body>
  <div class="header"><h1>🎉 HukmillLane Cha Raja</h1><p>Official Payment Receipt</p></div>
  <div style="text-align:center"><span class="badge">✅ Payment Successful</span></div>
  <div class="row"><span class="label">Booking ID</span><span class="value">${data.bookingId || "—"}</span></div>
  <div class="row"><span class="label">Customer</span><span class="value">${data.customerName || data.Name || "—"}</span></div>
  <div class="row"><span class="label">Phone</span><span class="value">${data.phoneNumber || "—"}</span></div>
  ${data.email ? `<div class="row"><span class="label">Email</span><span class="value">${data.email}</span></div>` : ""}
  <div class="row"><span class="label">Order ID</span><span class="value" style="font-family:monospace;font-size:12px">${data.razorpayOrderId || "—"}</span></div>
  <div class="row"><span class="label">Payment ID</span><span class="value" style="font-family:monospace;font-size:12px">${data.razorpayPaymentId || "—"}</span></div>
  <div class="row"><span class="label">Status</span><span class="value" style="color:#166534">CONFIRMED</span></div>
  <div class="row"><span class="label">Total Quantity</span><span class="value">${data.totalQuantity}</span></div>
  <div class="row"><span class="label">Date & Time</span><span class="value">${orderedAt}</span></div>
  <div class="row"><span class="label">Product</span><span class="value">${data.productName || "Festival Item"}</span></div>
  ${sizeRows}
  <div class="total-row"><span>Total Paid</span><span>₹${data.amount || "—"}</span></div>
  <div class="footer">Thank you for your order! Keep this receipt for your records.</div>
</body></html>`;

    const win = window.open("", "_blank");
    win.document.write(receiptHtml);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 500);
  }

  return (
    <div style={s.overlay}>
      <div style={{ ...s.popup, maxWidth: 460 }}>
        <div style={s.successHeader}>
          <div style={s.successIcon}>🎉</div>
          <h2 style={s.successTitle}>Payment Successful!</h2>
          <p style={s.successSub}>Your order is confirmed. Here's your receipt.</p>
        </div>

        <div style={s.receiptBody} ref={receiptRef}>
          <div style={s.receiptDivider}>
            <div style={s.dashedLine} />
            <span style={s.receiptLabel}>RECEIPT</span>
            <div style={s.dashedLine} />
          </div>

          <ReceiptRow label="Booking ID" value={data.bookingId || "—"} />
          <ReceiptRow label="Customer" value={data.customerName || data.Name || "—"} />
          <ReceiptRow label="Phone" value={data.phoneNumber || "—"} />
          {data.email && <ReceiptRow label="Email" value={data.email} />}
          <ReceiptRow label="Product" value={data.productName || "Festival Item"} />

          {/* T-Shirt sizes breakdown */}
          {data.sizeQuantities?.length > 0 && (
            <div style={s.sizesBox}>
              {data.sizeQuantities.map((sq) => (
                <div key={sq.size} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "#616161", fontWeight: 600 }}>
                    Size {sq.size} × {sq.quantity}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#424242" }}>
                    {money(sq.quantity * pricePerPiece)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ID Card holder name */}
          {data.idCardHolderName && (
            <ReceiptRow label="ID Card Name" value={data.idCardHolderName} />
          )}

          <ReceiptRow label="Total Quantity" value={`${data.totalQuantity} ${data.totalQuantity === 1 ? "piece" : "pieces"}`} />
          <ReceiptRow label="Order ID" value={data.razorpayOrderId} mono />
          <ReceiptRow label="Payment ID" value={data.razorpayPaymentId} mono />
          <ReceiptRow label="Date" value={orderedAt} />
          <ReceiptRow label="Status" value="✅ CONFIRMED" highlight />

          <div style={{ ...s.receiptDivider, margin: "12px 0 0" }}>
            <div style={s.dashedLine} />
          </div>

          <div style={s.receiptTotal}>
            <span>Total Paid</span>
            <span style={{ color: "#b71c1c" }}>{money(data.amount)}</span>
          </div>
        </div>

        <div style={{ padding: "0 22px 24px", display: "flex", gap: 10 }}>
          <button onClick={handleDownload} style={s.downloadBtn}>⬇ Download Receipt</button>
          <button onClick={onClose} style={{ ...s.primaryBtn, flex: 1 }}>Done</button>
        </div>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value, mono, highlight }) {
  return (
    <div style={s.receiptRow}>
      <span style={s.receiptRowLabel}>{label}</span>
      <span style={{
        ...s.receiptRowValue,
        fontFamily: mono ? "monospace" : "inherit",
        fontSize: mono ? 12 : 14,
        color: highlight ? "#166534" : "#212121",
        background: highlight ? "#dcfce7" : "transparent",
        padding: highlight ? "2px 8px" : 0,
        borderRadius: highlight ? 20 : 0,
      }}>
        {value || "—"}
      </span>
    </div>
  );
}

// ── Failure Popup ─────────────────────────────────────────────────────────────
const FAILURE_TIPS = [
  "Ensure you have sufficient balance.",
  "Try a different payment method.",
  "Contact your bank if the issue persists.",
];

function FailurePopup({ error, onClose, onRetry }) {
  return (
    <div style={s.overlay}>
      <div style={{ ...s.popup, maxWidth: 420 }}>
        <div style={s.failureHeader}>
          <div style={s.failureIcon}>✕</div>
          <h2 style={s.failureTitle}>Payment Failed</h2>
          <p style={s.failureSub}>{error?.description || "Your payment could not be processed."}</p>
        </div>
        <div style={s.failureBody}>
          {error?.orderId && (
            <div style={s.failureDetail}>
              <span style={s.failureDetailLabel}>Order Reference</span>
              <span style={{ ...s.failureDetailValue, fontFamily: "monospace", fontSize: 12 }}>{error.orderId}</span>
            </div>
          )}
          {error?.paymentId && (
            <div style={s.failureDetail}>
              <span style={s.failureDetailLabel}>Payment ID</span>
              <span style={{ ...s.failureDetailValue, fontFamily: "monospace", fontSize: 12 }}>{error.paymentId}</span>
            </div>
          )}
          <div style={s.failureTips}>
            <p style={{ fontWeight: 800, fontSize: 13, marginBottom: 8, color: "#7c2d12" }}>What you can do:</p>
            {FAILURE_TIPS.map((tip) => (
              <p key={tip} style={{ fontSize: 13, color: "#9a3412", margin: "4px 0", paddingLeft: 14, position: "relative" }}>
                <span style={{ position: "absolute", left: 0 }}>•</span>{tip}
              </p>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 22px 24px", display: "flex", gap: 10 }}>
          <button onClick={onClose} style={s.backBtn}>Close</button>
          <button onClick={onRetry} style={{ ...s.primaryBtn, flex: 1 }}>Try Again</button>
        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: "linear-gradient(160deg,#fff8f0 0%,#fff3e0 50%,#fce4ec 100%)", fontFamily: "'Segoe UI',system-ui,sans-serif", color: "#212121" },
  hero: { position: "relative", background: "linear-gradient(135deg,#b71c1c 0%,#880e0e 60%,#4a0000 100%)", color: "#fff", padding: "clamp(44px,8vw,64px) clamp(16px,4vw,24px)", overflow: "hidden", textAlign: "center" },
  heroDeco: { position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,200,0,0.10)", pointerEvents: "none" },
  heroContent: { position: "relative", maxWidth: 640, margin: "0 auto" },
  eyebrow: { fontSize: 12, fontWeight: 800, letterSpacing: "0.25em", color: "#ffcc80", textTransform: "uppercase", marginBottom: 12 },
  heroTitle: { fontSize: "clamp(2rem,6vw,3.5rem)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "-1px" },
  heroSub: { fontSize: 16, color: "rgba(255,255,255,0.82)", lineHeight: 1.7 },
  main: { maxWidth: 1100, margin: "0 auto", padding: "clamp(34px,6vw,48px) clamp(14px,4vw,24px) 80px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 28 },
  faqSection: { marginTop: 72, paddingTop: 54, borderTop: "1px solid rgba(183,28,28,0.16)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 40, alignItems: "start" },
  faqIntro: { maxWidth: 430 },
  faqEyebrow: { margin: "0 0 12px", color: "#b71c1c", fontSize: 12, fontWeight: 900, letterSpacing: "0.22em", textTransform: "uppercase" },
  faqTitle: { margin: 0, color: "#7f1010", fontFamily: "Georgia,'Times New Roman',serif", fontSize: "clamp(2rem,5vw,3.2rem)", lineHeight: 1.08, fontWeight: 900 },
  faqCopy: { margin: "18px 0 0", color: "#616161", fontSize: 16, lineHeight: 1.75 },
  faqList: { display: "flex", flexDirection: "column", gap: 12 },
  faqItem: { background: "rgba(255,255,255,0.86)", border: "1px solid rgba(214,155,25,0.38)", borderRadius: 14, padding: "0 clamp(14px,4vw,18px)", boxShadow: "0 12px 35px rgba(121,28,0,0.06)" },
  faqQuestion: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "18px 0", color: "#4a1515", fontSize: "clamp(0.94rem,3.7vw,1rem)", fontWeight: 800, lineHeight: 1.45, cursor: "pointer", listStyle: "none" },
  faqIcon: { display: "grid", placeItems: "center", flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "#b71c1c", color: "#fff", fontSize: 19, fontWeight: 500, lineHeight: 1 },
  faqAnswer: { margin: "0 0 19px", paddingRight: 0, color: "#616161", fontSize: 14, lineHeight: 1.75 },
  card: { background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(183,28,28,0.08)", border: "1px solid rgba(245,222,179,0.6)" },
  cardImg: { width: "100%", height: 240, objectFit: "cover", display: "block" },
  cardBadge: { position: "absolute", top: 14, left: 14, background: "#b71c1c", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 50, textTransform: "uppercase", letterSpacing: "0.06em" },
  cardPrice: { position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.96)", color: "#b71c1c", fontWeight: 900, fontSize: 18, padding: "4px 14px", borderRadius: 50, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  cardBody: { padding: "22px 22px 26px" },
  cardTitle: { fontSize: 24, fontWeight: 900, color: "#212121", margin: "0 0 8px" },
  cardDesc: { fontSize: 14, color: "#616161", lineHeight: 1.7, margin: "0 0 10px" },
  sizeHint: { fontSize: 12, fontWeight: 700, color: "#795548", background: "#fff8e1", borderRadius: 8, padding: "6px 10px", display: "inline-block", marginBottom: 16 },
  addBtn: { width: "100%", background: "#b71c1c", color: "#fff", border: "none", borderRadius: 50, padding: "13px 20px", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 20px rgba(183,28,28,0.25)" },
  disabledAddBtn: { background: "#7f1d1d", cursor: "not-allowed", opacity: 0.78, boxShadow: "none" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(5px)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 },
  popup: { background: "#fff", borderRadius: 22, width: "100%", maxWidth: 480, boxShadow: "0 30px 80px rgba(0,0,0,0.22)", maxHeight: "92vh", overflowY: "auto", display: "flex", flexDirection: "column" },
  popupHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f0e6d3", background: "#fff9f0", flexShrink: 0 },
  popupThumb: { width: 48, height: 48, borderRadius: 10, objectFit: "cover" },
  popupProductName: { fontWeight: 900, fontSize: 15, margin: 0 },
  popupProductPrice: { fontSize: 13, fontWeight: 700, color: "#b71c1c", margin: "2px 0 0" },
  steps: { display: "flex", alignItems: "center", gap: 4 },
  stepDot: { width: 24, height: 24, borderRadius: "50%", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" },
  stepLine: { width: 20, height: 2, background: "#e0e0e0", borderRadius: 2 },
  closeBtn: { width: 30, height: 30, border: "none", background: "#f5f5f5", borderRadius: "50%", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#757575", display: "flex", alignItems: "center", justifyContent: "center" },
  popupBody: { padding: "20px 22px 26px", display: "flex", flexDirection: "column", gap: 16 },
  sectionLabel: { fontSize: 10, fontWeight: 900, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9e9e9e" },
  idCardSummaryBox: { display: "flex", alignItems: "center", gap: 16, background: "#fff9f0", border: "1px solid #f5deb3", borderRadius: 14, padding: "16px 18px" },
  idCardSummaryIcon: { fontSize: 32, flexShrink: 0 },
  modalRow: { display: "flex", alignItems: "center", gap: 10 },
  sizeSelect: { flex: 1, border: "1.5px solid #f5deb3", borderRadius: 10, padding: "9px 12px", fontSize: 14, fontWeight: 700, color: "#424242", background: "#fffdf7", cursor: "pointer", outline: "none" },
  stepper: { display: "flex", alignItems: "center", gap: 2, background: "#fafafa", borderRadius: 10, border: "1.5px solid #f5deb3", padding: "2px 4px" },
  stepBtn: { width: 32, height: 32, border: "none", background: "transparent", color: "#b71c1c", fontWeight: 900, fontSize: 18, cursor: "pointer", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" },
  stepNum: { width: 28, textAlign: "center", fontWeight: 800, fontSize: 15 },
  rowAmt: { fontSize: 14, fontWeight: 800, color: "#b71c1c", minWidth: 64, textAlign: "right" },
  removeRowBtn: { border: "none", background: "transparent", color: "#bdbdbd", cursor: "pointer", fontSize: 14, fontWeight: 700, padding: 4 },
  addSizeBtn: { border: "none", background: "none", color: "#b71c1c", fontWeight: 700, fontSize: 14, cursor: "pointer", textDecoration: "underline", padding: 0, alignSelf: "flex-start" },
  summaryBar: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff9f0", borderRadius: 14, padding: "14px 18px", border: "1px solid #f5deb3", marginTop: 4 },
  orderSummary: { background: "#fff9f0", borderRadius: 12, padding: "14px 16px", border: "1px solid #f5deb3", display: "flex", flexDirection: "column", gap: 6 },
  summaryLine: { display: "flex", justifyContent: "space-between", fontSize: 14 },
  fieldPrefix: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontWeight: 800, fontSize: 14, color: "#616161", pointerEvents: "none" },
  fieldCheck: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#22c55e", fontWeight: 900, fontSize: 16 },
  fieldError: { fontSize: 12, color: "#ef4444", fontWeight: 600 },
  fieldHint: { fontSize: 12, color: "#9e9e9e", fontWeight: 600 },
  inlineError: { padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700, background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" },
  input: { width: "100%", border: "1.5px solid #f5deb3", borderRadius: 10, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "inherit", color: "#212121" },
  idCardPanel: { display: "flex", flexDirection: "column", gap: 14, marginTop: 4, padding: "16px", border: "1px solid #f5c77a", borderRadius: 14, background: "#fffaf1" },
  idCardTitle: { margin: 0, color: "#7f1010", fontSize: 15, fontWeight: 900 },
  idPhotoLabel: { margin: "0 0 4px", color: "#424242", fontSize: 14, fontWeight: 800 },
  idPhotoHelp: { margin: "0 0 12px", color: "#757575", fontSize: 12, lineHeight: 1.5 },
  idPhotoLayout: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 },
  passportFrame: { position: "relative", width: 112, aspectRatio: "35 / 45", flexShrink: 0, overflow: "hidden", border: "2px solid #b71c1c", borderRadius: 10, background: "#f3eee6", boxShadow: "0 6px 18px rgba(121,28,0,0.12)" },
  passportPreview: { display: "block", width: "100%", height: "100%", objectFit: "cover" },
  passportPlaceholder: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg,#fff,#eee5da)", overflow: "hidden" },
  passportHead: { width: 38, height: 38, borderRadius: "50%", background: "#d1b9a6", marginBottom: 8 },
  passportBody: { width: 78, height: 52, borderRadius: "50% 50% 0 0", background: "#d1b9a6", transform: "translateY(12px)" },
  idPhotoActions: { display: "flex", flex: "1 1 190px", flexDirection: "column", gap: 9 },
  hiddenFileInput: { position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" },
  photoActionBtn: { width: "100%", border: "none", borderRadius: 50, padding: "11px 14px", background: "#b71c1c", color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer" },
  photoSecondaryBtn: { width: "100%", border: "1.5px solid #b71c1c", borderRadius: 50, padding: "10px 14px", background: "#fff", color: "#8b1111", fontSize: 13, fontWeight: 800, cursor: "pointer" },
  optimizedPhotoNote: { margin: "10px 0 0", color: "#166534", fontSize: 12, fontWeight: 800 },
  primaryBtn: { background: "#b71c1c", color: "#fff", border: "none", borderRadius: 50, padding: "13px 22px", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 20px rgba(183,28,28,0.25)" },
  backBtn: { background: "#f5f5f5", color: "#424242", border: "none", borderRadius: 50, padding: "13px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  processingOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center" },
  processingCard: { background: "#fff", borderRadius: 20, padding: "40px 36px", textAlign: "center", maxWidth: 320, width: "90%", boxShadow: "0 30px 80px rgba(0,0,0,0.3)" },
  spinnerWrap: { display: "flex", justifyContent: "center", marginBottom: 20 },
  spinner: { width: 52, height: 52, animation: "spin 0.9s linear infinite" },
  processingTitle: { margin: "0 0 8px", fontWeight: 900, fontSize: 18, color: "#212121" },
  processingMsg: { margin: "0 0 10px", fontSize: 14, color: "#616161", lineHeight: 1.6 },
  processingHint: { margin: 0, fontSize: 12, fontWeight: 700, color: "#b71c1c", textTransform: "uppercase", letterSpacing: "0.05em" },
  successHeader: { background: "linear-gradient(135deg,#052e16,#14532d)", padding: "32px 24px 28px", textAlign: "center", borderRadius: "22px 22px 0 0" },
  successIcon: { width: 64, height: 64, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px" },
  successTitle: { margin: "0 0 8px", color: "#fff", fontSize: 22, fontWeight: 900 },
  successSub: { margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 14 },
  receiptBody: { padding: "20px 22px", display: "flex", flexDirection: "column", gap: 0 },
  receiptDivider: { display: "flex", alignItems: "center", gap: 10, margin: "8px 0 16px" },
  dashedLine: { flex: 1, height: 1, borderTop: "2px dashed #e0e0e0" },
  receiptLabel: { fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: "#bdbdbd", whiteSpace: "nowrap" },
  receiptRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #fafafa" },
  receiptRowLabel: { fontSize: 12, fontWeight: 700, color: "#9e9e9e", textTransform: "uppercase", letterSpacing: "0.05em" },
  receiptRowValue: { fontSize: 14, fontWeight: 700 },
  sizesBox: { background: "#fff9f0", border: "1px solid #f5deb3", borderRadius: 10, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 4, margin: "4px 0" },
  receiptTotal: { display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 900, padding: "14px 0 4px" },
  downloadBtn: { background: "#f0fdf4", color: "#166534", border: "1.5px solid #bbf7d0", borderRadius: 50, padding: "13px 18px", fontSize: 14, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" },
  failureHeader: { background: "linear-gradient(135deg,#450a0a,#7f1d1d)", padding: "32px 24px 28px", textAlign: "center", borderRadius: "22px 22px 0 0" },
  failureIcon: { width: 64, height: 64, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "#fff", margin: "0 auto 16px" },
  failureTitle: { margin: "0 0 8px", color: "#fff", fontSize: 22, fontWeight: 900 },
  failureSub: { margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 14 },
  failureBody: { padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 },
  failureDetail: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fef2f2", borderRadius: 10, border: "1px solid #fecaca" },
  failureDetailLabel: { fontSize: 12, fontWeight: 700, color: "#9e9e9e", textTransform: "uppercase" },
  failureDetailValue: { fontSize: 14, fontWeight: 700, color: "#991b1b" },
  failureTips: { background: "#fff7ed", borderRadius: 12, padding: "14px 16px", border: "1px solid #fed7aa" },
};

if (typeof document !== "undefined" && !document.getElementById("shop-spinner-style")) {
  const st = document.createElement("style");
  st.id = "shop-spinner-style";
  st.textContent = "@keyframes spin{to{transform:rotate(360deg)}}";
  document.head.appendChild(st);
}



//available soon down code


// import { useState, useRef } from "react";
// import { useLanguage } from "../i18n/useLanguage";
// import imagetshirt from "../assets/tshirt.jpeg";
// import imageidcard from "../assets/id.jpeg";

// // ── Constants ─────────────────────────────────────────────────────────────────
// const TSHIRT_SIZES = Array.from(
//   { length: (50 - 20) / 2 + 1 },
//   (_, i) => String(20 + i * 2)
// );

// // const BACKEND_URL = "https://api.hukmillanecharaja.in";

// const BACKEND_URL = "http://localhost:8080";


// const PRODUCT_CONFIG = [
//   {
//     id: "tshirt",
//     type: "tshirt",
//     price: 1,
//     image: imagetshirt,
//   },
//   {
//     id: "idcard",
//     type: "idcard",
//     price: 1,
//     image: imageidcard,
//   },
// ];

// const shopText = {
//   en: {
//     eyebrow: "Limited Edition 2026",
//     heroTitle: "Get Your Festival T-Shirt",
//     heroSub: "Official Hukmill Lane Cha Raja T-shirt and volunteer ID card for devotees and volunteers.",
//     buyNow: "Buy Now",
//     availableSoon: "Available Soon",
//     sizeHint: "Sizes 20 - 50 (step 2) · Same price all sizes",
//     faqEyebrow: "Shop Help",
//     faqTitle: "Frequently Asked Questions",
//     faqCopy: "Everything you need to know before ordering the official mandal T-shirt or ID card.",
//     products: {
//       tshirt: {
//         name: "Mandal T-Shirt",
//         description: "Premium cotton festival T-shirt. Price is uniform across all sizes.",
//         badge: "T-Shirt",
//       },
//       idcard: {
//         name: "Volunteer ID Card",
//         description: "Official laminated ID card for registered volunteers. Single standard size.",
//         badge: "Volunteers",
//       },
//     },
//     faqs: [
//       {
//         question: "How can I contact the Mandal for any enquiry?",
//         answer: "Please reach out to us at Abhishek Bachankar on +91-9867174946 or Omkar Patne on +91-7208224609.",
//       },
//       {
//         question: "How do I pay for my order?",
//         answer: "Choose your product, size and quantity, enter your details, and continue to Razorpay. Available options may include UPI, cards, net banking, and supported wallets.",
//       },
//       {
//         question: "Will I receive a payment receipt?",
//         answer: "Yes. After payment is successfully verified, an order confirmation and downloadable receipt are shown on the screen. Keep the receipt for your records.",
//       },
//       {
//         question: "Can I cancel my order or request a refund?",
//         answer: "No. Once an order is successfully placed and payment is confirmed, it cannot be cancelled and the amount is non-refundable. Please verify the product, size, quantity, and customer details before paying.",
//       },
//       {
//         question: "What if the transaction fails but money is debited?",
//         answer: "If the payment fails but money is debited, the amount is normally reversed automatically to the original payment method within 5 to 7 working days. The exact time depends on your bank or payment provider. Keep the payment reference until the reversal is completed.",
//       },
//       {
//         question: "How will I receive my T-shirt or ID card?",
//         answer: "The T-shirt and ID card must be collected from the mandal. Please keep your booking ID, payment receipt, and registered phone number ready during collection.",
//       },
//     ],
//   },
//   mr: {
//     eyebrow: "मर्यादित आवृत्ती २०२६",
//     heroTitle: "उत्सवासाठी अधिकृत टी-शर्ट",
//     heroSub: "भक्त आणि स्वयंसेवकांसाठी हुकमिल लेन चा राजा अधिकृत टी-शर्ट आणि स्वयंसेवक आयडी कार्ड.",
//     buyNow: "आता खरेदी करा",
//     sizeHint: "साइज 20 - 50 (2 च्या फरकाने) · सर्व साइजसाठी समान किंमत",
//     faqEyebrow: "दुकान मदत",
//     faqTitle: "वारंवार विचारले जाणारे प्रश्न",
//     faqCopy: "अधिकृत मंडळ टी-शर्ट किंवा आयडी कार्ड ऑर्डर करण्यापूर्वी आवश्यक माहिती.",
//     products: {
//       tshirt: {
//         name: "मंडळ टी-शर्ट",
//         description: "प्रीमियम कॉटन उत्सव टी-शर्ट. सर्व साइजसाठी किंमत समान आहे.",
//         badge: "टी-शर्ट",
//       },
//       idcard: {
//         name: "स्वयंसेवक आयडी कार्ड",
//         description: "नोंदणीकृत स्वयंसेवकांसाठी अधिकृत लॅमिनेटेड आयडी कार्ड. एकच स्टँडर्ड साइज.",
//         badge: "स्वयंसेवक",
//       },
//     },
//     faqs: [
//       {
//         question: "कुठल्या प्रकारच्या चौकशीसाठी मी मंडळाशी संपर्क करू शकतो?",
//         answer: "कृपया अभिषेक बाचणकर यांच्याशी +91-9867174946 वर किंवा ओमकार पाटणे यांच्याशी +91-7208224609 वर संपर्क साधा.",
//       },
//       {
//         question: "ऑर्डरचे पेमेंट कसे करायचे?",
//         answer: "प्रोडक्ट, साइज आणि प्रमाण निवडा, तुमची माहिती भरा आणि Razorpay वर पेमेंट करा. UPI, कार्ड, नेट बँकिंग आणि उपलब्ध वॉलेट पर्याय वापरता येतील.",
//       },
//       {
//         question: "मला पेमेंट पावती मिळेल का?",
//         answer: "हो. पेमेंट यशस्वीरीत्या तपासल्यानंतर स्क्रीनवर ऑर्डर कन्फर्मेशन आणि डाउनलोड करता येणारी पावती दिसेल. पावती तुमच्या नोंदीसाठी जपून ठेवा.",
//       },
//       {
//         question: "ऑर्डर रद्द किंवा रिफंड मिळू शकतो का?",
//         answer: "नाही. ऑर्डर यशस्वीरीत्या झाल्यानंतर आणि पेमेंट कन्फर्म झाल्यानंतर ती रद्द करता येणार नाही आणि रक्कम परत केली जाणार नाही. पेमेंट करण्यापूर्वी प्रोडक्ट, साइज, प्रमाण आणि माहिती तपासा.",
//       },
//       {
//         question: "व्यवहार फेल झाला पण पैसे डेबिट झाले तर?",
//         answer: "पेमेंट फेल झाले पण पैसे डेबिट झाले असल्यास रक्कम सामान्यतः मूळ पेमेंट पद्धतीवर 5 ते 7 कामकाजाच्या दिवसांत आपोआप परत येते. अचूक वेळ बँक किंवा पेमेंट प्रदात्यावर अवलंबून असतो. रक्कम परत येईपर्यंत पेमेंट रेफरन्स जपून ठेवा.",
//       },
//       {
//         question: "टी-शर्ट किंवा आयडी कार्ड कसे मिळेल?",
//         answer: "टी-शर्ट आणि आयडी कार्ड मंडळातूनच घ्यावे लागेल. घेताना तुमचा बुकिंग आयडी, पेमेंट पावती आणि नोंदणीकृत फोन नंबर सोबत ठेवा.",
//       },
//     ],
//   },
// };

// const idCardText = {
//   en: {
//     sectionTitle: "ID Card Details",
//     namePlaceholder: "Name to print on ID card *",
//     photoTitle: "Passport-size photo *",
//     photoHelp: "Use a clear, front-facing photo. It will be cropped to passport size automatically.",
//     camera: "Take Photo",
//     gallery: "Choose from Gallery",
//     processing: "Preparing photo...",
//     photoRequired: "Please add a photo for the ID card.",
//     photoInvalid: "Use a JPG, PNG, or WebP image up to 8 MB.",
//     previewAlt: "Passport-size ID card preview",
//     optimized: "Optimized photo",
//   },
//   mr: {
//     sectionTitle: "आयडी कार्ड माहिती",
//     namePlaceholder: "आयडी कार्डवर छापायचे नाव *",
//     photoTitle: "पासपोर्ट साइज फोटो *",
//     photoHelp: "समोरून काढलेला स्पष्ट फोटो वापरा. फोटो आपोआप पासपोर्ट साइजमध्ये क्रॉप केला जाईल.",
//     camera: "फोटो काढा",
//     gallery: "गॅलरीमधून निवडा",
//     processing: "फोटो तयार होत आहे...",
//     photoRequired: "आयडी कार्डसाठी फोटो जोडा.",
//     photoInvalid: "8 MB पर्यंतचा JPG, PNG किंवा WebP फोटो वापरा.",
//     previewAlt: "पासपोर्ट साइज आयडी कार्ड फोटो",
//     optimized: "ऑप्टिमाइज केलेला फोटो",
//   },
// };

// // ── Helpers ───────────────────────────────────────────────────────────────────
// const money = (n) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(n);

// function validateName(name) {
//   const trimmed = name.trim();
//   if (!trimmed) return "Full name is required.";
//   if (trimmed.length < 2) return "Name must be at least 2 characters.";
//   if (!/^[a-zA-Z\s'.'-]+$/.test(trimmed)) return "Name can only contain letters and spaces.";
//   return null;
// }

// function validatePhone(phone) {
//   const cleaned = phone.replace(/\D/g, "");
//   if (!cleaned) return "Phone number is required.";
//   if (cleaned.length !== 10) return "Enter a valid 10-digit phone number.";
//   if (!/^[6-9]/.test(cleaned)) return "Phone must start with 6, 7, 8, or 9.";
//   return null;
// }

// function validateEmail(email) {
//   if (!email.trim()) return "Email address is required.";
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email address.";
//   return null;
// }

// function validateCardName(name) {
//   const trimmed = name.trim();
//   if (!trimmed) return "Name for the ID card is required.";
//   if (trimmed.length < 2) return "ID card name must be at least 2 characters.";
//   if (!/^[\p{L}\p{M}\s'.-]+$/u.test(trimmed)) return "Use letters and spaces only for the ID card name.";
//   return null;
// }

// function buildSizeNote(rows) {
//   return rows
//     .map((r) => `Size ${r.size} x${r.quantity}`)
//     .join(", ");
// }

// const PASSPORT_PHOTO_WIDTH = 600;
// const PASSPORT_PHOTO_HEIGHT = 771;
// const TARGET_PHOTO_BYTES = 180 * 1024;
// const MIN_PHOTO_QUALITY = 0.72;

// function getDataUrlByteSize(dataUrl) {
//   const base64 = dataUrl.split(",")[1] || "";
//   const padding = (base64.match(/=*$/)?.[0].length || 0);
//   return Math.max(0, Math.ceil((base64.length * 3) / 4) - padding);
// }

// function dataUrlToFile(dataUrl, fileName) {
//   const arr = dataUrl.split(",");
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) u8arr[n] = bstr.charCodeAt(n);
//   return new File([u8arr], fileName, { type: mime });
// }

// function createPassportPhoto(file) {
//   return new Promise((resolve, reject) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
//     if (!allowedTypes.includes(file.type) || file.size > 8 * 1024 * 1024) {
//       reject(new Error("INVALID_PHOTO"));
//       return;
//     }

//     const image = new Image();
//     const objectUrl = URL.createObjectURL(file);

//     image.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = PASSPORT_PHOTO_WIDTH;
//       canvas.height = PASSPORT_PHOTO_HEIGHT;
//       const context = canvas.getContext("2d");
//       if (!context) {
//         URL.revokeObjectURL(objectUrl);
//         reject(new Error("INVALID_PHOTO"));
//         return;
//       }

//       context.imageSmoothingEnabled = true;
//       context.imageSmoothingQuality = "high";
//       const targetRatio = PASSPORT_PHOTO_WIDTH / PASSPORT_PHOTO_HEIGHT;
//       const sourceRatio = image.naturalWidth / image.naturalHeight;
//       let sourceX = 0;
//       let sourceY = 0;
//       let sourceWidth = image.naturalWidth;
//       let sourceHeight = image.naturalHeight;

//       if (sourceRatio > targetRatio) {
//         sourceWidth = sourceHeight * targetRatio;
//         sourceX = (image.naturalWidth - sourceWidth) / 2;
//       } else {
//         sourceHeight = sourceWidth / targetRatio;
//         sourceY = (image.naturalHeight - sourceHeight) / 2;
//       }

//       context.fillStyle = "#ffffff";
//       context.fillRect(0, 0, canvas.width, canvas.height);
//       context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);

//       URL.revokeObjectURL(objectUrl);
//       let quality = 0.9;
//       let photoBase64 = canvas.toDataURL("image/jpeg", quality);
//       let photoByteSize = getDataUrlByteSize(photoBase64);

//       while (photoByteSize > TARGET_PHOTO_BYTES && quality > MIN_PHOTO_QUALITY) {
//         quality = Math.max(MIN_PHOTO_QUALITY, quality - 0.04);
//         photoBase64 = canvas.toDataURL("image/jpeg", quality);
//         photoByteSize = getDataUrlByteSize(photoBase64);
//       }

//       resolve({
//         photoBase64,
//         photoFileName: `${file.name.replace(/\.[^.]+$/, "") || "id-photo"}.jpg`,
//         photoMimeType: "image/jpeg",
//         photoWidth: PASSPORT_PHOTO_WIDTH,
//         photoHeight: PASSPORT_PHOTO_HEIGHT,
//         photoByteSize,
//         compressionQuality: Number(quality.toFixed(2)),
//       });
//     };

//     image.onerror = () => {
//       URL.revokeObjectURL(objectUrl);
//       reject(new Error("INVALID_PHOTO"));
//     };

//     image.src = objectUrl;
//   });
// }

// let razorpaySdkPromise;

// function loadRazorpaySdk() {
//   if (window.Razorpay) return Promise.resolve();
//   if (razorpaySdkPromise) return razorpaySdkPromise;

//   razorpaySdkPromise = new Promise((resolve, reject) => {
//     const existingScript = document.getElementById("razorpay-checkout-sdk");
//     if (existingScript) {
//       existingScript.addEventListener("load", resolve, { once: true });
//       existingScript.addEventListener("error", () => reject(new Error("Razorpay SDK failed to load.")), { once: true });
//       return;
//     }
//     const script = document.createElement("script");
//     script.id = "razorpay-checkout-sdk";
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.onload = resolve;
//     script.onerror = () => {
//       razorpaySdkPromise = null;
//       reject(new Error("Razorpay SDK failed to load."));
//     };
//     document.head.appendChild(script);
//   });

//   return razorpaySdkPromise;
// }

// async function openRazorpay(options) {
//   await loadRazorpaySdk();
//   return new Promise((resolve, reject) => {
//     if (!window.Razorpay) {
//       reject(new Error("Razorpay SDK not loaded."));
//       return;
//     }
//     const rzp = new window.Razorpay({ ...options, handler: resolve });
//     rzp.on("payment.failed", (resp) => reject(resp.error));
//     rzp.open();
//   });
// }

// // ── Segregated API calls ──────────────────────────────────────────────────────

// /**
//  * T-Shirt: POST /tshirt/createOrder  — plain JSON body
//  */
// async function createTshirtOrder(payload) {
//   console.log("This is my payload ",payload);
//   const res = await fetch(`${BACKEND_URL}/tshirt/createOrder`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// /**
//  * T-Shirt: POST /tshirt/paymentCallback  — query params
//  */
// async function tshirtPaymentCallback(params) {
//   const query = new URLSearchParams(params).toString();
//   const res = await fetch(`${BACKEND_URL}/tshirt/paymentCallback?${query}`, {
//     method: "POST",
//   });
//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// /**
//  * ID Card: POST /id-card/createOrder  — multipart/form-data
//  *   - Part "orders": JSON blob (application/json)
//  *   - Part "multipartFile": the passport photo file
//  */
// async function createIdCardOrder(payload, photoFile) {
//   console.log("This ID CARD INPUT CONTENT ",payload);
//   console.log("This ID CARD INPUT Photo ",photoFile);

//   const formData = new FormData();

//   // Spring @RequestBody expects the JSON part as a blob with application/json
//   const jsonBlob = new Blob([JSON.stringify(payload)], { type: "application/json" });
//   formData.append("orders", jsonBlob);
//   formData.append("multipartFile", photoFile);

//   const res = await fetch(`${BACKEND_URL}/id-card/createOrder`, {
//     method: "POST",
//     body: formData,
//     // Do NOT set Content-Type header — browser sets it with boundary automatically
//   });
//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// /**
//  * ID Card: POST /id-card/paymentCallback  — query params
//  */
// async function idCardPaymentCallback(params) {
//   const query = new URLSearchParams(params).toString();
//   const res = await fetch(`${BACKEND_URL}/id-card/paymentCallback?${query}`, {
//     method: "POST",
//   });
//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// // ── Processing Overlay ────────────────────────────────────────────────────────
// function ProcessingOverlay({ message }) {
//   return (
//     <div style={s.processingOverlay}>
//       <div style={s.processingCard}>
//         <div style={s.spinnerWrap}>
//           <svg style={s.spinner} viewBox="0 0 50 50">
//             <circle
//               cx="25" cy="25" r="20"
//               fill="none"
//               stroke="#b71c1c"
//               strokeWidth="4"
//               strokeDasharray="100 28"
//               strokeLinecap="round"
//             />
//           </svg>
//         </div>
//         <p style={s.processingTitle}>Processing…</p>
//         <p style={s.processingMsg}>{message}</p>
//         <p style={s.processingHint}>Please don't close this window</p>
//       </div>
//     </div>
//   );
// }

// // ── Reusable validated field ──────────────────────────────────────────────────
// function ValidatedInput({ type = "text", placeholder, value, onChange, error, valid, hint, prefix, maxLength, required }) {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
//       <div style={{ position: "relative" }}>
//         {prefix && <span style={s.fieldPrefix}>{prefix}</span>}
//         <input
//           type={type}
//           placeholder={placeholder}
//           value={value}
//           required={required}
//           onChange={onChange}
//           maxLength={maxLength}
//           style={{
//             ...s.input,
//             paddingLeft: prefix ? 44 : 14,
//             paddingRight: valid ? 36 : 14,
//             borderColor: error ? "#ef4444" : valid ? "#22c55e" : "#f5deb3",
//           }}
//         />
//         {valid && !error && <span style={s.fieldCheck}>✓</span>}
//       </div>
//       {error && <span style={s.fieldError}>{error}</span>}
//       {!error && hint && <span style={s.fieldHint}>{hint}</span>}
//     </div>
//   );
// }

// // ── Main ──────────────────────────────────────────────────────────────────────
// export default function Shop() {
//   const { language } = useLanguage();
//   const copy = shopText[language] || shopText.en;
//   // # SHOP SALE PAUSED: this label powers the temporary "Available Soon" product buttons.
//   const productActionLabel = language === "mr" ? "लवकरच उपलब्ध" : copy.availableSoon;
//   const products = PRODUCT_CONFIG.map((product) => ({
//     ...product,
//     ...copy.products[product.id],
//   }));

//   const [activeProduct, setActiveProduct] = useState(null);
//   const [receiptData, setReceiptData] = useState(null);
//   const [failureData, setFailureData] = useState(null);

//   return (
//     <div style={s.page}>
//       <section style={s.hero}>
//         <div style={s.heroContent}>
//           <p style={s.eyebrow}>{copy.eyebrow}</p>
//           <h1 style={s.heroTitle}>{copy.heroTitle}</h1>
//           <p style={s.heroSub}>{copy.heroSub}</p>
//         </div>
//         <div style={s.heroDeco} />
//       </section>

//       <main style={s.main}>
//         <div style={s.grid}>
//           {products.map((p) => (
//             <ProductCard key={p.id} product={p} copy={copy} actionLabel={productActionLabel}   onAdd={() => setActiveProduct(p)}/>
//           ))}
//         </div>
//         <ShopFaq copy={copy} />
//       </main>

//       {activeProduct && (
//         <OrderPopup
//           product={activeProduct}
//           idCopy={idCardText[language] || idCardText.en}
//           onClose={() => setActiveProduct(null)}
//           onSuccess={(data) => { setActiveProduct(null); setReceiptData(data); }}
//           onFailure={(err) => { setActiveProduct(null); setFailureData(err); }}
//         />
//       )}

//       {receiptData && <ReceiptPopup data={receiptData} onClose={() => setReceiptData(null)} />}
//       {failureData && <FailurePopup error={failureData} onClose={() => setFailureData(null)} onRetry={() => setFailureData(null)} />}
//     </div>
//   );
// }

// function ShopFaq({ copy }) {
//   return (
//     <section style={s.faqSection} aria-labelledby="shop-faq-title">
//       <div style={s.faqIntro}>
//         <p style={s.faqEyebrow}>{copy.faqEyebrow}</p>
//         <h2 id="shop-faq-title" style={s.faqTitle}>{copy.faqTitle}</h2>
//         <p style={s.faqCopy}>{copy.faqCopy}</p>
//       </div>
//       <div style={s.faqList}>
//         {copy.faqs.map((item, index) => (
//           <details key={item.question} style={s.faqItem} open={index === 0}>
//             <summary style={s.faqQuestion}>
//               <span>{item.question}</span>
//               <span aria-hidden="true" style={s.faqIcon}>+</span>
//             </summary>
//             <p style={s.faqAnswer}>{item.answer}</p>
//           </details>
//         ))}
//       </div>
//     </section>
//   );
// }

// // ── Product Card ──────────────────────────────────────────────────────────────
// // eslint-disable-next-line no-unused-vars
// function ProductCard({ product, copy, actionLabel, onAdd }) {
//   return (
//     <article style={s.card}>
//       <div style={{ position: "relative", overflow: "hidden" }}>
//         <img src={product.image} alt={product.name} style={s.cardImg} />
//         <span style={s.cardBadge}>{product.badge}</span>
//         <span style={s.cardPrice}>{money(product.price)}</span>
//       </div>
//       <div style={s.cardBody}>
//         <h2 style={s.cardTitle}>{product.name}</h2>
//         <p style={s.cardDesc}>{product.description}</p>
//         {product.type === "tshirt" && (
//           <p style={s.sizeHint}>{copy.sizeHint}</p>
//         )}
//         {/* # AVAILABLE SOON ACTIVE: current public button. It does not open checkout. */}
//         <button type="button" disabled style={{ ...s.addBtn, ...s.disabledAddBtn }}>
//           {copy.availableSoon}
//         </button>

//         {/* # BUY NOW BACKUP: uncomment this button and comment Available Soon above to restart sales. */}
//         {/*
//         <button type="button" onClick={onAdd} style={s.addBtn}>
//           {copy.buyNow}
//         </button>
//         */}
//       </div>
//     </article>
//   );
// }

// // ── Order Popup ───────────────────────────────────────────────────────────────
// function OrderPopup({ product, idCopy, onClose, onSuccess, onFailure }) {
//   const isTshirt = product.type === "tshirt";
//   const isIdCard = product.type === "idcard";

//   // T-shirt state — sizes + quantities
//   const [rows, setRows] = useState([{ size: TSHIRT_SIZES[0], quantity: 1 }]);

//   const [step, setStep] = useState(1);
//   const [customer, setCustomer] = useState({ name: "", phoneNumber: "", email: "" });
//   const [touched, setTouched] = useState({ name: false, phoneNumber: false, email: false });

//   // ID Card specific state
//   const [idCard, setIdCard] = useState({ cardholderName: "", photo: null, rawFile: null });
//   const [idCardTouched, setIdCardTouched] = useState(false);
//   const [photoError, setPhotoError] = useState(null);
//   const [photoProcessing, setPhotoProcessing] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [verifying, setVerifying] = useState(false);
//   const [verifyMsg, setVerifyMsg] = useState("Verifying your payment…");
//   const [bridging, setBridging] = useState(false);
//   const [inlineError, setInlineError] = useState(null);

//   const cameraInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   // ID Card: quantity is always 1
//   const totalQty = isIdCard ? 1 : rows.reduce((acc, r) => acc + r.quantity, 0);
//   const totalAmt = totalQty * product.price;

//   const nameError  = validateName(customer.name);
//   const phoneError = validatePhone(customer.phoneNumber);
//   const emailError = validateEmail(customer.email);
//   const cardNameError = isIdCard ? validateCardName(idCard.cardholderName) : null;

//   const nameValid  = !nameError  && customer.name.trim().length > 0;
//   const phoneValid = !phoneError && customer.phoneNumber.length === 10;
//   const emailValid = !emailError && customer.email.trim().length > 0;

//   const phoneHint = !phoneError && customer.phoneNumber.length > 0 && customer.phoneNumber.length < 10
//     ? `${10 - customer.phoneNumber.length} more digits needed`
//     : null;

//   function touch(field) { setTouched((t) => ({ ...t, [field]: true })); }

//   function updateRow(i, field, value) {
//     setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
//   }
//   function addRow() { setRows((prev) => [...prev, { size: TSHIRT_SIZES[0], quantity: 1 }]); }
//   function removeRow(i) { setRows((prev) => prev.filter((_, idx) => idx !== i)); }

//   function goToStep2() {
//     if (isTshirt && totalQty === 0) return;
//     if (isTshirt) {
//       const merged = {};
//       rows.forEach(({ size, quantity }) => { merged[size] = (merged[size] || 0) + quantity; });
//       setRows(Object.entries(merged).map(([size, quantity]) => ({ size, quantity })));
//     }
//     setStep(2);
//   }

//   function handlePhoneChange(val) {
//     const digits = val.replace(/\D/g, "").slice(0, 10);
//     setCustomer((c) => ({ ...c, phoneNumber: digits }));
//   }

//   async function handleIdPhoto(event) {
//     const input = event.currentTarget;
//     const file = input.files?.[0];
//     if (!file) return;

//     setPhotoProcessing(true);
//     setPhotoError(null);
//     try {
//       const processedPhoto = await createPassportPhoto(file);
//       // Convert the base64 back to a File so we can send it via FormData
//       const photoFile = dataUrlToFile(processedPhoto.photoBase64, processedPhoto.photoFileName);
//       setIdCard((current) => ({ ...current, photo: processedPhoto, rawFile: photoFile }));
//     } catch {
//       setIdCard((current) => ({ ...current, photo: null, rawFile: null }));
//       setPhotoError(idCopy.photoInvalid);
//     } finally {
//       setPhotoProcessing(false);
//       input.value = "";
//     }
//   }

//   function bridgeToFailure(errorObj, ms = 1500) {
//     setBridging(true);
//     setTimeout(() => {
//       setBridging(false);
//       onFailure(errorObj);
//     }, ms);
//   }

//   async function handlePay(e) {
//     e.preventDefault();
//     setTouched({ name: true, phoneNumber: true, email: true });
//     setIdCardTouched(true);

//     if (nameError || phoneError || emailError) return;
//     if (isIdCard && (cardNameError || !idCard.photo)) {
//       if (!idCard.photo && !photoError) setPhotoError(idCopy.photoRequired);
//       return;
//     }

//     try {
//       setLoading(true);
//       setInlineError(null);

//       let order;

//       if (isTshirt) {
//         // ── T-Shirt: JSON body to /tshirt/createOrder ─────────────────────
//         const payload = {
//           name: customer.name.trim(),
//           email: customer.email.trim(),
//           phoneNumber: customer.phoneNumber,
//           amount: totalAmt,
//           sizeQuantities: rows.map((r) => ({ size: r.size, quantity: r.quantity })),
//           totalQuantity: totalQty,
//         };
//         order = await createTshirtOrder(payload);
//       } else {
//         // ── ID Card: multipart/form-data to /id-card/createOrder ──────────
//         const payload = {
//           name: customer.name.trim(),
//           email: customer.email.trim(),
//           phoneNumber: customer.phoneNumber,
//           amount: totalAmt,
//           totalQuantity: 1,
//           idCardHolderName: idCard.cardholderName.trim(),
//         };
//         order = await createIdCardOrder(payload, idCard.rawFile);
//       }

//       // ── Open Razorpay ─────────────────────────────────────────────────────
//       let payment;
//       try {
//         payment = await openRazorpay({
//           key: order.razorpayKeyId || "rzp_live_T1Zc1AiFDYhjxe",
//           amount: order.amount * 100,
//           currency: "INR",
//           name: "HukmillLane Cha Raja",
//           description: `Order – ${product.name}`,
//           order_id: order.razorpayOrderId,
//           prefill: {
//             name: customer.name.trim(),
//             email: customer.email.trim(),
//             contact: customer.phoneNumber,
//           },
//           notes: {
//             name: customer.name.trim(),
//             product: product.name,
//             ...(isTshirt && { sizes_and_quantities: buildSizeNote(rows), total_pieces: String(totalQty) }),
//             ...(isIdCard && { id_card_name: idCard.cardholderName.trim() }),
//             customer_phone: customer.phoneNumber,
//           },
//           theme: { color: "#b71c1c" },
//         });
//       } catch (rzpErr) {
//         setLoading(false);
//         const callbackFn = isTshirt ? tshirtPaymentCallback : idCardPaymentCallback;
//         if (rzpErr?.metadata) {
//           callbackFn({
//             razorpay_order_id: rzpErr.metadata.order_id || order.razorpayOrderId,
//             razorpay_payment_id: rzpErr.metadata.payment_id || "",
//             razorpay_signature: "",
//           }).catch(() => {});
//         }
//         bridgeToFailure({
//           code: rzpErr?.code || "PAYMENT_CANCELLED",
//           description: rzpErr?.description || "Payment was cancelled or not completed. Please try again.",
//           orderId: order.razorpayOrderId,
//         });
//         return;
//       }

//       // ── Verify payment with the correct backend endpoint ──────────────────
//       setLoading(false);
//       setVerifying(true);
//       setVerifyMsg("Verifying your payment…");

//       const slowTimer = setTimeout(() => {
//         setVerifyMsg("Still confirming with our server… almost there.");
//       }, 5000);

//       const callbackFn = isTshirt ? tshirtPaymentCallback : idCardPaymentCallback;

//       let verified;
//       try {
//         verified = await Promise.race([
//           callbackFn({
//             razorpay_order_id: payment.razorpay_order_id,
//             razorpay_payment_id: payment.razorpay_payment_id,
//             razorpay_signature: payment.razorpay_signature,
//           }),
//           new Promise((_, reject) =>
//             setTimeout(() => reject(new Error("TIMEOUT")), 30000)
//           ),
//         ]);
//       } catch (verifyErr) {
//         clearTimeout(slowTimer);
//         setVerifying(false);
//         onFailure(
//           verifyErr.message === "TIMEOUT"
//             ? {
//                 code: "VERIFY_TIMEOUT",
//                 description: "Your payment was received but confirmation is taking too long. Please contact support with your payment ID.",
//                 orderId: order.razorpayOrderId,
//                 paymentId: payment.razorpay_payment_id,
//               }
//             : {
//                 code: "VERIFY_FAILED",
//                 description: verifyErr.message || "Payment verification failed. Contact support.",
//                 orderId: order.razorpayOrderId,
//                 paymentId: payment.razorpay_payment_id,
//               }
//         );
//         return;
//       }

//       clearTimeout(slowTimer);
//       setVerifying(false);

//       if (verified?.orderStatus === "PAYMENT_SUCCESS") {
//         onSuccess({
//           ...verified,
//           customerName: customer.name.trim(),
//           productName: product.name,
//           ...(isTshirt && { sizeQuantities: rows }),
//         });
//       } else {
//         onFailure({
//           description: "Payment verification failed. Contact support.",
//           orderId: order.razorpayOrderId,
//           paymentId: payment.razorpay_payment_id,
//         });
//       }
//     } catch (err) {
//       setVerifying(false);
//       setInlineError(err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (verifying) return <ProcessingOverlay message={verifyMsg} />;
//   if (bridging)  return <ProcessingOverlay message="Checking payment status…" />;

//   return (
//     <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <div style={s.popup}>
//         {/* Header */}
//         <div style={s.popupHeader}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <img src={product.image} alt="" style={s.popupThumb} />
//             <div>
//               <p style={s.popupProductName}>{product.name}</p>
//               <p style={s.popupProductPrice}>{money(product.price)} per piece</p>
//             </div>
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             {/* Only show step indicator for T-shirt (ID card is always step 1 → 2) */}
//             <div style={s.steps}>
//               <span style={{ ...s.stepDot, background: "#b71c1c", color: "#fff" }}>1</span>
//               <div style={s.stepLine} />
//               <span style={{ ...s.stepDot, background: step === 2 ? "#b71c1c" : "#e0e0e0", color: step === 2 ? "#fff" : "#9e9e9e" }}>2</span>
//             </div>
//             <button onClick={onClose} style={s.closeBtn}>✕</button>
//           </div>
//         </div>

//         {/* ── Step 1 ─────────────────────────────────────────────────────── */}
//         {step === 1 && (
//           <div style={s.popupBody}>
//             {isTshirt ? (
//               <>
//                 <p style={s.sectionLabel}>Select Sizes &amp; Quantities</p>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                   {rows.map((row, i) => (
//                     <div key={i} style={s.modalRow}>
//                       <select
//                         value={row.size}
//                         onChange={(e) => updateRow(i, "size", e.target.value)}
//                         style={s.sizeSelect}
//                       >
//                         {TSHIRT_SIZES.map((sz) => (
//                           <option key={sz} value={sz}>Size {sz}</option>
//                         ))}
//                       </select>
//                       <div style={s.stepper}>
//                         <button type="button" style={s.stepBtn} onClick={() => updateRow(i, "quantity", Math.max(1, row.quantity - 1))}>−</button>
//                         <span style={s.stepNum}>{row.quantity}</span>
//                         <button type="button" style={s.stepBtn} onClick={() => updateRow(i, "quantity", row.quantity + 1)}>+</button>
//                       </div>
//                       <span style={s.rowAmt}>{money(row.quantity * product.price)}</span>
//                       {rows.length > 1 && (
//                         <button type="button" style={s.removeRowBtn} onClick={() => removeRow(i)}>✕</button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 <button type="button" onClick={addRow} style={s.addSizeBtn}>+ Add another size</button>
//               </>
//             ) : (
//               /* ID Card — no size/quantity selection needed */
//               <div style={s.idCardSummaryBox}>
//                 <span style={s.idCardSummaryIcon}>🪪</span>
//                 <div>
//                   <p style={{ margin: "0 0 4px", fontWeight: 900, fontSize: 15, color: "#424242" }}>Volunteer ID Card</p>
//                   <p style={{ margin: 0, fontSize: 13, color: "#757575", lineHeight: 1.5 }}>
//                     1 laminated ID card · Standard size
//                   </p>
//                 </div>
//               </div>
//             )}

//             <div style={s.summaryBar}>
//               <div>
//                 <span style={{ fontSize: 12, color: "#9e9e9e", fontWeight: 700 }}>TOTAL</span>
//                 <div style={{ fontSize: 22, fontWeight: 900, color: "#b71c1c" }}>{money(totalAmt)}</div>
//                 <span style={{ fontSize: 12, color: "#757575" }}>{totalQty} {totalQty === 1 ? "piece" : "pieces"}</span>
//               </div>
//               <button
//                 type="button"
//                 disabled={isTshirt && totalQty === 0}
//                 onClick={goToStep2}
//                 style={{ ...s.primaryBtn, opacity: (isTshirt && totalQty === 0) ? 0.5 : 1 }}
//               >
//                 Continue →
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ── Step 2 ─────────────────────────────────────────────────────── */}
//         {step === 2 && (
//           <div style={s.popupBody}>
//             {/* Order Summary */}
//             <div style={s.orderSummary}>
//               <p style={s.sectionLabel}>Your Order</p>
//               {isTshirt ? (
//                 rows.map((r) => (
//                   <div key={r.size} style={s.summaryLine}>
//                     <span style={{ fontWeight: 700, color: "#424242" }}>Size {r.size} × {r.quantity}</span>
//                     <span style={{ fontWeight: 800, color: "#b71c1c" }}>{money(r.quantity * product.price)}</span>
//                   </div>
//                 ))
//               ) : (
//                 <div style={s.summaryLine}>
//                   <span style={{ fontWeight: 700, color: "#424242" }}>ID Card × 1</span>
//                   <span style={{ fontWeight: 800, color: "#b71c1c" }}>{money(product.price)}</span>
//                 </div>
//               )}
//               <div style={{ ...s.summaryLine, borderTop: "1px solid #f5deb3", paddingTop: 8, marginTop: 4 }}>
//                 <span style={{ fontWeight: 900, fontSize: 16 }}>Total</span>
//                 <span style={{ fontWeight: 900, fontSize: 16, color: "#b71c1c" }}>{money(totalAmt)}</span>
//               </div>
//             </div>

//             <form onSubmit={handlePay} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               <p style={s.sectionLabel}>Your Details</p>

//               <ValidatedInput
//                 type="text" placeholder="Full Name *" value={customer.name} required
//                 onChange={(e) => { setCustomer({ ...customer, name: e.target.value }); touch("name"); }}
//                 error={touched.name ? nameError : null} valid={nameValid}
//               />
//               <ValidatedInput
//                 type="tel" placeholder="10-digit phone number *" value={customer.phoneNumber}
//                 required prefix="+91" maxLength={10}
//                 onChange={(e) => { handlePhoneChange(e.target.value); touch("phoneNumber"); }}
//                 error={touched.phoneNumber ? phoneError : null} valid={phoneValid} hint={phoneHint}
//               />
//               <ValidatedInput
//                 type="email" placeholder="Email Address *" value={customer.email} required
//                 onChange={(e) => { setCustomer({ ...customer, email: e.target.value }); touch("email"); }}
//                 error={touched.email ? emailError : null} valid={emailValid}
//               />

//               {/* ID Card extra fields */}
//               {isIdCard && (
//                 <section style={s.idCardPanel} aria-labelledby="id-card-details-title">
//                   <p id="id-card-details-title" style={s.idCardTitle}>{idCopy.sectionTitle}</p>

//                   <ValidatedInput
//                     type="text"
//                     placeholder={idCopy.namePlaceholder}
//                     value={idCard.cardholderName}
//                     required
//                     maxLength={60}
//                     onChange={(event) => {
//                       setIdCard((current) => ({ ...current, cardholderName: event.target.value }));
//                       setIdCardTouched(true);
//                     }}
//                     error={idCardTouched ? cardNameError : null}
//                     valid={!cardNameError && idCard.cardholderName.trim().length > 0}
//                   />

//                   <div>
//                     <p style={s.idPhotoLabel}>{idCopy.photoTitle}</p>
//                     <p style={s.idPhotoHelp}>{idCopy.photoHelp}</p>

//                     <div style={s.idPhotoLayout}>
//                       <div style={s.passportFrame}>
//                         {idCard.photo ? (
//                           <img
//                             src={idCard.photo.photoBase64}
//                             alt={idCopy.previewAlt}
//                             style={s.passportPreview}
//                           />
//                         ) : (
//                           <div style={s.passportPlaceholder} aria-hidden="true">
//                             <span style={s.passportHead} />
//                             <span style={s.passportBody} />
//                           </div>
//                         )}
//                       </div>

//                       <div style={s.idPhotoActions}>
//                         <input
//                           ref={cameraInputRef}
//                           type="file"
//                           accept="image/jpeg,image/png,image/webp"
//                           capture="user"
//                           onChange={handleIdPhoto}
//                           style={s.hiddenFileInput}
//                         />
//                         <input
//                           ref={galleryInputRef}
//                           type="file"
//                           accept="image/jpeg,image/png,image/webp"
//                           onChange={handleIdPhoto}
//                           style={s.hiddenFileInput}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => cameraInputRef.current?.click()}
//                           disabled={photoProcessing}
//                           style={s.photoActionBtn}
//                         >
//                           {photoProcessing ? idCopy.processing : idCopy.camera}
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => galleryInputRef.current?.click()}
//                           disabled={photoProcessing}
//                           style={s.photoSecondaryBtn}
//                         >
//                           {idCopy.gallery}
//                         </button>
//                       </div>
//                     </div>

//                     {idCard.photo && (
//                       <p style={s.optimizedPhotoNote}>
//                         {idCopy.optimized}: {Math.max(1, Math.round(idCard.photo.photoByteSize / 1024))} KB · {idCard.photo.photoWidth} × {idCard.photo.photoHeight}
//                       </p>
//                     )}
//                     {photoError && <p style={s.fieldError}>{photoError}</p>}
//                   </div>
//                 </section>
//               )}

//               {inlineError && <div style={s.inlineError}>{inlineError}</div>}

//               <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
//                 <button type="button" onClick={() => { setStep(1); setInlineError(null); }} style={s.backBtn}>← Back</button>
//                 <button
//                   type="submit"
//                   disabled={loading || photoProcessing}
//                   style={{ ...s.primaryBtn, flex: 1, opacity: loading || photoProcessing ? 0.7 : 1 }}
//                 >
//                   {loading ? "Processing…" : `Pay ${money(totalAmt)}`}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ── Receipt / Success Popup ───────────────────────────────────────────────────
// function ReceiptPopup({ data, onClose }) {
//   const receiptRef = useRef(null);

//   const orderedAt = data.updatedAt
//     ? new Date(data.updatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
//     : new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

//   const pricePerPiece = data.totalQuantity > 0 ? data.amount / data.totalQuantity : 0;

//   function handleDownload() {
//     const sizeRows = data.sizeQuantities?.length > 0
//       ? `<div class="sizes">${data.sizeQuantities.map(sq => `<p>Size ${sq.size} × ${sq.quantity}</p>`).join("")}</div>`
//       : "";

//     const receiptHtml = `<!DOCTYPE html>
// <html><head><meta charset="UTF-8"/><title>Receipt – ${data.razorpayOrderId || "Order"}</title>
// <style>
//   body{font-family:'Segoe UI',sans-serif;max-width:480px;margin:40px auto;color:#212121}
//   .header{text-align:center;border-bottom:2px solid #b71c1c;padding-bottom:16px;margin-bottom:24px}
//   .header h1{color:#b71c1c;font-size:22px;margin:0 0 4px}.header p{color:#757575;font-size:13px;margin:0}
//   .badge{display:inline-block;background:#dcfce7;color:#166534;padding:4px 14px;border-radius:20px;font-size:13px;font-weight:700;margin-bottom:16px}
//   .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:14px}
//   .row .label{color:#9e9e9e;font-weight:600}.row .value{font-weight:700;color:#212121}
//   .total-row{display:flex;justify-content:space-between;padding:12px 0;font-size:18px;font-weight:900;color:#b71c1c;border-top:2px solid #b71c1c;margin-top:8px}
//   .sizes{background:#fff9f0;border-radius:8px;padding:12px 14px;margin:12px 0}.sizes p{margin:4px 0;font-size:13px;font-weight:600}
//   .footer{text-align:center;margin-top:32px;font-size:12px;color:#bdbdbd}
// </style></head><body>
//   <div class="header"><h1>🎉 HukmillLane Cha Raja</h1><p>Official Payment Receipt</p></div>
//   <div style="text-align:center"><span class="badge">✅ Payment Successful</span></div>
//   <div class="row"><span class="label">Booking ID</span><span class="value">${data.bookingId || "—"}</span></div>
//   <div class="row"><span class="label">Customer</span><span class="value">${data.customerName || data.Name || "—"}</span></div>
//   <div class="row"><span class="label">Phone</span><span class="value">${data.phoneNumber || "—"}</span></div>
//   ${data.email ? `<div class="row"><span class="label">Email</span><span class="value">${data.email}</span></div>` : ""}
//   <div class="row"><span class="label">Order ID</span><span class="value" style="font-family:monospace;font-size:12px">${data.razorpayOrderId || "—"}</span></div>
//   <div class="row"><span class="label">Payment ID</span><span class="value" style="font-family:monospace;font-size:12px">${data.razorpayPaymentId || "—"}</span></div>
//   <div class="row"><span class="label">Status</span><span class="value" style="color:#166534">CONFIRMED</span></div>
//   <div class="row"><span class="label">Total Quantity</span><span class="value">${data.totalQuantity}</span></div>
//   <div class="row"><span class="label">Date & Time</span><span class="value">${orderedAt}</span></div>
//   <div class="row"><span class="label">Product</span><span class="value">${data.productName || "Festival Item"}</span></div>
//   ${sizeRows}
//   <div class="total-row"><span>Total Paid</span><span>₹${data.amount || "—"}</span></div>
//   <div class="footer">Thank you for your order! Keep this receipt for your records.</div>
// </body></html>`;

//     const win = window.open("", "_blank");
//     win.document.write(receiptHtml);
//     win.document.close();
//     win.focus();
//     setTimeout(() => win.print(), 500);
//   }

//   return (
//     <div style={s.overlay}>
//       <div style={{ ...s.popup, maxWidth: 460 }}>
//         <div style={s.successHeader}>
//           <div style={s.successIcon}>🎉</div>
//           <h2 style={s.successTitle}>Payment Successful!</h2>
//           <p style={s.successSub}>Your order is confirmed. Here's your receipt.</p>
//         </div>

//         <div style={s.receiptBody} ref={receiptRef}>
//           <div style={s.receiptDivider}>
//             <div style={s.dashedLine} />
//             <span style={s.receiptLabel}>RECEIPT</span>
//             <div style={s.dashedLine} />
//           </div>

//           <ReceiptRow label="Booking ID" value={data.bookingId || "—"} />
//           <ReceiptRow label="Customer" value={data.customerName || data.Name || "—"} />
//           <ReceiptRow label="Phone" value={data.phoneNumber || "—"} />
//           {data.email && <ReceiptRow label="Email" value={data.email} />}
//           <ReceiptRow label="Product" value={data.productName || "Festival Item"} />

//           {/* T-Shirt sizes breakdown */}
//           {data.sizeQuantities?.length > 0 && (
//             <div style={s.sizesBox}>
//               {data.sizeQuantities.map((sq) => (
//                 <div key={sq.size} style={{ display: "flex", justifyContent: "space-between" }}>
//                   <span style={{ fontSize: 13, color: "#616161", fontWeight: 600 }}>
//                     Size {sq.size} × {sq.quantity}
//                   </span>
//                   <span style={{ fontSize: 13, fontWeight: 700, color: "#424242" }}>
//                     {money(sq.quantity * pricePerPiece)}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ID Card holder name */}
//           {data.idCardHolderName && (
//             <ReceiptRow label="ID Card Name" value={data.idCardHolderName} />
//           )}

//           <ReceiptRow label="Total Quantity" value={`${data.totalQuantity} ${data.totalQuantity === 1 ? "piece" : "pieces"}`} />
//           <ReceiptRow label="Order ID" value={data.razorpayOrderId} mono />
//           <ReceiptRow label="Payment ID" value={data.razorpayPaymentId} mono />
//           <ReceiptRow label="Date" value={orderedAt} />
//           <ReceiptRow label="Status" value="✅ CONFIRMED" highlight />

//           <div style={{ ...s.receiptDivider, margin: "12px 0 0" }}>
//             <div style={s.dashedLine} />
//           </div>

//           <div style={s.receiptTotal}>
//             <span>Total Paid</span>
//             <span style={{ color: "#b71c1c" }}>{money(data.amount)}</span>
//           </div>
//         </div>

//         <div style={{ padding: "0 22px 24px", display: "flex", gap: 10 }}>
//           <button onClick={handleDownload} style={s.downloadBtn}>⬇ Download Receipt</button>
//           <button onClick={onClose} style={{ ...s.primaryBtn, flex: 1 }}>Done</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ReceiptRow({ label, value, mono, highlight }) {
//   return (
//     <div style={s.receiptRow}>
//       <span style={s.receiptRowLabel}>{label}</span>
//       <span style={{
//         ...s.receiptRowValue,
//         fontFamily: mono ? "monospace" : "inherit",
//         fontSize: mono ? 12 : 14,
//         color: highlight ? "#166534" : "#212121",
//         background: highlight ? "#dcfce7" : "transparent",
//         padding: highlight ? "2px 8px" : 0,
//         borderRadius: highlight ? 20 : 0,
//       }}>
//         {value || "—"}
//       </span>
//     </div>
//   );
// }

// // ── Failure Popup ─────────────────────────────────────────────────────────────
// const FAILURE_TIPS = [
//   "Ensure you have sufficient balance.",
//   "Try a different payment method.",
//   "Contact your bank if the issue persists.",
// ];

// function FailurePopup({ error, onClose, onRetry }) {
//   return (
//     <div style={s.overlay}>
//       <div style={{ ...s.popup, maxWidth: 420 }}>
//         <div style={s.failureHeader}>
//           <div style={s.failureIcon}>✕</div>
//           <h2 style={s.failureTitle}>Payment Failed</h2>
//           <p style={s.failureSub}>{error?.description || "Your payment could not be processed."}</p>
//         </div>
//         <div style={s.failureBody}>
//           {error?.orderId && (
//             <div style={s.failureDetail}>
//               <span style={s.failureDetailLabel}>Order Reference</span>
//               <span style={{ ...s.failureDetailValue, fontFamily: "monospace", fontSize: 12 }}>{error.orderId}</span>
//             </div>
//           )}
//           {error?.paymentId && (
//             <div style={s.failureDetail}>
//               <span style={s.failureDetailLabel}>Payment ID</span>
//               <span style={{ ...s.failureDetailValue, fontFamily: "monospace", fontSize: 12 }}>{error.paymentId}</span>
//             </div>
//           )}
//           <div style={s.failureTips}>
//             <p style={{ fontWeight: 800, fontSize: 13, marginBottom: 8, color: "#7c2d12" }}>What you can do:</p>
//             {FAILURE_TIPS.map((tip) => (
//               <p key={tip} style={{ fontSize: 13, color: "#9a3412", margin: "4px 0", paddingLeft: 14, position: "relative" }}>
//                 <span style={{ position: "absolute", left: 0 }}>•</span>{tip}
//               </p>
//             ))}
//           </div>
//         </div>
//         <div style={{ padding: "0 22px 24px", display: "flex", gap: 10 }}>
//           <button onClick={onClose} style={s.backBtn}>Close</button>
//           <button onClick={onRetry} style={{ ...s.primaryBtn, flex: 1 }}>Try Again</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Styles ────────────────────────────────────────────────────────────────────
// const s = {
//   page: { minHeight: "100vh", background: "linear-gradient(160deg,#fff8f0 0%,#fff3e0 50%,#fce4ec 100%)", fontFamily: "'Segoe UI',system-ui,sans-serif", color: "#212121" },
//   hero: { position: "relative", background: "linear-gradient(135deg,#b71c1c 0%,#880e0e 60%,#4a0000 100%)", color: "#fff", padding: "clamp(44px,8vw,64px) clamp(16px,4vw,24px)", overflow: "hidden", textAlign: "center" },
//   heroDeco: { position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,200,0,0.10)", pointerEvents: "none" },
//   heroContent: { position: "relative", maxWidth: 640, margin: "0 auto" },
//   eyebrow: { fontSize: 12, fontWeight: 800, letterSpacing: "0.25em", color: "#ffcc80", textTransform: "uppercase", marginBottom: 12 },
//   heroTitle: { fontSize: "clamp(2rem,6vw,3.5rem)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "-1px" },
//   heroSub: { fontSize: 16, color: "rgba(255,255,255,0.82)", lineHeight: 1.7 },
//   main: { maxWidth: 1100, margin: "0 auto", padding: "clamp(34px,6vw,48px) clamp(14px,4vw,24px) 80px" },
//   grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 28 },
//   faqSection: { marginTop: 72, paddingTop: 54, borderTop: "1px solid rgba(183,28,28,0.16)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 40, alignItems: "start" },
//   faqIntro: { maxWidth: 430 },
//   faqEyebrow: { margin: "0 0 12px", color: "#b71c1c", fontSize: 12, fontWeight: 900, letterSpacing: "0.22em", textTransform: "uppercase" },
//   faqTitle: { margin: 0, color: "#7f1010", fontFamily: "Georgia,'Times New Roman',serif", fontSize: "clamp(2rem,5vw,3.2rem)", lineHeight: 1.08, fontWeight: 900 },
//   faqCopy: { margin: "18px 0 0", color: "#616161", fontSize: 16, lineHeight: 1.75 },
//   faqList: { display: "flex", flexDirection: "column", gap: 12 },
//   faqItem: { background: "rgba(255,255,255,0.86)", border: "1px solid rgba(214,155,25,0.38)", borderRadius: 14, padding: "0 clamp(14px,4vw,18px)", boxShadow: "0 12px 35px rgba(121,28,0,0.06)" },
//   faqQuestion: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "18px 0", color: "#4a1515", fontSize: "clamp(0.94rem,3.7vw,1rem)", fontWeight: 800, lineHeight: 1.45, cursor: "pointer", listStyle: "none" },
//   faqIcon: { display: "grid", placeItems: "center", flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "#b71c1c", color: "#fff", fontSize: 19, fontWeight: 500, lineHeight: 1 },
//   faqAnswer: { margin: "0 0 19px", paddingRight: 0, color: "#616161", fontSize: 14, lineHeight: 1.75 },
//   card: { background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(183,28,28,0.08)", border: "1px solid rgba(245,222,179,0.6)" },
//   cardImg: { width: "100%", height: 240, objectFit: "cover", display: "block" },
//   cardBadge: { position: "absolute", top: 14, left: 14, background: "#b71c1c", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 50, textTransform: "uppercase", letterSpacing: "0.06em" },
//   cardPrice: { position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.96)", color: "#b71c1c", fontWeight: 900, fontSize: 18, padding: "4px 14px", borderRadius: 50, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
//   cardBody: { padding: "22px 22px 26px" },
//   cardTitle: { fontSize: 24, fontWeight: 900, color: "#212121", margin: "0 0 8px" },
//   cardDesc: { fontSize: 14, color: "#616161", lineHeight: 1.7, margin: "0 0 10px" },
//   sizeHint: { fontSize: 12, fontWeight: 700, color: "#795548", background: "#fff8e1", borderRadius: 8, padding: "6px 10px", display: "inline-block", marginBottom: 16 },
//   addBtn: { width: "100%", background: "#b71c1c", color: "#fff", border: "none", borderRadius: 50, padding: "13px 20px", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 20px rgba(183,28,28,0.25)" },
//   disabledAddBtn: { background: "#7f1d1d", cursor: "not-allowed", opacity: 0.78, boxShadow: "none" },
//   overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(5px)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 },
//   popup: { background: "#fff", borderRadius: 22, width: "100%", maxWidth: 480, boxShadow: "0 30px 80px rgba(0,0,0,0.22)", maxHeight: "92vh", overflowY: "auto", display: "flex", flexDirection: "column" },
//   popupHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f0e6d3", background: "#fff9f0", flexShrink: 0 },
//   popupThumb: { width: 48, height: 48, borderRadius: 10, objectFit: "cover" },
//   popupProductName: { fontWeight: 900, fontSize: 15, margin: 0 },
//   popupProductPrice: { fontSize: 13, fontWeight: 700, color: "#b71c1c", margin: "2px 0 0" },
//   steps: { display: "flex", alignItems: "center", gap: 4 },
//   stepDot: { width: 24, height: 24, borderRadius: "50%", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" },
//   stepLine: { width: 20, height: 2, background: "#e0e0e0", borderRadius: 2 },
//   closeBtn: { width: 30, height: 30, border: "none", background: "#f5f5f5", borderRadius: "50%", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#757575", display: "flex", alignItems: "center", justifyContent: "center" },
//   popupBody: { padding: "20px 22px 26px", display: "flex", flexDirection: "column", gap: 16 },
//   sectionLabel: { fontSize: 10, fontWeight: 900, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9e9e9e" },
//   idCardSummaryBox: { display: "flex", alignItems: "center", gap: 16, background: "#fff9f0", border: "1px solid #f5deb3", borderRadius: 14, padding: "16px 18px" },
//   idCardSummaryIcon: { fontSize: 32, flexShrink: 0 },
//   modalRow: { display: "flex", alignItems: "center", gap: 10 },
//   sizeSelect: { flex: 1, border: "1.5px solid #f5deb3", borderRadius: 10, padding: "9px 12px", fontSize: 14, fontWeight: 700, color: "#424242", background: "#fffdf7", cursor: "pointer", outline: "none" },
//   stepper: { display: "flex", alignItems: "center", gap: 2, background: "#fafafa", borderRadius: 10, border: "1.5px solid #f5deb3", padding: "2px 4px" },
//   stepBtn: { width: 32, height: 32, border: "none", background: "transparent", color: "#b71c1c", fontWeight: 900, fontSize: 18, cursor: "pointer", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" },
//   stepNum: { width: 28, textAlign: "center", fontWeight: 800, fontSize: 15 },
//   rowAmt: { fontSize: 14, fontWeight: 800, color: "#b71c1c", minWidth: 64, textAlign: "right" },
//   removeRowBtn: { border: "none", background: "transparent", color: "#bdbdbd", cursor: "pointer", fontSize: 14, fontWeight: 700, padding: 4 },
//   addSizeBtn: { border: "none", background: "none", color: "#b71c1c", fontWeight: 700, fontSize: 14, cursor: "pointer", textDecoration: "underline", padding: 0, alignSelf: "flex-start" },
//   summaryBar: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff9f0", borderRadius: 14, padding: "14px 18px", border: "1px solid #f5deb3", marginTop: 4 },
//   orderSummary: { background: "#fff9f0", borderRadius: 12, padding: "14px 16px", border: "1px solid #f5deb3", display: "flex", flexDirection: "column", gap: 6 },
//   summaryLine: { display: "flex", justifyContent: "space-between", fontSize: 14 },
//   fieldPrefix: { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontWeight: 800, fontSize: 14, color: "#616161", pointerEvents: "none" },
//   fieldCheck: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#22c55e", fontWeight: 900, fontSize: 16 },
//   fieldError: { fontSize: 12, color: "#ef4444", fontWeight: 600 },
//   fieldHint: { fontSize: 12, color: "#9e9e9e", fontWeight: 600 },
//   inlineError: { padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 700, background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" },
//   input: { width: "100%", border: "1.5px solid #f5deb3", borderRadius: 10, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none", fontFamily: "inherit", color: "#212121" },
//   idCardPanel: { display: "flex", flexDirection: "column", gap: 14, marginTop: 4, padding: "16px", border: "1px solid #f5c77a", borderRadius: 14, background: "#fffaf1" },
//   idCardTitle: { margin: 0, color: "#7f1010", fontSize: 15, fontWeight: 900 },
//   idPhotoLabel: { margin: "0 0 4px", color: "#424242", fontSize: 14, fontWeight: 800 },
//   idPhotoHelp: { margin: "0 0 12px", color: "#757575", fontSize: 12, lineHeight: 1.5 },
//   idPhotoLayout: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 },
//   passportFrame: { position: "relative", width: 112, aspectRatio: "35 / 45", flexShrink: 0, overflow: "hidden", border: "2px solid #b71c1c", borderRadius: 10, background: "#f3eee6", boxShadow: "0 6px 18px rgba(121,28,0,0.12)" },
//   passportPreview: { display: "block", width: "100%", height: "100%", objectFit: "cover" },
//   passportPlaceholder: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg,#fff,#eee5da)", overflow: "hidden" },
//   passportHead: { width: 38, height: 38, borderRadius: "50%", background: "#d1b9a6", marginBottom: 8 },
//   passportBody: { width: 78, height: 52, borderRadius: "50% 50% 0 0", background: "#d1b9a6", transform: "translateY(12px)" },
//   idPhotoActions: { display: "flex", flex: "1 1 190px", flexDirection: "column", gap: 9 },
//   hiddenFileInput: { position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" },
//   photoActionBtn: { width: "100%", border: "none", borderRadius: 50, padding: "11px 14px", background: "#b71c1c", color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer" },
//   photoSecondaryBtn: { width: "100%", border: "1.5px solid #b71c1c", borderRadius: 50, padding: "10px 14px", background: "#fff", color: "#8b1111", fontSize: 13, fontWeight: 800, cursor: "pointer" },
//   optimizedPhotoNote: { margin: "10px 0 0", color: "#166534", fontSize: 12, fontWeight: 800 },
//   primaryBtn: { background: "#b71c1c", color: "#fff", border: "none", borderRadius: 50, padding: "13px 22px", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 20px rgba(183,28,28,0.25)" },
//   backBtn: { background: "#f5f5f5", color: "#424242", border: "none", borderRadius: 50, padding: "13px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer" },
//   processingOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center" },
//   processingCard: { background: "#fff", borderRadius: 20, padding: "40px 36px", textAlign: "center", maxWidth: 320, width: "90%", boxShadow: "0 30px 80px rgba(0,0,0,0.3)" },
//   spinnerWrap: { display: "flex", justifyContent: "center", marginBottom: 20 },
//   spinner: { width: 52, height: 52, animation: "spin 0.9s linear infinite" },
//   processingTitle: { margin: "0 0 8px", fontWeight: 900, fontSize: 18, color: "#212121" },
//   processingMsg: { margin: "0 0 10px", fontSize: 14, color: "#616161", lineHeight: 1.6 },
//   processingHint: { margin: 0, fontSize: 12, fontWeight: 700, color: "#b71c1c", textTransform: "uppercase", letterSpacing: "0.05em" },
//   successHeader: { background: "linear-gradient(135deg,#052e16,#14532d)", padding: "32px 24px 28px", textAlign: "center", borderRadius: "22px 22px 0 0" },
//   successIcon: { width: 64, height: 64, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px" },
//   successTitle: { margin: "0 0 8px", color: "#fff", fontSize: 22, fontWeight: 900 },
//   successSub: { margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 14 },
//   receiptBody: { padding: "20px 22px", display: "flex", flexDirection: "column", gap: 0 },
//   receiptDivider: { display: "flex", alignItems: "center", gap: 10, margin: "8px 0 16px" },
//   dashedLine: { flex: 1, height: 1, borderTop: "2px dashed #e0e0e0" },
//   receiptLabel: { fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: "#bdbdbd", whiteSpace: "nowrap" },
//   receiptRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #fafafa" },
//   receiptRowLabel: { fontSize: 12, fontWeight: 700, color: "#9e9e9e", textTransform: "uppercase", letterSpacing: "0.05em" },
//   receiptRowValue: { fontSize: 14, fontWeight: 700 },
//   sizesBox: { background: "#fff9f0", border: "1px solid #f5deb3", borderRadius: 10, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 4, margin: "4px 0" },
//   receiptTotal: { display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 900, padding: "14px 0 4px" },
//   downloadBtn: { background: "#f0fdf4", color: "#166534", border: "1.5px solid #bbf7d0", borderRadius: 50, padding: "13px 18px", fontSize: 14, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" },
//   failureHeader: { background: "linear-gradient(135deg,#450a0a,#7f1d1d)", padding: "32px 24px 28px", textAlign: "center", borderRadius: "22px 22px 0 0" },
//   failureIcon: { width: 64, height: 64, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "#fff", margin: "0 auto 16px" },
//   failureTitle: { margin: "0 0 8px", color: "#fff", fontSize: 22, fontWeight: 900 },
//   failureSub: { margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 14 },
//   failureBody: { padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14 },
//   failureDetail: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fef2f2", borderRadius: 10, border: "1px solid #fecaca" },
//   failureDetailLabel: { fontSize: 12, fontWeight: 700, color: "#9e9e9e", textTransform: "uppercase" },
//   failureDetailValue: { fontSize: 14, fontWeight: 700, color: "#991b1b" },
//   failureTips: { background: "#fff7ed", borderRadius: 12, padding: "14px 16px", border: "1px solid #fed7aa" },
// };

// if (typeof document !== "undefined" && !document.getElementById("shop-spinner-style")) {
//   const st = document.createElement("style");
//   st.id = "shop-spinner-style";
//   st.textContent = "@keyframes spin{to{transform:rotate(360deg)}}";
//   document.head.appendChild(st);
// }
