/**
 * @file Navbar.tsx
 * @description Barra di navigazione condivisa con link alle pagine Dance Hub.
 * @author Giulia
 * @created Novembre 2026
 */

import { useLayoutEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";

type RouteHistory = {
  keys: string[];
  index: number;
};

/**
 * Mostra il marchio e i collegamenti alle pagine principali di Dance Hub.
 *
 * @returns {import("react").ReactElement} La navigazione condivisa del sito.
 */
function Navbar() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const [routeHistory, setRouteHistory] = useState<RouteHistory>(() => ({
    keys: [location.key],
    index: 0,
  }));
  const routeHistoryRef = useRef(routeHistory);

  useLayoutEffect(() => {
    const currentHistory = routeHistoryRef.current;

    if (currentHistory.keys[currentHistory.index] === location.key) {
      return;
    }

    let nextHistory: RouteHistory;
    if (navigationType === "PUSH") {
      nextHistory = {
        keys: [
          ...currentHistory.keys.slice(0, currentHistory.index + 1),
          location.key,
        ],
        index: currentHistory.index + 1,
      };
    } else if (navigationType === "REPLACE") {
      const keys = [...currentHistory.keys];
      keys[currentHistory.index] = location.key;
      nextHistory = { keys, index: currentHistory.index };
    } else {
      const previousIndex = currentHistory.keys.indexOf(location.key);
      nextHistory =
        previousIndex >= 0
          ? { ...currentHistory, index: previousIndex }
          : { keys: [location.key], index: 0 };
    }

    routeHistoryRef.current = nextHistory;
    setRouteHistory(nextHistory);
  }, [location.key, navigationType]);

  return (
    <header className="global-navbar">
      <Link className="brand" to="/" aria-label="Dance Hub, pagina iniziale">
        <span className="brand__mark" aria-hidden="true">
          D
        </span>
        <span>
          dance<span className="brand__accent">hub</span>
        </span>
      </Link>

      <nav className="global-navbar__links" aria-label="Navigazione principale">
        <Link to="/corsi">Corsi e prenotazioni</Link>
        <Link to="/storia">La storia</Link>
        <Link to="/contatti">Contatti</Link>
        <Link to="/lavora-con-noi">Lavora con noi</Link>
      </nav>

      <nav className="history-navigation" aria-label="Navigazione cronologica">
        <button
          className="history-navigation__button"
          type="button"
          aria-label="Torna alla pagina precedente"
          title="Pagina precedente"
          disabled={routeHistory.index === 0}
          onClick={() => navigate(-1)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </button>
        <button
          className="history-navigation__button"
          type="button"
          aria-label="Vai alla pagina successiva"
          title="Pagina successiva"
          disabled={routeHistory.index >= routeHistory.keys.length - 1}
          onClick={() => navigate(1)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
