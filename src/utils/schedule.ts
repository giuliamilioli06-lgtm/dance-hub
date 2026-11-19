import type { Course } from "../types";

function isValidTimeRange(course: Course): boolean {
  return (
    Number.isInteger(course.startMinute) &&
    Number.isInteger(course.endMinute) &&
    course.startMinute >= 0 &&
    course.startMinute < 24 * 60 &&
    course.endMinute > course.startMinute &&
    course.endMinute <= 24 * 60
  );
}

function formatMinute(minute: number): string {
  const hours = Math.floor(minute / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (minute % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Formatta l'intervallo di un corso nel formato HH:mm - HH:mm.
 *
 * @param {Course} course - Corso da visualizzare.
 * @returns {string} Intervallo orario leggibile.
 */
export function formatSchedule(course: Course): string {
  return `${formatMinute(course.startMinute)} - ${formatMinute(course.endMinute)}`;
}

/**
 * Verifica se due corsi si sovrappongono nello stesso giorno.
 *
 * @param {Course} first - Primo corso da confrontare.
 * @param {Course} second - Secondo corso da confrontare.
 * @returns {boolean} True se gli intervalli si sovrappongono.
 */
export function coursesOverlap(first: Course, second: Course): boolean {
  if (
    first.day !== second.day ||
    !isValidTimeRange(first) ||
    !isValidTimeRange(second)
  ) {
    return false;
  }

  return (
    first.startMinute < second.endMinute &&
    second.startMinute < first.endMinute
  );
}
