const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");


router.post("/", authMiddleware, createRecord);

router.get("/", authMiddleware, getRecords);

router.put("/:id", authMiddleware, updateRecord);

router.delete("/:id", authMiddleware, deleteRecord);

module.exports = router;