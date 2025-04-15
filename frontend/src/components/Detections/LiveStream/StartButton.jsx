import React, { useState, useEffect } from "react";
import { FaPersonWalkingWithCane, FaPersonWalking, FaPersonWalkingLuggage, FaPersonRunning } from "react-icons/fa6";
import { PiPersonSimpleSwimFill } from "react-icons/pi";
import { Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const StartButton = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [
    <FaPersonWalkingWithCane size={50} key={0} />,
    <FaPersonWalking size={50} key={1} />,
    // <FaPersonWalkingLuggage size={50} key={2} />,
    <FaPersonRunning size={50} key={3} />,
    // <FaPersonWalkingLuggage size={50} key={2} />,
    // <PiPersonSimpleSwimFill size={50} key={4} />,
    <FaPersonWalking size={50} key={1} />,
    <FaPersonWalkingWithCane size={50} key={0} />,
  ];

  useEffect(() => {
    let interval;
    if (isDetecting) {
      interval = setInterval(() => {
        setCurrentIcon((prev) => (prev + 1) % icons.length);
      }, 250);
    } else {
      setCurrentIcon(0);
    }
    return () => clearInterval(interval);
  }, [isDetecting]);

  return (
    <Container className="text-center mt-1">
      <Row>
        <Col>
          <Button variant="primary" onClick={() => setIsDetecting(!isDetecting)}>
            {isDetecting ? "Stop Detection" : "Start Detection"}
          </Button>
          <div className="mt-4" style={{ height: "60px" }}>
            {isDetecting && icons[currentIcon]} 
          </div>
          <h5>Running...</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default StartButton;
