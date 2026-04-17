const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");


// Create Record
router.post("/", authMiddleware, createRecord);

// Get Records
router.get("/", authMiddleware, getRecords);

// Update Record
router.put("/:id", authMiddleware, updateRecord);

// Delete Record
router.delete("/:id", authMiddleware, deleteRecord);

module.exports = router;