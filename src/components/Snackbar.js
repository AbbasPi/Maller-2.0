import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

const Snackbar = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const snackbarRoot = document.getElementById("snackbar");
    snackbarRoot.appendChild(elRef.current);
    return () => snackbarRoot.removeChild(elRef.current);
  }, []);
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Snackbar;
