const router = require("express").Router();
const validate = require("../middleware/validate");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const {
  announcementSchema,
  listAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

router.get("/", listAnnouncements);
router.post("/", requireAuth, requireAdmin, validate(announcementSchema), createAnnouncement);
router.put("/:id", requireAuth, requireAdmin, validate(announcementSchema.partial()), updateAnnouncement);
router.delete("/:id", requireAuth, requireAdmin, deleteAnnouncement);

module.exports = router;
