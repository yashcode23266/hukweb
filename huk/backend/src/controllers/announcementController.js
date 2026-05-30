const { z } = require("zod");
const Announcement = require("../models/Announcement");
const asyncHandler = require("../utils/asyncHandler");
const { logAudit } = require("../services/auditService");

const announcementSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(5),
  category: z.string().optional(),
  isPinned: z.boolean().optional(),
});

const listAnnouncements = asyncHandler(async (_req, res) => {
  const items = await Announcement.find().sort({ isPinned: -1, publishedAt: -1 });
  res.json(items);
});

const createAnnouncement = asyncHandler(async (req, res) => {
  const item = await Announcement.create(req.body);
  await logAudit({ actor: req.user?.email, action: "create", entity: "announcement", entityId: item._id.toString(), message: `Announcement created: ${item.title}` });
  res.status(201).json(item);
});

const updateAnnouncement = asyncHandler(async (req, res) => {
  const item = await Announcement.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
  if (!item) return res.status(404).json({ message: "Announcement not found" });
  await logAudit({ actor: req.user?.email, action: "update", entity: "announcement", entityId: item._id.toString(), message: `Announcement updated: ${item.title}` });
  res.json(item);
});

const deleteAnnouncement = asyncHandler(async (req, res) => {
  const item = await Announcement.findByIdAndDelete(req.params.id);
  if (item) await logAudit({ actor: req.user?.email, action: "delete", entity: "announcement", entityId: item._id.toString(), message: `Announcement deleted: ${item.title}` });
  res.status(204).end();
});

module.exports = {
  announcementSchema,
  listAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
