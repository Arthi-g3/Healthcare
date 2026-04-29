import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Dashboard</Link>
      <Link to="/qr">QR Scanner</Link>
      <Link to="/mood">Mood Detection</Link>
      <Link to="/overdose">Overdose Control</Link>
    </div>
  );
}

export default Navbar;
