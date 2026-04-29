import React, { useState } from "react";

function OverdoseControl() {
  const [level, setLevel] = useState(0);

  const increaseDose = () => {
    const newLevel = level + 10;
    setLevel(newLevel);

    if (newLevel >= 100) {
      alert("⚠ Warning! Overdose Risk Detected!");
    }
  };

  return (
    <div className="card">
      <h2>Overdose Control Monitoring</h2>
      <p>Medicine Level: {level}%</p>

      <button onClick={increaseDose}>
        Increase Dose
      </button>
    </div>
  );
}

export default OverdoseControl;
