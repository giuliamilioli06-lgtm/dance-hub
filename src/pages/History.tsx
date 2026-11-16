import PageLayout from "../components/PageLayout";

/**
 * Racconta la visione e i valori della community Dance Hub.
 *
 * @returns {import("react").ReactElement} La pagina dedicata alla storia della scuola.
 */
function History() {
  return (
    <PageLayout>
      <main className="content-page">
        <section className="content-page__hero">
          <p className="section-eyebrow">La nostra storia</p>
          <h1>Un luogo dove ogni movimento trova spazio.</h1>
          <p>
            Dance Hub nasce dall'idea che la danza sia più di una tecnica:
            è un modo per esprimersi, incontrarsi e crescere insieme.
          </p>
        </section>

        <section className="content-page__grid" aria-label="La filosofia Dance Hub">
          <article className="page-card">
            <span className="page-card__number">01</span>
            <h2>Libertà di esprimersi</h2>
            <p>
              Ogni stile è un linguaggio. Accogliamo percorsi diversi e
              incoraggiamo ciascuno a trovare il proprio modo di muoversi.
            </p>
          </article>
          <article className="page-card">
            <span className="page-card__number">02</span>
            <h2>Una community aperta</h2>
            <p>
              La sala è uno spazio condiviso: impariamo gli uni dagli altri,
              celebriamo i progressi e ci sosteniamo a ogni livello.
            </p>
          </article>
          <article className="page-card">
            <span className="page-card__number">03</span>
            <h2>Ricerca continua</h2>
            <p>
              Dalla tecnica all'improvvisazione, coltiviamo curiosità e
              attenzione per il corpo, la musica e il movimento.
            </p>
          </article>
        </section>

        <section className="content-page__statement">
          <p className="section-eyebrow">Il nostro obiettivo</p>
          <h2>Muoversi insieme, ognuno con il proprio ritmo.</h2>
          <p>
            Vogliamo offrire lezioni curate e un ambiente in cui sentirsi
            accolti, che sia la prima volta in sala o il prossimo passo di un
            percorso già iniziato.
          </p>
        </section>
      </main>
    </PageLayout>
  );
}

export default History;
