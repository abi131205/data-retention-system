const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const policyRoutes = require("./routes/policyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes"); // 👈 ADD THIS

const archiveExpiredRecords = require("./utils/archiveJob");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/dashboard", dashboardRoutes); // 👈 ADD THIS

app.get("/", (req, res) => {
  res.send("API running...");
});

setInterval(() => {
  archiveExpiredRecords();
}, 60000);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

setInterval(() => {
  archiveExpiredRecords();
}, 60000);