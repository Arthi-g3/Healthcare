import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QRScanner() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        alert("QR Code Scanned: " + decodedText);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="card">
      <h2>QR Code Scanner</h2>
      <div id="reader" style={{ width: "300px" }}></div>
    </div>
  );
}

export default QRScanner;
