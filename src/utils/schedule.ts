import type { Course } from "../types";

interface TimeInterval {
  start: number;
  end: number;
}

/**
 * Converte l'orario testuale di un corso in minuti dall'inizio della giornata.
 *
 * @param {string} schedule - Intervallo nel formato HH:mm - HH:mm.
 * @returns {TimeInterval | null} Estremi dell'intervallo o null se non valido.
 */
function parseSchedule(schedule: string): TimeInterval | null {
  const match =
    /^(2[0-3]|[01]\d):([0-5]\d)\s*-\s*(2[0-3]|[01]\d):([0-5]\d)$/.exec(
      schedule,
    );

  if (!match) {
    return null;
  }

  const start = Number(match[1]) * 60 + Number(match[2]);
  const end = Number(match[3]) * 60 + Number(match[4]);

  return end > start ? { start, end } : null;
}

/**
 * Verifica se due corsi si sovrappongono nello stesso giorno.
 *
 * @param {Course} first - Primo corso da confrontare.
 * @param {Course} second - Secondo corso da confrontare.
 * @returns {boolean} True se gli intervalli si sovrappongono.
 */
export function coursesOverlap(first: Course, second: Course): boolean {
  if (first.day !== second.day) {
    return false;
  }

  const firstInterval = parseSchedule(first.schedule);
  const secondInterval = parseSchedule(second.schedule);

  return Boolean(
    firstInterval &&
      secondInterval &&
      firstInterval.start < secondInterval.end &&
      secondInterval.start < firstInterval.end,
  );
}
