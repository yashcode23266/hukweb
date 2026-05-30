const multer = require("multer");

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 3 * 1024 * 1024,
    files: 1,
  },
  fileFilter(_req, file, callback) {
    if (!allowedImageTypes.has(file.mimetype)) {
      return callback(new Error("Only JPEG, PNG, and WebP images are allowed"));
    }
    callback(null, true);
  },
});

module.exports = { upload };
