import React, { useState, useEffect }  from "react";
import CardFilter from "./CardFilter";
import RecentActivityItem from "./RecentActivityItem";
import "./recentActivity.css"

function RecentActivity() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  // Fetch detection data from the backend
  const fetchData = async () => {
    fetch("http://localhost:5000/api/detection/get-detection-data")
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
    const ws = new WebSocket("ws://localhost:5001"); // Update URL if hosted remotely
    // const ws = new WebSocket(`ws://192.168.180.88:5001`);

    ws.onopen = () => {
      console.log("✅ WebSocket connection for recent activity opened.");
    };

    ws.onmessage = (event) => {
      const newDetection = JSON.parse(event.data);
      // console.log("New detection for recent activity received:", newDetection);

      // Update the detection data dynamically
      setItems((prevCards) => [newDetection, ...prevCards]);
    };

    ws.onclose = () => {
      console.log("WebSocket connection for recent activity closed.");
    };

    return () => ws.close(); // Cleanup on component unmount
  }, []);

  return (
    <div className="card">
      <CardFilter filterChange={handleFilterChange} />

      <div className="card-body activity-container">
        <h5 className="card-title">
          Recent Activity <span>/{filter}</span>
        </h5>

        <div className="activity">
          {items &&
            items.length > 0 &&
            items.map((item) => (
              <RecentActivityItem key={item._id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
