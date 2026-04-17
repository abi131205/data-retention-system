const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    retentionDays: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Policy || mongoose.model("Policy", policySchema);