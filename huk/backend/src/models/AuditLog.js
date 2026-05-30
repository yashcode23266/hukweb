const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    actor: { type: String, default: "system" },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: String,
    message: String,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
