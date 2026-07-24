import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollManager from "./components/ScrollManager";
import "./styles.css";

const container = document.getElementById("root")!;

const tree = (
  <React.StrictMode>
    {/* The v7 future flags are gone: their behaviour is the default now. */}
    <BrowserRouter>
      <ScrollManager />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// A production build ships prerendered markup for every published route, so
// the usual path is hydration. `vite dev` serves the bare shell, and so does
// any URL the prerender did not cover; both fall back to a client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
