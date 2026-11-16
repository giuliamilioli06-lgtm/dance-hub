/**
 * @file main.tsx
 * @description Inizializza React e monta l'applicazione Dance Hub nella pagina.
 * @author Giulia
 * @created Novembre 2026
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
