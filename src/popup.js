// Popup.jsx
import React, { useEffect } from "react";
import "./styles/popup.css";

const Popup = ({ message, type = "success", onClose }) => {
  return (
    <div className="popup-overlay">
      <div className={`popup-box ${type}`}>

        <div className="popup-icon">
          {type === "success" ? "✅" : "❌"}
        </div>

        <p className="popup-message">{message}</p>

        <button className="popup-ok" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
