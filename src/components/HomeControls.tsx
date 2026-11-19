/**
 * @file HomeControls.tsx
 * @description Gestisce i filtri rapidi, la vista e il tema del catalogo.
 * @author Giulia
 * @created Novembre 2026
 */

import type { CourseCategory } from "../types";

type CategoryFilter = CourseCategory | "Tutti";

interface HomeControlsProps {
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  view: "student" | "teacher";
  onViewChange: (view: "student" | "teacher") => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

const QUICK_FILTERS: CategoryFilter[] = [
  "Tutti",
  "Hip-hop",
  "Contemporary",
  "Master",
  "Heels",
];

/**
 * Mostra il logo, la navigazione principale e i filtri rapidi per disciplina.
 *
 * @param {NavbarProps} props - Filtro attivo e callback per cambiarlo.
 * @returns {import("react").ReactElement} Controlli rapidi del catalogo.
 */
function HomeControls({
  selectedCategory,
  onCategoryChange,
  view,
  onViewChange,
  theme,
  onThemeToggle,
}: HomeControlsProps) {
  return (
    <div className="home-controls">
      <div className="site-header__actions">
        <div className="role-switch" aria-label="Seleziona la vista">
          <button
            type="button"
            aria-pressed={view === "student"}
            onClick={() => onViewChange("student")}
          >
            Allievi
          </button>
          <button
            type="button"
            aria-pressed={view === "teacher"}
            onClick={() => onViewChange("teacher")}
          >
            Insegnante
          </button>
        </div>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Attiva il tema ${theme === "light" ? "scuro" : "chiaro"}`}
          onClick={onThemeToggle}
        >
          <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
          <span>{theme === "light" ? "Dark" : "Light"}</span>
        </button>
      </div>

      <nav
        className="navbar-quick-filters"
        aria-label="Filtri rapidi per disciplina"
      >
        {QUICK_FILTERS.map((category) => (
          <button
            aria-current={selectedCategory === category ? "true" : undefined}
            className="navbar-quick-filters__link"
            key={category}
            onClick={() => {
              onCategoryChange(category);
              document.getElementById("courses")?.scrollIntoView({
                block: "start",
              });
            }}
            type="button"
          >
            {category === "Tutti" ? "Tutte le discipline" : category}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default HomeControls;
