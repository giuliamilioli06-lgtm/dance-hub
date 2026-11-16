import "./Welcome.css";

/**
 * Mostra il messaggio di benvenuto e introduce Dance Hub.
 *
 * @returns {import("react").ReactElement} Il contenuto della schermata iniziale.
 */
function Welcome() {
  return (
    <section className="welcome" aria-labelledby="welcome-title">
      <p className="welcome__eyebrow">Danza, community e movimento</p>
      <h1 id="welcome-title">
        Trova il tuo <span>prossimo ritmo.</span>
      </h1>
      <p>
        Scopri nuovi stili, incontra insegnanti appassionati e trova il corso
        giusto per te. Il prossimo passo inizia qui.
      </p>
    </section>
  );
}

export default Welcome;
