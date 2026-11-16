import PageLayout from "../components/PageLayout";

/**
 * Mostra i canali di contatto e le informazioni sulla sede della scuola.
 *
 * @returns {import("react").ReactElement} La pagina contatti Dance Hub.
 */
function Contact() {
  return (
    <PageLayout>
      <main className="content-page">
        <section className="content-page__hero">
          <p className="section-eyebrow">Parliamone</p>
          <h1>Hai una domanda? Siamo qui.</h1>
          <p>
            Scrivici per conoscere i corsi, trovare il livello giusto o
            organizzare una visita in studio.
          </p>
        </section>

        <section className="content-page__grid" aria-label="Informazioni di contatto">
          <article className="page-card">
            <span className="page-card__number">01</span>
            <h2>Scrivici</h2>
            <p>
              <a className="page-card__link" href="mailto:ciao@dancehub.example">
                ciao@dancehub.example
              </a>
            </p>
            <p className="page-card__note">
              Recapito dimostrativo: sostituiscilo con l'indirizzo email della
              scuola prima della pubblicazione.
            </p>
          </article>
          <article className="page-card">
            <span className="page-card__number">02</span>
            <h2>Dove siamo</h2>
            <p>La sede dello studio è in aggiornamento.</p>
            <p className="page-card__note">
              Contattaci per ricevere l'indirizzo e le indicazioni. Aggiungi qui
              la mappa quando la sede sarà definita.
            </p>
          </article>
        </section>

        <section className="content-page__statement">
          <p className="section-eyebrow">Vieni a trovarci</p>
          <h2>Il primo passo può essere una semplice domanda.</h2>
          <a className="button button--primary" href="mailto:ciao@dancehub.example">
            Scrivici <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
    </PageLayout>
  );
}

export default Contact;
