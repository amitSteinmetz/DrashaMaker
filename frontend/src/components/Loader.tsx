import React from "react";
import { Spinner } from "react-bootstrap";
import { DEFAULT_LOADER_MESSAGE, SPINNER_SIZE } from "../constants/appConstants";

interface LoaderProps {
  message?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  message = DEFAULT_LOADER_MESSAGE,
  className = ""
}) => {
  return (
    <div className={`loader-container ${className}`}>
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        style={{ width: SPINNER_SIZE.WIDTH, height: SPINNER_SIZE.HEIGHT }}
      >
        <span className="visually-hidden">{DEFAULT_LOADER_MESSAGE}</span>
      </Spinner>
      {message && (
        <div className="loader-message">{message}</div>
      )}
    </div>
  );
};

export default React.memo(Loader);
