/**
 * @file Home.tsx
 * @description Definisce il catalogo, i filtri e la prenotazione dei corsi Dance Hub.
 * @author Giulia
 * @created Novembre 2026
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import AttendanceView from "../components/AttendanceView";
import BookingModal from "../components/BookingModal";
import CourseCard from "../components/CourseCard";
import HomeControls from "../components/HomeControls";
import InstructorsSection from "../components/InstructorsSection";
import ScheduleView from "../components/ScheduleView";
import Welcome from "../components/Welcome";
import { MOCK_COURSES } from "../data/mockCourses";
import useCourseReservations from "../hooks/useCourseReservations";
import type { CourseCategory, CourseLevel, Weekday } from "../types";

const COURSE_CATEGORIES: CourseCategory[] = [
  "Hip-hop",
  "Contemporary",
  "Master",
  "Heels",
];

const COURSE_LEVELS: CourseLevel[] = [
  "Principiante",
  "Intermedio",
  "Avanzato",
];

const WEEKDAYS: Weekday[] = [
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];

/**
 * Compone la pagina iniziale, il catalogo filtrabile e l'agenda settimanale.
 *
 * @returns {import("react").ReactElement} L'interfaccia interattiva di Dance Hub.
 */
function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [categoryFilter, setCategoryFilter] = useState<CourseCategory | "Tutti">(
    "Tutti",
  );
  const [levelFilter, setLevelFilter] = useState<CourseLevel | "Tutti">("Tutti");
  const [dayFilter, setDayFilter] = useState<Weekday | "Tutti">("Tutti");
  const [instructorFilter, setInstructorFilter] = useState("Tutti");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [view, setView] = useState<"student" | "teacher">("student");
  const {
    courses,
    reservations,
    storageError,
    bookingNotice,
    confirmBooking,
    updateAttendance,
    clearBookingNotice,
  } = useCourseReservations(MOCK_COURSES);

  const filteredCourses = courses.filter(
    (course) =>
      (categoryFilter === "Tutti" || course.category === categoryFilter) &&
      (levelFilter === "Tutti" || course.level === levelFilter) &&
      (dayFilter === "Tutti" || course.day === dayFilter) &&
      (instructorFilter === "Tutti" ||
        course.instructor === instructorFilter) &&
      [course.title, course.instructor, course.category, course.level]
        .join(" ")
        .toLocaleLowerCase()
        .includes(searchQuery.trim().toLocaleLowerCase()),
  );
  const instructors = Array.from(
    new Set(courses.map((course) => course.instructor)),
  ).sort((first, second) => first.localeCompare(second));
  const selectedCourse =
    courses.find((course) => course.id === selectedCourseId) ?? null;
  const availablePlaces = courses.reduce(
    (total, course) =>
      total + Math.max(0, course.capacity - course.enrolledCount),
    0,
  );
  const filterAnimationKey = [
    searchQuery,
    categoryFilter,
    levelFilter,
    dayFilter,
    instructorFilter,
  ].join("|");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  /**
   * Apre il modulo per prenotare il corso selezionato.
   *
   * @param {string} courseId - Identificativo univoco del corso.
   * @returns {void} Aggiorna il corso attivo nel modale.
   */
  function openBookingModal(courseId: string) {
    clearBookingNotice();
    setSelectedCourseId(courseId);
  }

  function handleConfirmBooking(
    courseId: string,
    attendeeName: string,
  ): string | null {
    const error = confirmBooking(courseId, attendeeName);

    if (!error) {
      setSelectedCourseId(null);
    }

    return error;
  }

  return (
    <div className="app-shell">
      <HomeControls
        selectedCategory={categoryFilter}
        onCategoryChange={setCategoryFilter}
        view={view}
        theme={theme}
        onViewChange={(nextView) => {
          setView(nextView);
          setSelectedCourseId(null);
        }}
        onThemeToggle={() =>
          setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light",
          )
        }
      />

      <main>
        <section className="hero" id="home">
          <div className="hero__content">
            <Welcome />
            <div className="hero__actions">
              <a className="button button--primary" href="#courses">
                Scopri i corsi <span aria-hidden="true">↘</span>
              </a>
              <p>
                <strong>{courses.length} corsi</strong>
                <span aria-hidden="true">·</span>
                <strong>{availablePlaces} posti disponibili</strong>
              </p>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-art__orbit hero-art__orbit--outer" />
            <div className="hero-art__orbit hero-art__orbit--inner" />
            <div className="hero-art__disc">
              <span>DH</span>
              <span className="hero-art__disc-caption">MOVE TOGETHER</span>
            </div>
            <span className="hero-art__spark hero-art__spark--one">✳</span>
            <span className="hero-art__spark hero-art__spark--two">✳</span>
            <div className="hero-art__note">
              <span>IL TUO PROSSIMO PASSO</span>
              <strong>inizia qui.</strong>
            </div>
          </div>
        </section>

        <InstructorsSection />

        <section
          className="courses-section"
          id="courses"
          aria-labelledby="courses-title"
        >
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">
                {view === "student" ? "Scegli il tuo stile" : "Registro corsi"}
              </p>
              <h2 id="courses-title">
                {view === "student" ? "Corsi in evidenza" : "Gestisci le presenze"}
              </h2>
            </div>
            <p className="section-description">
              {view === "student"
                ? "Nuovi ritmi, nuove persone, la stessa voglia di muoversi."
                : "Consulta i nominativi prenotati e segna chi è presente."}
            </p>
          </div>

          <div className="course-filters" aria-label="Filtra i corsi">
            <label className="course-filters__search">
              <span>Cerca un corso o un insegnante</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
                placeholder="Es. Contemporary, Giulia..."
              />
            </label>

            <label>
              <span>Disciplina</span>
              <select
                value={categoryFilter}
                onChange={(event) => {
                  const selectedCategory = COURSE_CATEGORIES.find(
                    (category) => category === event.currentTarget.value,
                  );
                  setCategoryFilter(selectedCategory ?? "Tutti");
                }}
              >
                <option value="Tutti">Tutte le discipline</option>
                {COURSE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Livello</span>
              <select
                value={levelFilter}
                onChange={(event) => {
                  const selectedLevel = COURSE_LEVELS.find(
                    (level) => level === event.currentTarget.value,
                  );
                  setLevelFilter(selectedLevel ?? "Tutti");
                }}
              >
                <option value="Tutti">Tutti i livelli</option>
                {COURSE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Giorno</span>
              <select
                value={dayFilter}
                onChange={(event) => {
                  const selectedDay = WEEKDAYS.find(
                    (day) => day === event.currentTarget.value,
                  );
                  setDayFilter(selectedDay ?? "Tutti");
                }}
              >
                <option value="Tutti">Tutti i giorni</option>
                {WEEKDAYS.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Insegnante</span>
              <select
                value={instructorFilter}
                onChange={(event) => setInstructorFilter(event.currentTarget.value)}
              >
                <option value="Tutti">Tutti gli insegnanti</option>
                {instructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))}
              </select>
            </label>

            <p className="course-filters__count" aria-live="polite">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "corso trovato" : "corsi trovati"}
            </p>
          </div>

          {bookingNotice && (
            <p className="booking-notice" role="status">
              {bookingNotice}
            </p>
          )}
          {storageError && (
            <p className="booking-notice booking-notice--error" role="alert">
              {storageError}
            </p>
          )}

          {filteredCourses.length > 0 ? (
            view === "student" ? (
              <div className="course-grid" key={filterAnimationKey}>
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onBook={openBookingModal}
                  />
                ))}
              </div>
            ) : (
              <AttendanceView
                key={filterAnimationKey}
                courses={filteredCourses}
                reservations={reservations}
                onAttendanceChange={updateAttendance}
              />
            )
          ) : (
            <div
              className="empty-courses empty-courses--catalog"
              key={filterAnimationKey}
              role="status"
              aria-live="polite"
            >
              <span className="empty-courses__icon" aria-hidden="true">
                ✳
              </span>
              <h3>Nessun corso trovato</h3>
              <p>
                Non troviamo corsi con questa combinazione. Prova a modificare
                la ricerca o i filtri.
              </p>
              <button
                className="button button--secondary"
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("Tutti");
                  setLevelFilter("Tutti");
                  setDayFilter("Tutti");
                  setInstructorFilter("Tutti");
                }}
              >
                Mostra tutti i corsi
              </button>
            </div>
          )}
        </section>

        <section
          className="schedule-section"
          id="schedule"
          aria-labelledby="schedule-title"
        >
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">Organizza la tua settimana</p>
              <h2 id="schedule-title">Calendario settimanale</h2>
            </div>
            <p className="section-description">
              Giorni, orari, insegnanti e sale: tutto a colpo d'occhio.
            </p>
          </div>
          <ScheduleView courses={courses} />
        </section>
      </main>

      <footer className="site-footer" id="about">
        <a className="brand brand--footer" href="#home">
          <span className="brand__mark" aria-hidden="true">
            D
          </span>
          <span>
            dance<span className="brand__accent">hub</span>
          </span>
        </a>
        <p>Uno spazio per muoversi, incontrarsi e crescere insieme.</p>
        <nav className="site-footer__links" aria-label="Pagine del sito">
          <Link to="/storia">La storia</Link>
          <Link to="/contatti">Contatti</Link>
          <Link to="/lavora-con-noi">Lavora con noi</Link>
          <a href="#home">Torna all'inizio ↑</a>
        </nav>
      </footer>

      <BookingModal
        course={selectedCourse}
        onClose={() => setSelectedCourseId(null)}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}

export default Home;
