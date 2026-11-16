import { Link } from "react-router-dom";

const EVENTS = [
  {
    date: "2026-12-13",
    dateLabel: "13 dicembre 2026",
    title: "Stage speciale di Contemporary",
    description:
      "Una giornata dedicata al movimento e alla ricerca espressiva, con un'ospite speciale del panorama contemporaneo.",
  },
  {
    date: "2027-02-07",
    dateLabel: "7 febbraio 2027",
    title: "Open day Dance Hub",
    description:
      "Vieni a conoscere la scuola, incontra gli insegnanti e prova una selezione di lezioni aperte a tutti.",
  },
  {
    date: "2027-06-12",
    dateLabel: "12 giugno 2027",
    title: "Saggio di fine anno",
    description:
      "Una serata per celebrare il percorso dei nostri allievi e condividere con il pubblico la passione per la danza.",
  },
] as const;

/**
 * Mostra le ultime notizie e gli eventi in programma della scuola.
 *
 * @returns {import("react").ReactElement} Una sezione con le card degli eventi.
 */
function EventsSection() {
  return (
    <section className="events-section" aria-labelledby="events-section-title">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow">Da segnare in agenda</p>
          <h2 id="events-section-title">Eventi e novità</h2>
        </div>
        <p className="section-description">
          Incontri, stage e occasioni per vivere la danza anche fuori dalle lezioni.
        </p>
      </div>

      <div className="events-section__grid">
        {EVENTS.map((event) => (
          <article className="page-card events-card" key={event.title}>
            <time className="events-card__date" dateTime={event.date}>
              {event.dateLabel}
            </time>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <Link
              className="button button--primary events-card__link"
              to="/contatti"
              aria-label={`Scopri di più: ${event.title}`}
            >
              Scopri di più <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EventsSection;
