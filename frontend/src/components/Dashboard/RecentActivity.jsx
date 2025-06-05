import React, { useState, useEffect } from "react";
import CardFilter from "./CardFilter";
import RecentActivityItem from "./RecentActivityItem";
import "./recentActivity.css"

function RecentActivity({ initialData = [] }) {
  const [items, setItems] = useState(initialData.slice(0, 50)); // Initialize with limited data
  const [filter, setFilter] = useState("Today");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    // WebSocket connection remains similar
    const ws = new WebSocket("wss://elephant-detection-website-production.onrender.com");
    
    ws.onopen = () => console.log("✅ WebSocket connection for recent activity opened.");
    
    ws.onmessage = (event) => {
      const newDetection = JSON.parse(event.data);
      setItems(prev => [newDetection, ...prev.slice(0, 99)]); // Keep reasonable limit
    };
    
    ws.onclose = () => console.log("WebSocket connection for recent activity closed.");
    
    return () => ws.close();
  }, []);

  return (
    <div className="card">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body activity-container">
        <h5 className="card-title">
          Recent Activity <span>/{filter}</span>
        </h5>
        <div className="activity">
          {items.map((item) => (
            <RecentActivityItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;