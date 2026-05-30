const router = require("express").Router();
const validate = require("../middleware/validate");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const { gallerySchema, listGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } = require("../controllers/galleryController");

router.get("/", listGallery);
router.post("/", requireAuth, requireAdmin, upload.single("image"), validate(gallerySchema), createGalleryItem);
router.put("/:id", requireAuth, requireAdmin, upload.single("image"), validate(gallerySchema.partial()), updateGalleryItem);
router.delete("/:id", requireAuth, requireAdmin, deleteGalleryItem);

module.exports = router;
