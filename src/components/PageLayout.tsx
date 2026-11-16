import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

/**
 * Fornisce un contenitore e un footer condivisi alle pagine informative.
 *
 * @param {PageLayoutProps} props - Contenuto della pagina.
 * @returns {import("react").ReactElement} Struttura comune delle pagine.
 */
function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="page-shell">
      {children}

      <footer className="page-footer">
        <span>Dance Hub · Danza, community e movimento.</span>
        <Link to="/corsi">Torna ai corsi</Link>
      </footer>
    </div>
  );
}

export default PageLayout;
