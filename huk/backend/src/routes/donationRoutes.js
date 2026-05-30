const router = require("express").Router();
const validate = require("../middleware/validate");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const {
  createDonation,
  verifyDonation,
  createOfflineDonation,
  createDonationSchema,
  verifyDonationSchema,
  offlineDonationSchema,
} = require("../controllers/donationController");

router.post("/", validate(createDonationSchema), createDonation);
router.post("/verify", validate(verifyDonationSchema), verifyDonation);
router.post("/offline", requireAuth, requireAdmin, validate(offlineDonationSchema), createOfflineDonation);

module.exports = router;
