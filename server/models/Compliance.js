const mongoose = require("mongoose");

const ComplianceSchema = new mongoose.Schema(
      {
            title: { type: String, required: true },
            priority: { type: String, enum: ["Critical", "High", "Medium", "Low"], default: "Medium" },
            description: { type: String, required: true },
            category: { type: String, required: true },
            frequency: { type: String, required: true },
            assignee: { type: String, required: true },
            status: { type: String, enum: ["Compliant", "Pending", "Non-Compliant"], default: "Pending" },
            lastAuditDate: { type: String }, // Storing as string for simplicity to match UI, or could be Date
            nextDueDate: { type: String },
            complianceRate: { type: Number, default: 0 },
      },
      { timestamps: true }
);

module.exports = mongoose.model("Compliance", ComplianceSchema);
