/**
 * @file LandingHome.tsx
 * @description Pagina iniziale con menu a tendina per la navigazione rapida.
 * @author Giulia
 * @created Novembre 2026
 */

import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import EventsSection from "../components/EventsSection";
import FeaturedCourses from "../components/FeaturedCourses";
import PageLayout from "../components/PageLayout";
import Testimonials from "../components/Testimonials";
import WhyUs from "../components/WhyUs";

/**
 * Mostra una landing page con navigazione rapida alle sezioni del sito.
 *
 * @returns {import("react").ReactElement} La pagina iniziale di Dance Hub.
 */
function LandingHome() {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState("");

  /**
   * Aggiorna la selezione e naviga alla route corrispondente.
   *
   * @param {ChangeEvent<HTMLSelectElement>} event - Evento del menu a tendina.
   * @returns {void} Naviga alla sezione scelta, se è stata selezionata.
   */
  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const path = event.currentTarget.value;
    setSelectedPath(path);

    if (path) {
      navigate(path);
    }
  }

  return (
    <PageLayout>
      <main className="landing-page">
        <section className="landing-page__hero">
          <p className="landing-page__eyebrow">Danza, community e movimento</p>
          <h1>Trova il tuo prossimo ritmo.</h1>
          <p className="landing-page__description">
            Scopri i corsi, incontra la nostra community e scegli da dove
            iniziare il tuo percorso.
          </p>

          <div className="dropdown-navigation">
            <label htmlFor="landing-navigation">
              Seleziona una sezione per iniziare
            </label>
            <select
              id="landing-navigation"
              value={selectedPath}
              onChange={handleSelectChange}
            >
              <option disabled value="">
                Scegli dove andare
              </option>
              <option value="/corsi">Corsi e prenotazioni</option>
              <option value="/storia">La nostra storia</option>
              <option value="/contatti">Contatti e sede</option>
              <option value="/lavora-con-noi">Lavora con noi</option>
            </select>
          </div>
          <p className="landing-page__note">
            Calendario e orari sono disponibili nella pagina Corsi e prenotazioni.
          </p>
        </section>
        <FeaturedCourses />
        <WhyUs />
        <Testimonials />
        <EventsSection />
        <CallToAction />
      </main>
    </PageLayout>
  );
}

export default LandingHome;
