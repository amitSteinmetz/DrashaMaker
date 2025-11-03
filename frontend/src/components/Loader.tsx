import React from "react";
import { Spinner } from "react-bootstrap";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "טוען..." }) => {
  return (
    <div className="text-center my-5 loader-container">
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">טוען...</span>
      </Spinner>
      {message && (
        <div className="mt-3 text-muted fs-5 fw-semibold">{message}</div>
      )}
    </div>
  );
};

export default Loader;
