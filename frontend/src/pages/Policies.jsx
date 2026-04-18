import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Policies() {
  const [policies, setPolicies] = useState([]);
  const [category, setCategory] = useState("");
  const [retentionDays, setRetentionDays] = useState("");

  const token = localStorage.getItem("token");

  const fetchPolicies = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/policies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPolicies(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const createPolicy = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/policies",
        {
          category: category.toLowerCase(), 
          retentionDays,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Policy created");

      setCategory("");
      setRetentionDays("");

      fetchPolicies();
    } catch (err) {
      console.error(err);
      alert("Error creating policy");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Policies</h2>

      {/* CREATE */}
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Retention Days"
        value={retentionDays}
        onChange={(e) => setRetentionDays(e.target.value)}
      />
      <br /><br />

      <button onClick={createPolicy}>Create Policy</button>

      {/* LIST */}
      <h3>All Policies</h3>

      {policies.map((p) => (
        <div key={p._id} style={card}>
          <h4>{p.category}</h4>
          <p>{p.retentionDays} days</p>
        </div>
      ))}
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
};

export default Policies;