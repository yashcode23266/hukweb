const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    story: String,
    imageUrl: { type: String, required: true },
    cloudinaryPublicId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
