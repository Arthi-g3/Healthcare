import React, { useState } from "react";

function MoodDetection() {
  const [status, setStatus] = useState("Not Connected");
  const [mood, setMood] = useState("Unknown");

  const connectBluetooth = () => {
    setStatus("Connected to Device");
    setMood("Happy 😊"); // Demo value
  };

  return (
    <div className="card">
      <h2>Mood Detection (Bluetooth)</h2>
      <p>Status: {status}</p>
      <p>Detected Mood: {mood}</p>

      <button onClick={connectBluetooth}>
        Connect Bluetooth Device
      </button>
    </div>
  );
}

export default MoodDetection;
