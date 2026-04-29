import React, { useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";

function Predict() {
  const [formData, setFormData] = useState({
    Age: "",
    Weight: "",
    HeartRate: "",
    Oxygen: "",
    Medicine: "",
    Dosage_mg: "",
    Max_Dosage_mg: "",
    Times_Per_Day: ""
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePredict = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setResult(data.result);

    } catch (error) {
      console.error(error);
      setResult("❌ Server Error");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h3 className="text-center mb-3">Medical Risk Prediction</h3>

        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control name="Age" type="number" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control name="Weight" type="number" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Heart Rate (BPM)</Form.Label>
            <Form.Control name="HeartRate" type="number" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Oxygen Level (%)</Form.Label>
            <Form.Control name="Oxygen" type="number" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Medicine</Form.Label>
            <Form.Select name="Medicine" onChange={handleChange}>
              <option value="">Select Medicine</option>
              <option value="0">Paracetamol</option>
              <option value="1">Ibuprofen</option>
              <option value="2">Amoxicillin</option>
              <option value="3">Aspirin</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dosage (mg)</Form.Label>
            <Form.Control name="Dosage_mg" type="number" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Dosage (mg)</Form.Label>
            <Form.Control name="Max_Dosage_mg" type="number" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Times Per Day</Form.Label>
            <Form.Control name="Times_Per_Day" type="number" onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" onClick={handlePredict}>
            Predict Risk
          </Button>

        </Form>

        {result && (
          <h4 className="mt-3 text-center">{result}</h4>
        )}
      </Card>
    </Container>
  );
}

export default Predict;