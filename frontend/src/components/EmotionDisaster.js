import React, { useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
function EmotionDisaster() {
  const [status, setStatus] = useState("Not Connected");
  const [mood, setMood] = useState("Unknown");
  const [patientId, setPatientId] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [message, setMessage] = useState("");
  const [doctorStatus, setDoctorStatus] = useState("");
  const connectBluetooth = () => {
    setStatus("Connected to Device");
    setMood("Happy 😊");
    setHeartRate(115);
    setOxygen(88);
    setMessage("Vitals received from Bluetooth device");
  };
   const sendVerification = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4000/doctor_verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          patient_id: patientId,
          heart_rate: heartRate,
          oxygen: oxygen
        })
      });

      const data = await res.json();

      if (res.ok) {
        setDoctorStatus(data.message);
      } else {
        setDoctorStatus(data.error || "Verification failed");
      }
    } catch (error) {
      console.error(error);
      setDoctorStatus("❌ Failed to contact backend");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4 text-center">
        <h3>Emotion + Disaster Monitoring</h3>

        <p>Status: <strong>{status}</strong></p>
        <p>Emotion: <strong>{mood}</strong></p>

        <hr />

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Patient ID</Form.Label>
            <Form.Control
              type="number"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient ID"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Heart Rate</Form.Label>
            <Form.Control
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Oxygen Level</Form.Label>
            <Form.Control
              type="number"
              value={oxygen}
              onChange={(e) => setOxygen(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" className="m-2" onClick={connectBluetooth}>
            Connect Bluetooth
          </Button>

          <Button variant="danger" className="m-2" onClick={sendVerification}>
            Send to Doctor
          </Button>
        </Form>

        {message && <Alert variant="info" className="mt-3">{message}</Alert>}
        {doctorStatus && <Alert variant="warning" className="mt-3">{doctorStatus}</Alert>}
      </Card>
    </Container>
  );
}

export default EmotionDisaster;