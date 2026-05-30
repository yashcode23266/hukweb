const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    cloudinaryPublicId: String,
    sizes: [{ type: String, trim: true }],
    stock: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("id").get(function getId() {
  return this._id.toString();
});

module.exports = mongoose.model("Product", productSchema);
