import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Records() {
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const token = localStorage.getItem("token");

  const fetchRecords = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://data-retention-system.onrender.com/api/records",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const createRecord = async () => {
    try {
      await axios.post(
        "http://data-retention-system.onrender.com/api/records",
        {
          title,
          content,
          category,
          expiryDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Record created");

      setTitle("");
      setContent("");
      setCategory("");
      setExpiryDate("");

      fetchRecords();
    } catch (err) {
      console.error(err);
      alert("Error creating record");
    }
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(
        `http://data-retention-system.onrender.com/api/records/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Records</h2>

      {/* CREATE */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br /><br />

      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />
      <br /><br />

      <button onClick={createRecord}>Create Record</button>

      {/* ACTIVE */}
      <h3>Active Records</h3>

      {records
        .filter((r) => r.status === "ACTIVE")
        .map((r) => (
          <div key={r._id} style={card}>
            <h4>{r.title}</h4>
            <p>{r.content}</p>
            <p>{r.category}</p>
            <button onClick={() => deleteRecord(r._id)}>
              Delete
            </button>
          </div>
        ))}

      {/* ARCHIVED */}
      <h3>Archived Records</h3>

      {records
        .filter((r) => r.status === "ARCHIVED")
        .map((r) => (
          <div key={r._id} style={card}>
            <h4>{r.title}</h4>
            <p>{r.content}</p>
            <p>{r.category}</p>
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

export default Records;