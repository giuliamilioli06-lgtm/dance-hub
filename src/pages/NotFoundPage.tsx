import { Link } from "react-router-dom";

/**
 * Mostra una pagina di errore per gli indirizzi non gestiti dal router.
 *
 * @returns {import("react").ReactElement} La pagina 404 con un collegamento alla home.
 */
function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__content">
        <span className="not-found-page__code" aria-hidden="true">
          404
        </span>
        <h1>Questa pista non esiste.</h1>
        <p>
          La pagina che cerchi non è disponibile o è stata spostata. Torna alla
          home e riparti da lì.
        </p>
        <Link className="button button--primary" to="/">
          Torna alla home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
