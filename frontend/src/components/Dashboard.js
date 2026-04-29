import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [heartRate] = useState(78);
  const [oxygen] = useState(97);
  const [risk] = useState("Low");

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">
        Smart Medical System Dashboard
      </h2>

      <Row className="g-4">
        <Col md={3}>
          <Card className="shadow text-center border-0" bg="success" text="white">
            <Card.Body>
              <Card.Title>Heart Rate</Card.Title>
              <Card.Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                {heartRate} BPM
              </Card.Text>
              <Card.Subtitle>Normal Range</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow text-center border-0" bg="primary" text="white">
            <Card.Body>
              <Card.Title>Oxygen Level</Card.Title>
              <Card.Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                {oxygen}%
              </Card.Text>
              <Card.Subtitle>Stable</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow text-center border-0" bg="danger" text="white">
            <Card.Body>
              <Card.Title>Overdose Risk</Card.Title>
              <Card.Text style={{ fontSize: "24px", fontWeight: "bold" }}>
                {risk}
              </Card.Text>
              <Card.Subtitle>No Immediate Threat</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow text-center border-0" bg="dark" text="white">
            <Card.Body>
              <Card.Title>Medicine History</Card.Title>
              <Card.Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                View Records
              </Card.Text>
              <Card.Subtitle>Track medicines taken</Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4 text-center">
        <Col>
          <Button
            variant="primary"
            className="m-2"
            onClick={() => navigate("/predict")}
          >
            Go to Prediction
          </Button>

          <Button
            variant="danger"
            className="m-2"
            onClick={() => navigate("/blooddonor")}
          >
            Add Blood Donor
          </Button>

          <Button
            variant="dark"
            className="m-2"
            onClick={() => navigate("/history")}
          >
            Medicine History
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;