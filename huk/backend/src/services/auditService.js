const AuditLog = require("../models/AuditLog");

async function logAudit({ actor = "system", action, entity, entityId, message, metadata }) {
  try {
    await AuditLog.create({ actor, action, entity, entityId, message, metadata });
  } catch (error) {
    console.warn("Audit log failed:", error.message);
  }
}

module.exports = { logAudit };
