import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";

const SystemStatusCharts = () => {
  const [cpuData, setCpuData] = useState([]);
  const [ramData, setRamData] = useState([]);
  const [diskUsage, setDiskUsage] = useState(0);
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5001"); // Update with your WebSocket server
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      setCpuData((prev) => [...prev.slice(-20), { time: data.time, usage: data.cpu }]);
      setRamData((prev) => [...prev.slice(-20), { time: data.time, usage: data.ram }]);
      setTemperatureData((prev) => [...prev.slice(-20), { time: data.time, temp: data.temp }]);
      setDiskUsage(data.disk);
    };
    
    return () => socket.close();
  }, []);

  return (
    <div>
        <Container className="mt-4">
        <Row className="g-4">
            {/* CPU Usage Chart */}
            <Col md={6}>
            <Card>
                <CardHeader>
                <Heading size="md">CPU Usage (%)</Heading>
                </CardHeader>
                <CardBody>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={cpuData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="usage" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
                </CardBody>
            </Card>
            </Col>

            {/* RAM Usage Chart */}
            <Col md={6}>
            <Card>
                <CardHeader>
                <Heading size="md">RAM Usage (%)</Heading>
                </CardHeader>
                <CardBody>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={ramData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="usage" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
                </CardBody>
            </Card>
            </Col>

            {/* Disk Usage Chart */}
            <Col md={6}>
            <Card>
                <CardHeader>
                <Heading size="md">Disk Usage (%)</Heading>
                </CardHeader>
                <CardBody className="d-flex justify-content-center">
                <PieChart width={200} height={200}>
                    <Pie data={[{ name: "Used", value: diskUsage }, { name: "Free", value: 100 - diskUsage }]} dataKey="value" cx="50%" cy="50%" outerRadius={60} label>
                    <Cell fill="#ff7f50" />
                    <Cell fill="#2ecc71" />
                    </Pie>
                </PieChart>
                </CardBody>
            </Card>
            </Col>

            {/* Temperature Chart */}
            <Col md={6}>
            <Card>
                <CardHeader>
                <Heading size="md">Temperature (°C)</Heading>
                </CardHeader>
                <CardBody>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[20, 80]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#ff4d4d" />
                    </LineChart>
                </ResponsiveContainer>
                </CardBody>
            </Card>
            </Col>
        </Row>
        </Container>
    </div>
  );
};

export default SystemStatusCharts;
