import type { Course } from "../types";
import { formatSchedule } from "../utils/schedule";

interface CourseCardProps {
  course: Course;
  onBook: (courseId: string) => void;
}

/**
 * Mostra le informazioni e la disponibilità di un singolo corso.
 *
 * @param {CourseCardProps} props - Dati del corso e azione di prenotazione.
 * @returns {import("react").ReactElement} La scheda del corso.
 */
function CourseCard({ course, onBook }: CourseCardProps) {
  const placesLeft = course.capacity - course.enrolledCount;
  const isFull = placesLeft <= 0;
  const isNearlyFull =
    !isFull && course.enrolledCount / course.capacity >= 0.8;

  return (
    <article className="course-card">
      <div className="course-card__topline">
        <span
          className="course-category"
          data-category={course.category.toLowerCase()}
        >
          {course.category}
        </span>
        <span className="course-card__number">{course.id.slice(-2)}</span>
      </div>
      {(isFull || isNearlyFull) && (
        <p
          className={`course-status ${isFull ? "course-status--full" : ""}`}
          role="status"
        >
          {isFull ? "Al completo" : "Ultimi posti disponibili!"}
        </p>
      )}

      <h3>{course.title}</h3>
      <p className="course-card__level">{course.level}</p>

      <div className="course-instructor">
        <span className="instructor-avatar" aria-hidden="true">
          {course.instructor.charAt(0)}
        </span>
        <span>
          <span className="course-instructor__label">Insegnante</span>
          <strong>{course.instructor}</strong>
        </span>
      </div>

      <div className="course-card__schedule">
        <span className="schedule-icon" aria-hidden="true">
          ↗
        </span>
        <span>
          {course.day} · {formatSchedule(course)}
        </span>
      </div>

      <div className="course-card__availability">
        <span>
          {course.enrolledCount}/{course.capacity} posti occupati
        </span>
        <span>{isFull ? "Al completo" : `${placesLeft} disponibili`}</span>
      </div>
      <progress
        className="course-progress"
        value={course.enrolledCount}
        max={course.capacity}
        aria-label={`Posti occupati per ${course.title}`}
      />

      <button
        className="course-book-button"
        type="button"
        disabled={isFull}
        onClick={() => onBook(course.id)}
      >
        {isFull ? "Al completo" : "Prenota un posto"}
      </button>
    </article>
  );
}

export default CourseCard;
