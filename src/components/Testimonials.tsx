const TESTIMONIALS = [
  {
    quote:
      "Mi sono avvicinata alla danza da adulta e ho trovato un ambiente accogliente. Ogni lezione mi fa sentire più sicura e libera di esprimermi.",
    name: "Lucia M.",
    course: "Contemporary · 2° anno",
  },
  {
    quote:
      "Le lezioni sono curate e coinvolgenti: ho migliorato tecnica e musicalità senza perdere il piacere di ballare.",
    name: "Marco T.",
    course: "Hip-hop · 1° anno",
  },
  {
    quote:
      "La cosa più bella è la community. Ci sosteniamo e cresciamo insieme, dentro e fuori dalla sala.",
    name: "Sara P.",
    course: "Heels · 3° anno",
  },
] as const;

/**
 * Mostra le testimonianze degli allievi e i corsi che frequentano.
 *
 * @returns {import("react").ReactElement} Una griglia con tre testimonianze.
 */
function Testimonials() {
  return (
    <section
      className="testimonials-section"
      aria-labelledby="testimonials-section-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-eyebrow">Parole dalla community</p>
          <h2 id="testimonials-section-title">Dicono di noi</h2>
        </div>
        <p className="section-description">
          Ogni percorso è diverso: queste sono alcune voci dei nostri allievi.
        </p>
      </div>

      <div className="testimonials-section__grid">
        {TESTIMONIALS.map((testimonial) => (
          <figure className="page-card testimonial-card" key={testimonial.name}>
            <blockquote className="testimonial-card__quote">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="testimonial-card__byline">
              <cite>{testimonial.name}</cite>
              <span>{testimonial.course}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
