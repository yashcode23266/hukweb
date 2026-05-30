const router = require("express").Router();
const validate = require("../middleware/validate");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { productSchema, listProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

router.get("/", listProducts);
router.post("/", requireAuth, requireAdmin, upload.single("imageFile"), validate(productSchema), createProduct);
router.put("/:id", requireAuth, requireAdmin, upload.single("imageFile"), validate(productSchema.partial()), updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

module.exports = router;
