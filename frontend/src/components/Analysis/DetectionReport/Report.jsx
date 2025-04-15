import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";

const Report = () => {
  // Sample report data
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports from backend (mock data for now)
    setReports([
      {
        id: 1,
        date: "2025-03-04",
        location: "Kota Tinggi, Johor",
        elephantsDetected: 3,
        confidence: "98%",
        fileUrl: "C:/Users/eugen/Documents/MongoDB/Elephant-Detection-Project/backend/public/reports/elephant_report_1.pdf",
      },
      {
        id: 2,
        date: "2025-03-03",
        location: "Miri, Sarawak",
        elephantsDetected: 5,
        confidence: "95%",
        fileUrl: "C:/Users/eugen/Documents/MongoDB/Elephant-Detection-Project/backend/public/reports/elephant_report_1.pdf",
      },
    ]);
  }, []);

  return (
    // <div className="card report-card">
        <Container className="mt-4">
        {/* Page Title */}
        {/* <h2 className="mb-3">Detection Reports</h2> */}
        <p>Download reports of detected elephant activity in different regions.</p>

        {/* Filter Section */}
        <Form className="mb-4">
            <Row>
            <Col md={4}>
                <Form.Group>
                <Form.Label>Filter by Date:</Form.Label>
                <Form.Control type="date" />
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group>
                <Form.Label>Filter by Location:</Form.Label>
                <Form.Control type="text" placeholder="Enter location" />
                </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
                <Button variant="primary" className="w-100">Search</Button>
            </Col>
            </Row>
        </Form>

        {/* Reports Table */}
        <div className="table-responsive">
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Elephants Detected</th>
                    <th>Confidence</th>
                    <th>Download</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report) => (
                    <tr key={report.id}>
                    <td>{report.date}</td>
                    <td>{report.location}</td>
                    <td>{report.elephantsDetected}</td>
                    <td>{report.confidence}</td>
                    <td>
                        <Button variant="warning" href={`http://localhost:5000/reports/elephant_report_1.pdf`} download>
                        Download PDF
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
        </Container>
    // </div>
  );
};

export default Report;
