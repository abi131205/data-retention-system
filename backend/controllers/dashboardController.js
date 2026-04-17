const Record = require("../models/Record");

exports.getDashboardStats = async (req, res) => {
  try {
    const total = await Record.countDocuments();

    const active = await Record.countDocuments({ status: "active" });

    const archived = await Record.countDocuments({ status: "archived" });

    // 🔥 NEAR EXPIRY (within next 1 minute for demo)
    const now = new Date();
    const nextMinute = new Date(now.getTime() + 60 * 1000);

    const nearExpiry = await Record.countDocuments({
      expiryDate: { $gte: now, $lte: nextMinute },
      status: "active",
    });

    // 🔥 CATEGORY STATS
    const categories = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      total,
      active,
      archived,
      nearExpiry, // ✅ ADDED
      categories: categories.map((c) => ({
        category: c._id,
        count: c.count,
      })),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};