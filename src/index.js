import React from "react";
import ReactDOM from "react-dom/client";
ReactModal.setAppElement("#root");
import "./index.css";
import App from "./components/App";
import ReactModal from "react-modal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
