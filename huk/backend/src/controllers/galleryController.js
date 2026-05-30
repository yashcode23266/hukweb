const { z } = require("zod");
const fs = require("fs/promises");
const Gallery = require("../models/Gallery");
const asyncHandler = require("../utils/asyncHandler");
const cloudinary = require("../config/cloudinary");
const { logAudit } = require("../services/auditService");

const gallerySchema = z.object({
  title: z.string().min(3),
  year: z.coerce.number().int().min(1900),
  story: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

const listGallery = asyncHandler(async (req, res) => {
  const query = req.query.year ? { year: Number(req.query.year) } : {};
  const items = await Gallery.find(query).sort({ year: -1, createdAt: -1 });
  res.json(items);
});

const createGalleryItem = asyncHandler(async (req, res) => {
  let imageUrl = req.body.imageUrl;
  let cloudinaryPublicId;

  if (req.file && !process.env.CLOUDINARY_CLOUD_NAME) {
    await fs.unlink(req.file.path).catch(() => {});
    return res.status(400).json({ message: "Cloudinary is not configured. Add credentials or use an image URL." });
  }

  if (req.file) {
    try {
      const upload = await cloudinary.uploader.upload(req.file.path, { folder: "ganpati-mandal/gallery" });
      imageUrl = upload.secure_url;
      cloudinaryPublicId = upload.public_id;
    } finally {
      await fs.unlink(req.file.path).catch(() => {});
    }
  }

  if (!imageUrl) return res.status(400).json({ message: "Image file or imageUrl is required" });

  const item = await Gallery.create({ ...req.body, imageUrl, cloudinaryPublicId });
  await logAudit({ actor: req.user?.email, action: "create", entity: "gallery", entityId: item._id.toString(), message: `Gallery item created: ${item.title}` });
  res.status(201).json(item);
});

const updateGalleryItem = asyncHandler(async (req, res) => {
  const existing = await Gallery.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: "Gallery item not found" });

  const updates = { ...req.body };

  if (req.file && !process.env.CLOUDINARY_CLOUD_NAME) {
    await fs.unlink(req.file.path).catch(() => {});
    return res.status(400).json({ message: "Cloudinary is not configured. Add credentials or use an image URL." });
  }

  if (req.file) {
    try {
      const upload = await cloudinary.uploader.upload(req.file.path, { folder: "ganpati-mandal/gallery" });
      updates.imageUrl = upload.secure_url;
      updates.cloudinaryPublicId = upload.public_id;
      if (existing.cloudinaryPublicId) await cloudinary.uploader.destroy(existing.cloudinaryPublicId);
    } finally {
      await fs.unlink(req.file.path).catch(() => {});
    }
  }

  if (updates.imageUrl && existing.cloudinaryPublicId && updates.imageUrl !== existing.imageUrl) {
    await cloudinary.uploader.destroy(existing.cloudinaryPublicId);
    updates.cloudinaryPublicId = undefined;
  }

  const item = await Gallery.findByIdAndUpdate(req.params.id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  await logAudit({ actor: req.user?.email, action: "update", entity: "gallery", entityId: item._id.toString(), message: `Gallery item updated: ${item.title}` });
  res.json(item);
});

const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  if (item?.cloudinaryPublicId) await cloudinary.uploader.destroy(item.cloudinaryPublicId);
  if (item) await logAudit({ actor: req.user?.email, action: "delete", entity: "gallery", entityId: item._id.toString(), message: `Gallery item deleted: ${item.title}` });
  res.status(204).end();
});

module.exports = { gallerySchema, listGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem };
