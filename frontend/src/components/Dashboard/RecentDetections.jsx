import React, { useState, useEffect } from "react";
import "./recentDetections.css";
import CardFilter from "./CardFilter";
import DetectionsTable from "./DetectionsTable";

function RecentDetections() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  // Fetch detection data from the backend
  const fetchData = async () => {
    fetch("https://elephant-detection-website-production.onrender.com/api/detection/get-detection-data")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.reverse());
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Connect to WebSocket server
    // const ws = new WebSocket("ws://localhost:5001"); // Update URL if hosted remotely
    const ws = new WebSocket("ws://elephant-detection-website-production.onrender.com"); // Update URL if hosted remotely
    // const ws = new WebSocket(`ws://192.168.180.88:5001`);
    ws.onopen = () => {
      console.log("✅ WebSocket connection for detection table opened.");
    };

    ws.onmessage = (event) => {
      const newDetection = JSON.parse(event.data);
      console.log("New detection for detection table data received:", newDetection);

      // Update the detection data dynamically
      setItems((prevCards) => [newDetection, ...prevCards]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection for detection table closed.");
    };

    return () => ws.close(); // Cleanup on component unmount
  }, []);

  return (
    <div className="card recent-sales overflow-auto">
      <CardFilter filterChange={handleFilterChange} />

      <div className="card-body activity-container">
        <h5 className="card-title">
          Recent Detections <span>/{filter}</span>
        </h5>
        <DetectionsTable items={items} />
      </div>
    </div>
  );
}

export default RecentDetections;
