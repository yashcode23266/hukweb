const router = require("express").Router();
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const { dashboard, exportExcel } = require("../controllers/adminController");

router.get("/dashboard", requireAuth, requireAdmin, dashboard);
router.get("/export.xlsx", requireAuth, requireAdmin, exportExcel);

module.exports = router;
