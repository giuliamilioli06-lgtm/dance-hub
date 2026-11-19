/**
 * @file App.tsx
 * @description Componente principale con la configurazione delle rotte di React Router.
 * @author Giulia
 * @created Novembre 2026
 */

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import History from "./pages/History";
import Home from "./pages/Home";
import LandingHome from "./pages/LandingHome";
import NotFoundPage from "./pages/NotFoundPage";

/**
 * Seleziona la pagina da mostrare in base all'indirizzo visitato.
 *
 * @returns {import("react").ReactElement} Il router principale di Dance Hub.
 */
function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [view, setView] = useState<"student" | "teacher">("student");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <Navbar
        view={view}
        theme={theme}
        onViewChange={setView}
        onThemeToggle={() =>
          setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light",
          )
        }
      />
      <Routes>
        <Route path="/" element={<LandingHome />} />
        <Route
          path="/corsi"
          element={
            <Home
              view={view}
            />
          }
        />
        <Route path="/storia" element={<History />} />
        <Route path="/contatti" element={<Contact />} />
        <Route path="/lavora-con-noi" element={<Careers />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
