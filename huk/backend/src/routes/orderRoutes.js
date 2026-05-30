const router = require("express").Router();
const validate = require("../middleware/validate");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const {
  createOrder,
  verifyOrder,
  updateOrderStatus,
  createOrderSchema,
  verifyOrderSchema,
  updateOrderStatusSchema,
} = require("../controllers/orderController");

router.post("/", validate(createOrderSchema), createOrder);
router.post("/verify", validate(verifyOrderSchema), verifyOrder);
router.put("/:id/status", requireAuth, requireAdmin, validate(updateOrderStatusSchema), updateOrderStatus);

module.exports = router;
