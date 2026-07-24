import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollManager from "./components/ScrollManager";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* The v7 future flags are gone: their behaviour is the default now. */}
    <BrowserRouter>
      <ScrollManager />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
