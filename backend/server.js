const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const policyRoutes = require("./routes/policyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes"); // 👈 ADD THIS

// Archival Job
const archiveExpiredRecords = require("./utils/archiveJob");

// Load env variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/dashboard", dashboardRoutes); // 👈 ADD THIS

// Test Route
app.get("/", (req, res) => {
  res.send("API running...");
});

// 🔥 Auto Archival (runs every 1 minute)
setInterval(() => {
  archiveExpiredRecords();
}, 60000);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 🔥 Archive Expired Records
setInterval(() => {
  archiveExpiredRecords();
}, 60000);