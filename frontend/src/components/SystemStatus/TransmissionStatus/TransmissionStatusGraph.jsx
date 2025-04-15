import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap"; // Bootstrap components

const TransmissionStatusGraph = () => {
  const [piStatus, setPiStatus] = useState({
    pi4: "checking",
    pi5: "checking",
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/pi-status"); // Adjust API URL
        const data = await res.json();
        setPiStatus(data);
      } catch (error) {
        console.error("Error fetching Raspberry Pi status:", error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const renderStatus = (status) => {
    if (status === "connected") {
      return <i className="bi bi-check-circle-fill text-success fs-4"></i>; // Green check
    } else if (status === "disconnected") {
      return <i className="bi bi-x-circle-fill text-danger fs-4"></i>; // Red X
    } else {
      return <Spinner animation="border" variant="primary" size="sm" />; // Loading spinner
    }
  };

  return (
    <div className="p-4">
      <h3 className="mb-4">Handshake Status</h3>

      <div className="d-flex gap-3 flex-wrap">
        <Card style={{ width: "250px" }} className="shadow p-3">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Raspberry Pi 4</h5>
            {renderStatus(piStatus.pi4)}
          </Card.Body>
        </Card>

        <Card style={{ width: "250px" }} className="shadow p-3">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Raspberry Pi 5</h5>
            {renderStatus(piStatus.pi5)}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default TransmissionStatusGraph;
