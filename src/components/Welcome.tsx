import "./Welcome.css";

function Welcome() {
  return (
    <section className="welcome" aria-labelledby="welcome-title">
      <p className="welcome__eyebrow">Il tuo spazio per la danza</p>
      <h1 id="welcome-title">Benvenuto su Dance Hub</h1>
      <p>
        La struttura iniziale è pronta. Da qui potrai aggiungere pagine,
        componenti e funzionalità per la community.
      </p>
    </section>
  );
}

export default Welcome;
