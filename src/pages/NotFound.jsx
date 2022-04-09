import React from "react";
import "../styles/NotFound.css";

export const NotFound = () => {
  return (
    <div className="error_container">
      <div>
        <h1 className="error_code">404</h1>
        <div className="message_container">
          <h2 className="message_text">This page could not be found</h2>
        </div>
      </div>
    </div>
  );
};
