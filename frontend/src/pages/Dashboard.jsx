import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    archived: 0,
    nearExpiry: 0, 
    categories: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://data-retention-system.onrender.com/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();

    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>📊 Data Retention Dashboard</h2>

      <p style={{ color: "gray" }}>
        Real-time monitoring of record lifecycle and retention policies
      </p>

      {/* Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => (window.location.href = "/records")}>
          Records
        </button>

        <button
          onClick={() => (window.location.href = "/policies")}
          style={{ marginLeft: "10px" }}
        >
          Policies
        </button>

        <button
          onClick={handleLogout}
          style={{
            marginLeft: "10px",
            backgroundColor: "red",
            color: "white",
          }}
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <h3>Total Records</h3>
          <p style={numberStyle}>{stats.total}</p>
        </div>

        <div style={cardStyle}>
          <h3>Active Records</h3>
          <p style={numberStyle}>{stats.active}</p>
        </div>

        <div style={cardStyle}>
          <h3>Archived Records</h3>
          <p style={numberStyle}>{stats.archived}</p>
        </div>

        {/* ✅ NEW CARD */}
        <div style={cardStyle}>
          <h3>Near Expiry</h3>
          <p style={numberStyle}>{stats.nearExpiry || 0}</p>
        </div>
      </div>

      {/* Category List */}
      <h3 style={{ marginTop: "40px" }}>Category Breakdown</h3>

      <ul>
        {stats.categories?.map((item, index) => (
          <li key={index}>
            {item.category} - {item.count}
          </li>
        ))}
      </ul>

      {/* Chart */}
      <h3 style={{ marginTop: "40px" }}>Visualization</h3>

      <PieChart width={400} height={300}>
        <Pie
          data={stats.categories || []}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {(stats.categories || []).map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

// Styles
const cardStyle = {
  border: "none",
  padding: "25px",
  borderRadius: "15px",
  width: "220px",
  textAlign: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "white",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
};

const numberStyle = {
  fontSize: "28px",
  fontWeight: "bold",
};

export default Dashboard;