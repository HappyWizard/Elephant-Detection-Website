import React, { useState, useEffect } from "react";

const TestDisplay = () => {
  const [cards, setCards] = useState([]); // State to hold detection data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch initial detection data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://elephant-detection-website-production.onrender.com/api/detection/get-detection-data"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCards(data); // Set fetched data to state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading once data is fetched or error occurs
      }
    };

    fetchData();
  }, []);

  // WebSocket connection to listen for real-time updates
  useEffect(() => {
    // Replace with your Node.js server's IP if needed
    const ws = new WebSocket(
      "wss://elephant-detection-website-production.onrender.com"
    );
    // const ws = new WebSocket(`ws://192.168.180.88:5001`);

    ws.onopen = () =>
      console.log("✅ WebSocket connection for Test Display opened.");
    ws.onmessage = (event) => {
      const newDetection = JSON.parse(event.data);
      setCards((prev) => [newDetection, ...prev]);
    };
    ws.onerror = (e) => console.error("WebSocket error:", e);
    ws.onclose = () =>
      console.log(" WebSocket connection for Test Display opened.");

    return () => ws.close();
  }, []);

  return (
    <div className="card-body">
      {/* <div className="card-body"> */}
      <h5 className="card-title">Raspberry Pi Data</h5>
      {loading && <p>Loading detection data...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && cards.length === 0 && (
        <p>No detection data available.</p>
      )}
      {!loading &&
        !error &&
        cards.map((card) => (
          <div key={card._id || card.timestamp} className="card p-4">
            <h3>Object Detected: {card.object_detected}</h3>
            <p>Number of Object: {card.object_detected_count}</p>
            <p>Confidence (Camera): {card.confidence_camera.toFixed(2)}</p>
            <p>Confidence (Audio): {card.confidence_audio.toFixed(2)}</p>
            <p>Camera Detection: {String(card.camera_detected)}</p>
            <p>Audio Detection: {String(card.audio_detected)}</p>
            <p>Device Code: {card.device_code}</p>
            <p>
              Timestamp:{" "}
              {new Date(card.timestamp).toLocaleString("en-US", {
                timeZone: "UTC",
              })}
            </p>
            <p>
              Location:
              {card.location &&
              card.location.latitude != null &&
              card.location.longitude != null ? (
                <>
                  {" "}
                  Latitude: {card.location.latitude}, Longitude:{" "}
                  {card.location.longitude}
                </>
              ) : (
                " Location data not available"
              )}
            </p>

            {card.image_file && (
              <div>
                <img
                  src={`https://elephant-detection-website-production.onrender.com/api/detection/get-detection-files/${card.image_file}`}
                  alt="Detected Object"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </div>
            )}

            {card.sound_file && (
              <div>
                <audio controls>
                  <source
                    src={`https://elephant-detection-website-production.onrender.com/api/detection/get-detection-files/${card.sound_file}`}
                    type="audio/wav"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        ))}
      {/* </div> */}
    </div>
  );
};

export default TestDisplay;
