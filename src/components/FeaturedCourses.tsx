import { Link } from "react-router-dom";
import { MOCK_COURSES } from "../data/mockCourses";
import { formatSchedule } from "../utils/schedule";

const FEATURED_COURSES = MOCK_COURSES.slice(0, 3);

/**
 * Mostra tre corsi in evidenza con insegnante, orario e posti disponibili.
 *
 * @returns {import("react").ReactElement} La griglia dei corsi selezionati.
 */
function FeaturedCourses() {
  return (
    <section
      className="featured-courses"
      aria-labelledby="featured-courses-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-eyebrow">Scegli il tuo stile</p>
          <h2 id="featured-courses-title">Corsi in evidenza</h2>
        </div>
        <p className="section-description">
          Tre modi diversi per trovare il tuo prossimo ritmo.
        </p>
      </div>

      <div className="featured-courses__grid">
        {FEATURED_COURSES.map((course) => {
          const placesLeft = Math.max(
            0,
            course.capacity - course.enrolledCount,
          );
          const availabilityClass =
            placesLeft === 0
              ? "featured-course__availability--full"
              : placesLeft <= 3
                ? "featured-course__availability--limited"
                : "";

          return (
            <article
              className="course-card featured-course"
              key={course.id}
            >
              <div className="course-card__topline">
                <span
                  className="course-category"
                  data-category={course.category.toLowerCase()}
                >
                  {course.category}
                </span>
                <span className="course-card__number">
                  {course.id.slice(-2)}
                </span>
              </div>

              <span
                className={`featured-course__availability ${availabilityClass}`}
                role="status"
              >
                {placesLeft === 0
                  ? "Al completo"
                  : `${placesLeft} ${placesLeft === 1 ? "posto" : "posti"} disponibili`}
              </span>

              <h3>{course.title}</h3>

              <div className="course-instructor">
                <span className="instructor-avatar" aria-hidden="true">
                  {course.instructor.charAt(0)}
                </span>
                <span>
                  <span className="course-instructor__label">Istruttore</span>
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

              <Link className="featured-course__link" to="/corsi">
                Scopri il corso <span aria-hidden="true">→</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturedCourses;
