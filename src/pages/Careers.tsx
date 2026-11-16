import { useState } from "react";
import type { FormEvent } from "react";
import PageLayout from "../components/PageLayout";

/**
 * Raccoglie i dati di una candidatura e ne segnala il carattere dimostrativo.
 *
 * @returns {import("react").ReactElement} La pagina Lavora con noi e il form.
 */
function Careers() {
  const [submitted, setSubmitted] = useState(false);

  /**
   * Gestisce localmente il form senza inviare dati a un server.
   *
   * @param {FormEvent<HTMLFormElement>} event - Evento di invio del form.
   * @returns {void} Mostra una nota sul backend non ancora configurato.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <PageLayout>
      <main className="content-page">
        <section className="content-page__hero">
          <p className="section-eyebrow">Lavora con noi</p>
          <h1>Porta il tuo talento in sala.</h1>
          <p>
            Cerchiamo persone curiose e appassionate che vogliano far crescere
            la community, dentro e fuori dalla pista.
          </p>
        </section>

        <section className="content-page__form-section">
          <div className="content-page__form-intro">
            <p className="section-eyebrow">Candidati</p>
            <h2>Raccontaci di te</h2>
            <p>
              Insegnanti, performer e persone che amano creare spazi accoglienti
              sono sempre benvenuti.
            </p>
          </div>

          <form className="career-form" onSubmit={handleSubmit}>
            <div className="career-form__grid">
              <label>
                Nome e cognome
                <input autoComplete="name" name="name" required />
              </label>
              <label>
                Email
                <input autoComplete="email" name="email" required type="email" />
              </label>
            </div>
            <label>
              Area di interesse
              <select name="interest" required defaultValue="">
                <option disabled value="">
                  Seleziona un'area
                </option>
                <option value="insegnamento">Insegnamento</option>
                <option value="performer">Performance e progetti artistici</option>
                <option value="organizzazione">Organizzazione e accoglienza</option>
                <option value="altro">Altro</option>
              </select>
            </label>
            <label>
              Presentati e raccontaci la tua esperienza
              <textarea
                name="message"
                required
                rows={5}
                minLength={20}
                placeholder="Qual è il tuo percorso? Cosa ti piacerebbe portare in Dance Hub?"
              />
            </label>
            <button className="button button--primary" type="submit">
              Invia la candidatura
            </button>
            {submitted && (
              <p className="form-notice" role="status">
                Questa è una demo: i dati non sono stati inviati. Per ricevere
                candidature è necessario collegare il form a un servizio o a un
                backend.
              </p>
            )}
          </form>
        </section>
      </main>
    </PageLayout>
  );
}

export default Careers;
