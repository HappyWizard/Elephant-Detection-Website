import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

const ObjectDetectionUI = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [detectedObjects, setDetectedObjects] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleDetection = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await fetch("/api/yolo/detect", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDetectedObjects(data.detectedObjects);
      } else {
        console.error("Detection failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <input type="file" accept="video/*" onChange={handleFileChange} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {videoUrl && (
            <video controls width="100%" src={videoUrl}>
              Your browser does not support the video tag.
            </video>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button onClick={handleDetection} disabled={!videoFile}>
            Run Detection
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Detected Objects:</h4>
            <ul>
            {detectedObjects.map((obj, index) => (
              <li key={index}>
                {obj.label} (Confidence: {obj.confidence.toFixed(2)})
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default ObjectDetectionUI;