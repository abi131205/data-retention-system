const Policy = require("../models/Policy");

// ✅ CREATE POLICY
exports.createPolicy = async (req, res) => {
  try {
    let { category, retentionDays } = req.body;

    // 🔥 normalize
    category = category.toLowerCase();

    // remove old
    await Policy.deleteMany({ category });

    const policy = await Policy.create({
      category,
      retentionDays,
      createdBy: req.user._id,
    });

    res.status(201).json(policy);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET POLICIES (THIS WAS MISSING / BROKEN)
exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};