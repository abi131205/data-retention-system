const Record = require("../models/Record");

const runArchiveJob = async () => {
  try {
    const now = new Date();

    const expiredRecords = await Record.find({
      expiryDate: { $lte: now },
      status: "active",
    });

    for (let record of expiredRecords) {
      record.status = "archived";
      await record.save();
    }

    console.log(`Archived ${expiredRecords.length} records`);
  } catch (err) {
    console.error("Archive Job Error:", err);
  }
};

module.exports = runArchiveJob;