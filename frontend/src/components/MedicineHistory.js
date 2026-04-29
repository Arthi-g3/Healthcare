import React, { useState } from "react";
import { Container, Card, Form, Button, Table, Badge } from "react-bootstrap";
function MedicineHistory() {
  const [patientId, setPatientId] = useState("");
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [alertShown, setAlertShown] = useState(false);
  const loadHistory = async () => {
    try {
      setAlertShown(false);

      const res = await fetch(`http://127.0.0.1:4000/medicine_history/${patientId}`);
      const data = await res.json();

      if (res.ok) {
        setHistory(data);
        setMessage(data.length === 0 ? "No medicine history found" : "");

        const hasHighRisk = data.some((item) => item.dosage > 700);
        if (hasHighRisk && !alertShown) {
          alert("⚠ High Risk Medicine Detected!");
          setAlertShown(true);
        }
      } else {
        setMessage(data.error || "Failed to load history");
        setHistory([]);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to connect to backend");
      setHistory([]);
    }
  };

  const getRisk = (dosage) => {
    if (dosage > 700) {
      return { text: "High Risk", color: "danger" };
    } else if (dosage > 400) {
      return { text: "Medium Risk", color: "warning" };
    } else {
      return { text: "Safe", color: "success" };
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Medicine History</h2>

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

          <Button variant="dark" onClick={loadHistory}>
            View History
          </Button>
        </Form>

        {message && <h5 className="mt-3 text-center">{message}</h5>}

        <hr className="my-4" />

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient ID</th>
              <th>Medicine Name</th>
              <th>Dosage</th>
              <th>Time Taken</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((item) => {
                const risk = getRisk(item.dosage);

                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.patient_id}</td>
                    <td>{item.medicine_name}</td>
                    <td>{item.dosage}</td>
                    <td>{item.time_taken}</td>
                    <td>
                      <Badge bg={risk.color}>{risk.text}</Badge>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No records
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default MedicineHistory;