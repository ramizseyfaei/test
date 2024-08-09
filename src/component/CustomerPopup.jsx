// ConfirmationPopup.js
import React from "react";
import "./CustomerPopup.css";

const ConfirmationPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmation-popup">
      <div className="popup-content">
        <p>Are you sure to delete this record?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
