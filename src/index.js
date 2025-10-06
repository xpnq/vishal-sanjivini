// index.jsx or index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";

// Make sure your HTML has <div id="root"></div>
const container = document.getElementById("root");
if (!container) throw new Error("No root element found");

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
