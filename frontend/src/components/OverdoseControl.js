import React, { useState } from "react";
import { Container, Card, Form, Button, Alert, ProgressBar, Row, Col } from "react-bootstrap";

function OverdoseControl() {
  const [patientName, setPatientName] = useState("");
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [maxDosage, setMaxDosage] = useState("");
  const [timesPerDay, setTimesPerDay] = useState("");
  const [risk, setRisk] = useState(null);
  const [status, setStatus] = useState("");
  const [advice, setAdvice] = useState("");

  const checkRisk = () => {
    const d = Number(dosage);
    const m = Number(maxDosage);
    const t = Number(timesPerDay);

    if (!patientName || !medicine || !d || !m || !t) {
      setStatus("Please fill all fields");
      setAdvice("Enter all patient details before checking.");
      setRisk(null);
      return;
    }

    if (d > m || t >= 4) {
      setRisk(95);
      setStatus("High Risk");
      setAdvice("Stop taking extra dose and contact doctor immediately.");
    } else if (d >= m * 0.7 || t === 3) {
      setRisk(60);
      setStatus("Moderate Risk");
      setAdvice("Be careful. Follow the doctor’s prescribed dosage.");
    } else {
      setRisk(20);
      setStatus("Safe");
      setAdvice("Dosage appears normal. Continue as prescribed.");
    }
  };

  const resetForm = () => {
    setPatientName("");
    setMedicine("");
    setDosage("");
    setMaxDosage("");
    setTimesPerDay("");
    setRisk(null);
    setStatus("");
    setAdvice("");
  };

  const getVariant = () => {
    if (risk >= 85) return "danger";
    if (risk >= 50) return "warning";
    return "success";
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4 border-0">
        <h2 className="text-center mb-4">Overdose Control Monitoring</h2>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Medicine Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter medicine name"
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Dosage Taken (mg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example: 500"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Maximum Safe Dosage (mg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example: 1000"
                value={maxDosage}
                onChange={(e) => setMaxDosage(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Times Taken Today</Form.Label>
              <Form.Control
                type="number"
                placeholder="Example: 2"
                value={timesPerDay}
                onChange={(e) => setTimesPerDay(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-3">
          <Button variant="primary" className="m-2" onClick={checkRisk}>
            Check Overdose Risk
          </Button>

          <Button variant="secondary" className="m-2" onClick={resetForm}>
            Reset
          </Button>
        </div>

        {risk !== null && (
          <>
            <Card className="shadow-sm border-0 bg-light mt-4 p-3 text-center">
              <h4>{patientName}</h4>
              <p className="mb-1"><strong>Medicine:</strong> {medicine}</p>
              <p className="mb-1"><strong>Status:</strong> {status}</p>
            </Card>

            <ProgressBar
              now={risk}
              label={`${risk}%`}
              variant={getVariant()}
              style={{ height: "30px", fontSize: "16px" }}
              className="mt-4"
            />

            <Alert variant={getVariant()} className="text-center mt-4 fs-5">
              {advice}
            </Alert>
          </>
        )}
      </Card>
    </Container>
  );
}

export default OverdoseControl;