import type { Course, CourseReservation } from "../types";

interface AttendanceViewProps {
  courses: Course[];
  reservations: CourseReservation[];
  onAttendanceChange: (reservationIndex: number, isPresent: boolean) => void;
}

/**
 * Mostra i partecipanti registrati e permette di aggiornare le presenze.
 *
 * @param {AttendanceViewProps} props - Corsi, prenotazioni e callback presenze.
 * @returns {import("react").ReactElement} Il registro delle presenze dei corsi.
 */
function AttendanceView({
  courses,
  reservations,
  onAttendanceChange,
}: AttendanceViewProps) {
  if (courses.length === 0) {
    return (
      <p className="empty-courses">
        Nessun corso corrisponde ai filtri selezionati.
      </p>
    );
  }

  return (
    <div className="attendance-grid">
      {courses.map((course) => {
        const enrolledReservations = reservations
          .map((reservation, index) => ({ reservation, index }))
          .filter(({ reservation }) => reservation.courseId === course.id);
        const presentCount = enrolledReservations.filter(
          ({ reservation }) => reservation.isPresent,
        ).length;

        return (
          <article className="attendance-card" key={course.id}>
            <div className="attendance-card__heading">
              <div>
                <p className="section-eyebrow">{course.category}</p>
                <h3>{course.title}</h3>
                <p>
                  {course.day} · {course.schedule} · {course.room}
                </p>
              </div>
              <span className="attendance-card__count">
                {presentCount}/{enrolledReservations.length} presenze
              </span>
            </div>

            <ul className="attendance-list">
              {enrolledReservations.map(({ reservation, index }) => (
                <li key={`${reservation.courseId}-${index}`}>
                  <span className="attendance-list__initial" aria-hidden="true">
                    {reservation.attendeeName.charAt(0).toUpperCase()}
                  </span>
                  <span className="attendance-list__name">
                    {reservation.attendeeName}
                  </span>
                  <label className="attendance-check">
                    <input
                      type="checkbox"
                      checked={reservation.isPresent}
                      onChange={(event) =>
                        onAttendanceChange(index, event.currentTarget.checked)
                      }
                    />
                    <span>Presente</span>
                  </label>
                </li>
              ))}
              {enrolledReservations.length === 0 && (
                <li className="attendance-list__empty">
                  Nessuna prenotazione con nominativo.
                </li>
              )}
            </ul>
            <p className="attendance-card__note">
              Posti occupati: {course.enrolledCount}/{course.capacity}. I
              nominativi includono le prenotazioni effettuate tramite questa
              demo.
            </p>
          </article>
        );
      })}
    </div>
  );
}

export default AttendanceView;
