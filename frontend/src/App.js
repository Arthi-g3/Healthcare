import React from "react";
import { Routes, Route } from "react-router-dom";

import CustomNavbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import QRScanner from "./components/QRScanner";
import OverdoseControl from "./components/OverdoseControl";
import Predict from "./components/Predict";
import BloodDonor from "./components/BloodDonor";
import MedicineHistory from "./components/MedicineHistory";
import EmotionDisaster from "./components/EmotionDisaster";


function App() {
  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/qr" element={<QRScanner />} />
        <Route path="/overdose" element={<OverdoseControl />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/blooddonor" element={<BloodDonor />} />
        <Route path="/history" element={<MedicineHistory />} />
        <Route path="/emotion" element={<EmotionDisaster />} />
      </Routes>
    </>
  );
}

export default App;