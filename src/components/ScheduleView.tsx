import type { Course, Weekday } from "../types";
import { formatSchedule } from "../utils/schedule";

interface ScheduleViewProps {
  courses: Course[];
}

const WEEKDAY_ORDER: Record<Weekday, number> = {
  Lunedì: 1,
  Martedì: 2,
  Mercoledì: 3,
  Giovedì: 4,
  Venerdì: 5,
  Sabato: 6,
};

/**
 * Organizza i corsi in una tabella settimanale consultabile per giorno.
 *
 * @param {ScheduleViewProps} props - Corsi da visualizzare nell'agenda.
 * @returns {import("react").ReactElement} La tabella degli appuntamenti settimanali.
 */
function ScheduleView({ courses }: ScheduleViewProps) {
  const sortedCourses = [...courses].sort(
    (first, second) =>
      WEEKDAY_ORDER[first.day] - WEEKDAY_ORDER[second.day] ||
      first.startMinute - second.startMinute,
  );
  const groupedCourses: { day: Weekday; courses: Course[] }[] = [];

  for (const course of sortedCourses) {
    const lastGroup = groupedCourses[groupedCourses.length - 1];

    if (lastGroup?.day === course.day) {
      lastGroup.courses.push(course);
    } else {
      groupedCourses.push({ day: course.day, courses: [course] });
    }
  }

  return (
    <div className="schedule-table-wrapper">
      <table className="schedule-table">
        <thead>
          <tr>
            <th scope="col">Giorno</th>
            <th scope="col">Orario</th>
            <th scope="col">Corso</th>
            <th scope="col">Insegnante</th>
            <th scope="col">Sala</th>
          </tr>
        </thead>
        {groupedCourses.map(({ day, courses: dayCourses }) => (
          <tbody key={day}>
            {dayCourses.map((course, index) => (
              <tr key={course.id}>
                {index === 0 && (
                  <th scope="rowgroup" rowSpan={dayCourses.length}>
                    {day}
                  </th>
                )}
                <td className="schedule-table__time">
                  {formatSchedule(course)}
                </td>
                <td>
                  <strong>{course.title}</strong>
                  <span className="schedule-table__level">
                    {course.category} · {course.level}
                  </span>
                </td>
                <td>{course.instructor}</td>
                <td>{course.room}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default ScheduleView;
