const { z } = require("zod");
const fs = require("fs/promises");
const Product = require("../models/Product");
const fallbackProducts = require("../data/products");
const asyncHandler = require("../utils/asyncHandler");
const cloudinary = require("../config/cloudinary");
const { logAudit } = require("../services/auditService");

const productSchema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().positive(),
  description: z.string().min(5),
  image: z.string().url().optional().or(z.literal("")),
  sizes: z
    .preprocess((value) => {
      if (typeof value === "string") {
        return value
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean);
      }
      return value;
    }, z.array(z.string().min(1)))
    .optional(),
  stock: z.coerce.number().int().min(0).optional(),
  isActive: z
    .preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    }, z.boolean())
    .optional(),
});

async function uploadProductImage(file) {
  if (!file) return {};
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    await fs.unlink(file.path).catch(() => {});
    throw new Error("Cloudinary is not configured. Add credentials or use an image URL.");
  }

  try {
    const upload = await cloudinary.uploader.upload(file.path, { folder: "ganpati-mandal/products" });
    return { image: upload.secure_url, cloudinaryPublicId: upload.public_id };
  } finally {
    await fs.unlink(file.path).catch(() => {});
  }
}

const listProducts = asyncHandler(async (req, res) => {
  const includeInactive = req.query.includeInactive === "true";
  const query = includeInactive ? {} : { isActive: true };
  const products = await Product.find(query).sort({ createdAt: -1 });

  res.json(products.length ? products : fallbackProducts);
});

const createProduct = asyncHandler(async (req, res) => {
  const uploadedImage = await uploadProductImage(req.file);
  const image = uploadedImage.image || req.body.image;
  if (!image) return res.status(400).json({ message: "Product image file or image URL is required" });

  const product = await Product.create({
    ...req.body,
    ...uploadedImage,
    image,
    sizes: req.body.sizes?.length ? req.body.sizes : ["Standard"],
  });
  await logAudit({ actor: req.user?.email, action: "create", entity: "product", entityId: product._id.toString(), message: `Product created: ${product.name}` });
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const existing = await Product.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: "Product not found" });

  const uploadedImage = await uploadProductImage(req.file);
  if (uploadedImage.cloudinaryPublicId && existing.cloudinaryPublicId) {
    await cloudinary.uploader.destroy(existing.cloudinaryPublicId);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, { ...req.body, ...uploadedImage }, {
    returnDocument: "after",
    runValidators: true,
  });
  await logAudit({ actor: req.user?.email, action: "update", entity: "product", entityId: product._id.toString(), message: `Product updated: ${product.name}` });
  res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (product.cloudinaryPublicId) await cloudinary.uploader.destroy(product.cloudinaryPublicId);
  await logAudit({ actor: req.user?.email, action: "delete", entity: "product", entityId: product._id.toString(), message: `Product deleted: ${product.name}` });
  res.status(204).end();
});

module.exports = { productSchema, listProducts, createProduct, updateProduct, deleteProduct };
