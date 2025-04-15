import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Row, Col } from "react-bootstrap";

const data = [
  { time: '6 AM', Phone: 80, Laptop: 60 },
  { time: '9 AM', Phone: 75, Laptop: 55 },
  { time: '12 PM', Phone: 65, Laptop: 50 },
  { time: '3 PM', Phone: 50, Laptop: 40 },
  { time: '6 PM', Phone: 40, Laptop: 35 },
  { time: '9 PM', Phone: 30, Laptop: 25 },
  { time: '12 AM', Phone: 20, Laptop: 15 }
];

const SolarBatteryStatusChart = () => {
  return (
    <div>
    <Container className="mt-0">
    <Row className="g-4">
        {/* CPU Usage Chart */}
        <Col md={12}>
        <Card>
            <CardHeader>
            <Heading size="md">Battery Levels (%)</Heading>
            </CardHeader>
            <CardBody>
            <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Phone" fill="#0085fa" name="Phone Battery" />
                <Bar dataKey="Laptop" fill="#eafa07" name="Solar Battery" />
            </BarChart>
            </ResponsiveContainer>
            </CardBody>
        </Card>
        </Col>

    </Row>
    </Container>
    </div>
  );
}

export default SolarBatteryStatusChart

