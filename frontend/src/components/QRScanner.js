import React, { useRef, useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import { Html5Qrcode } from "html5-qrcode";

function QRScanner() {
  const html5QrCodeRef = useRef(null);

  const [scanResult, setScanResult] = useState("");
  const [message, setMessage] = useState("");
  const [patient, setPatient] = useState(null);
  const [cameraRunning, setCameraRunning] = useState(false);

  const fetchPatient = async (decodedText) => {
    try {
      const res = await fetch("http://127.0.0.1:4000/patient_from_qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ qr_text: decodedText })
      });

      const data = await res.json();

      if (res.ok) {
        setPatient(data);
      } else {
        setPatient(null);
        setMessage(data.error || "Patient not found");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to fetch patient details");
    }
  };

  const startCamera = async () => {
    try {
      setMessage("");
      setScanResult("");
      setPatient(null);

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("reader");
      }

      const html5QrCode = html5QrCodeRef.current;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        async (decodedText) => {
          setScanResult(decodedText);
          setMessage("✅ QR scanned successfully");
          await fetchPatient(decodedText);
          await stopCamera();
        },
        () => {}
      );

      setCameraRunning(true);
    } catch (error) {
      console.error(error);
      setMessage("❌ Unable to access camera");
    }
  };

  const stopCamera = async () => {
    try {
      if (html5QrCodeRef.current && cameraRunning) {
        await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
        setCameraRunning(false);
      }
    } catch (error) {
      console.error("Stop camera error:", error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setMessage("");
      setScanResult("");
      setPatient(null);

      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("reader");
      }

      const decodedText = await html5QrCodeRef.current.scanFile(file, true);

      setScanResult(decodedText);
      setMessage("✅ QR scanned from uploaded image");
      await fetchPatient(decodedText);
    } catch (error) {
      console.error(error);
      setMessage("❌ No QR code found in image");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h2 className="text-center mb-4">Patient QR Scanner</h2>

        <div className="text-center mb-3">
          <Button variant="success" className="me-2" onClick={startCamera}>
            Open Camera
          </Button>

          <Button variant="secondary" onClick={stopCamera}>
            Stop Camera
          </Button>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Upload QR Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </Form.Group>

        <div
          id="reader"
          style={{
            width: "100%",
            maxWidth: "400px",
            margin: "20px auto"
          }}
        ></div>

        {message && (
          <Alert variant={message.includes("✅") ? "success" : "danger"}>
            {message}
          </Alert>
        )}

        {scanResult && (
          <Card className="mt-3 p-3 bg-light">
            <h5>Scanned QR Result:</h5>
            <p>{scanResult}</p>
          </Card>
        )}

        {patient && (
          <Card className="mt-4 p-4 shadow-sm">
            <h3 className="text-center mb-3">Patient Details</h3>
            <p><strong>ID:</strong> {patient.patientId}</p>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Blood Group:</strong> {patient.blood_group}</p>
            <p><strong>Disease:</strong> {patient.disease}</p>
            <p><strong>Medicine:</strong> {patient.medicine}</p>
            <p><strong>Dosage:</strong> {patient.dosage}</p>
          </Card>
        )}
      </Card>
    </Container>
  );
}

export default QRScanner;