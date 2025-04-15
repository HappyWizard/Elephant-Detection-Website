import React, { useState, useEffect } from "react";
import "./BatteryStatus.css"; // Custom styles
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { ResponsiveContainer } from 'recharts';
import { Container, Row, Col } from "react-bootstrap";

const SolarBatteryStatusDisplay = () => {
  const [batteryLevels, setBatteryLevels] = useState({
    cell1: 100,
    cell2: 65,
    cell3: 40,
  });

  useEffect(() => {
    // Simulate battery level updates every 5 seconds
    const interval = setInterval(() => {
      setBatteryLevels((prev) => ({
        cell1: prev.cell1 > 5 ? prev.cell1 - 5 : 100,
        cell2: prev.cell2 > 5 ? prev.cell2 - 5 : 100,
        cell3: prev.cell3 > 5 ? prev.cell3 - 5 : 100,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderBatteryCell = (level) => {
    const fillCount = Math.ceil((level / 100) * 5); // Max 5 bars
    return (
      <div className="battery">
        <div className="battery-top"></div>
        <div className="battery-body">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`battery-bar ${index < fillCount ? "filled" : ""}`}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  return (


    <div>
    <Container className="mt-0">
    <Row className="g-4">
        {/* CPU Usage Chart */}
        <Col md={12}>
        <Card>
            <CardHeader>
            <Heading size="md">Battery Estimate </Heading>
            </CardHeader>
            <CardBody>
            <ResponsiveContainer width="100%" height={250}>
            <div className="battery-container">
              <div className="battery-label">
                <span>100%</span>
                <span>50%</span>
                <span>0%</span>
                <span></span>
              </div>
              <div className="battery-display">
                <div>
                  {renderBatteryCell(batteryLevels.cell1)}
                  <p>CELL 1</p>
                </div>
                <div>
                  {renderBatteryCell(batteryLevels.cell2)}
                  <p>CELL 2</p>
                </div>
                <div>
                  {renderBatteryCell(batteryLevels.cell3)}
                  <p>CELL 3</p>
                </div>
              </div>
            </div>
            
            </ResponsiveContainer>
            </CardBody>
        </Card>
        </Col>

    </Row>
    </Container>
    </div>
  );
};

export default SolarBatteryStatusDisplay;
