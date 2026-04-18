const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createPolicy,
  getPolicies
} = require("../controllers/policyController");

router.post("/", authMiddleware, adminMiddleware, createPolicy);

router.get("/", authMiddleware, adminMiddleware, getPolicies);

module.exports = router;