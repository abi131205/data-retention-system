const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,

  status: {
    type: String,
    enum: ["active", "archived"],
    default: "active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  expiryDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Record", recordSchema);