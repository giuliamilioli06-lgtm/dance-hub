const INSTRUCTORS = [
  {
    initials: "SA",
    name: "Sandro",
    role: "Hip-hop e performance",
    description:
      "Porta energia e precisione in sala, dalle basi del freestyle alle masterclass avanzate.",
    style: "sandro",
  },
  {
    initials: "GI",
    name: "Giulia",
    role: "Contemporary e heels",
    description:
      "Ti accompagna a esplorare movimento, musicalità ed espressività con attenzione alla tecnica.",
    style: "giulia",
  },
  {
    initials: "MA",
    name: "Matteo",
    role: "Hip-hop e foundations",
    description:
      "Costruisce solide basi di groove e coordinazione, con lezioni aperte a ogni livello.",
    style: "matteo",
  },
] as const;

/**
 * Presenta i tre insegnanti del catalogo corsi.
 *
 * @returns {import("react").ReactElement} Una griglia con i profili dei docenti.
 */
function InstructorsSection() {
  return (
    <section
      className="instructors-section"
      aria-labelledby="instructors-section-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-eyebrow">Le persone dietro ogni lezione</p>
          <h2 id="instructors-section-title">I nostri insegnanti</h2>
        </div>
        <p className="section-description">
          Tre insegnanti, tre percorsi, una passione condivisa per la danza.
        </p>
      </div>

      <div className="instructors-section__grid">
        {INSTRUCTORS.map((instructor) => (
          <article
            className="page-card instructor-profile"
            key={instructor.name}
          >
            <span
              className={`instructor-profile__avatar instructor-profile__avatar--${instructor.style}`}
              aria-hidden="true"
            >
              {instructor.initials}
            </span>
            <div className="instructor-profile__details">
              <h3>{instructor.name}</h3>
              <p className="instructor-profile__role">{instructor.role}</p>
            </div>
            <p>{instructor.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default InstructorsSection;
