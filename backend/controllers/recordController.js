const Record = require("../models/Record");
const Policy = require("../models/Policy");


// 🔥 CREATE RECORD WITH EXPIRY
exports.createRecord = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // 🔍 Find matching policy
    const policy = await Policy.findOne({ category });

    if (!policy) {
      return res.status(400).json({
        message: "No policy found for this category",
      });
    }

    const createdAt = new Date();

    // ✅ CORRECT expiry calculation (30 sec for testing)
    const expiryDate = new Date(createdAt.getTime() + 30 * 1000);

    const record = new Record({
      title,
      content,
      category,
      createdAt,
      expiryDate,
      status: "active",
    });

    await record.save();

    res.status(201).json(record);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating record" });
  }
};


// 🔥 GET RECORDS
exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching records" });
  }
};


// 🔥 UPDATE RECORD
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // ❌ BLOCK EDIT IF ARCHIVED
    if (record.status === "archived") {
      return res.status(400).json({
        message: "Archived records cannot be edited"
      });
    }

    const updated = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating record" });
  }
};


// 🔥 DELETE RECORD
exports.deleteRecord = async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);

    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting record" });
  }
};