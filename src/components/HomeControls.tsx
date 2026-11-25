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
}

const QUICK_FILTERS: CategoryFilter[] = [
  "Tutti",
  "Classico",
  "Modern",
  "Contemporaneo",
  "Hip-hop",
  "Heels",
  "Musical",
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
}: HomeControlsProps) {
  return (
    <div className="home-controls">
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
