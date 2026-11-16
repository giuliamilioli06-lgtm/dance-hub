import { Link } from "react-router-dom";

/**
 * Invita a contattare la scuola per iniziare una lezione di prova.
 *
 * @returns {import("react").ReactElement} Il banner conclusivo della home.
 */
function CallToAction() {
  return (
    <section className="call-to-action" aria-labelledby="call-to-action-title">
      <div className="call-to-action__content">
        <p className="call-to-action__eyebrow">Il tuo prossimo passo</p>
        <h2 id="call-to-action-title">Pronta a salire sul palco con noi?</h2>
        <p className="call-to-action__description">
          Prenota una lezione di prova e scopri il corso più adatto a te. Ti
          aspettiamo in sala.
        </p>
      </div>
      <Link className="call-to-action__button" to="/contatti">
        Contattaci <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default CallToAction;
