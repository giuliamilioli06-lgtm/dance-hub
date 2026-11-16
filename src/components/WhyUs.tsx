const STRENGTHS = [
  {
    icon: "🩰",
    title: "Maestri qualificati",
    description:
      "Insegnanti esperti e appassionati ti guidano con cura. Cresci al tuo ritmo e porta la tua tecnica al livello successivo.",
  },
  {
    icon: "🪞",
    title: "Sale attrezzate",
    description:
      "Spazi luminosi, pavimenti adatti alla danza e attrezzature professionali. Tutto quello che serve per muoverti al meglio.",
  },
  {
    icon: "🤝",
    title: "Comunità e passione",
    description:
      "Qui la danza è anche incontro, energia e condivisione. Trova la tua community e lasciati ispirare a ogni lezione.",
  },
] as const;

/**
 * Presenta i punti di forza della scuola di danza.
 *
 * @returns {import("react").ReactElement} Una griglia con tre punti di forza.
 */
function WhyUs() {
  return (
    <section className="why-us" aria-labelledby="why-us-title">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow">Perché Dance Hub</p>
          <h2 id="why-us-title">I nostri punti di forza</h2>
        </div>
        <p className="section-description">
          Un ambiente pensato per accompagnarti in ogni passo del tuo percorso.
        </p>
      </div>

      <div className="why-us__grid">
        {STRENGTHS.map((strength) => (
          <article className="page-card why-us__card" key={strength.title}>
            <span className="why-us__icon" aria-hidden="true">
              {strength.icon}
            </span>
            <h3>{strength.title}</h3>
            <p>{strength.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WhyUs;
