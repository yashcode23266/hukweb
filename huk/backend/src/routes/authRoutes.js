const router = require("express").Router();
const { z } = require("zod");
const validate = require("../middleware/validate");
const { loginAdmin } = require("../controllers/authController");

router.post(
  "/admin/login",
  validate(z.object({ email: z.string().email(), password: z.string().min(6) })),
  loginAdmin
);

module.exports = router;
