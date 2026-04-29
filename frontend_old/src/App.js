import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import QRScanner from "./components/QRScanner";
import MoodDetection from "./components/MoodDetection";
import OverdoseControl from "./components/OverdoseControl";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/qr" element={<QRScanner />} />
          <Route path="/mood" element={<MoodDetection />} />
          <Route path="/overdose" element={<OverdoseControl />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
