import React, { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ children, className }) {
  const el = document.createElement("div");
  const portal = document.getElementById("portal");

  useEffect(() => {
    portal.appendChild(el);
    return () => {
      portal.removeChild(el);
    };
  }, [el, portal]);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 bg-gray-600 bg-opacity-70 backdrop-filter backdrop-blur-sm ${className}`}
    >
      {children}
    </div>,
    el
  );
}

export default Modal;
