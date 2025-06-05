import React, { useState, useEffect } from "react";
import "./recentDetections.css";
import CardFilter from "./CardFilter";
import DetectionsTable from "./DetectionsTable";

function RecentDetections({ initialData = [] }) {
  const [items, setItems] = useState(initialData.slice(0, 100)); // Initialize with limited data
  const [filter, setFilter] = useState("Today");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setPage(1); // Reset to first page when filter changes
  };

  // Fetch more data when needed (pagination)
  const fetchMoreData = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://elephant-detection-website-production.onrender.com/api/detection/get-detection-data?page=${page + 1}&limit=50`
      );
      const newData = await response.json();
      
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...newData]);
        setPage(prev => prev + 1);
      }
    } catch (e) {
      console.error("Failed to fetch more data:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // WebSocket connection remains similar but only pushes updates
    const ws = new WebSocket("wss://elephant-detection-website-production.onrender.com");
    
    ws.onopen = () => console.log("✅ WebSocket connection for detection table opened.");
    
    ws.onmessage = (event) => {
      const newDetection = JSON.parse(event.data);
      setItems(prev => [newDetection, ...prev.slice(0, 999)]); // Keep reasonable limit
    };
    
    ws.onclose = () => console.log("WebSocket connection for detection table closed.");
    
    return () => ws.close();
  }, []);

  return (
    <div className="card recent-sales overflow-auto">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body activity-container">
        <h5 className="card-title">
          Recent Detections <span>/{filter}</span>
        </h5>
        <DetectionsTable 
          items={items} 
          onScrollEnd={fetchMoreData}
          loading={loading}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
}

export default RecentDetections;