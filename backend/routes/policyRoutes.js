const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createPolicy,
  getPolicies
} = require("../controllers/policyController");

// Create Policy
router.post("/", authMiddleware, adminMiddleware, createPolicy);

// Get Policies
router.get("/", authMiddleware, adminMiddleware, getPolicies);

module.exports = router;