import type { CourseReservation } from "../types";

const STORAGE_KEY = "dance-hub:reservations";

interface ReservationLoadResult {
  reservations: CourseReservation[];
  error: string | null;
}

/**
 * Verifica che un valore letto dal browser abbia i campi di una prenotazione.
 *
 * @param {unknown} value - Valore JSON da validare.
 * @returns {boolean} True se contiene corso e nominativo validi.
 */
function isCourseReservation(value: unknown): value is CourseReservation {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "courseId" in value &&
    typeof value.courseId === "string" &&
    "attendeeName" in value &&
    typeof value.attendeeName === "string"
  );
}

/**
 * Carica le prenotazioni salvate nel browser e ne verifica la struttura.
 *
 * @returns {ReservationLoadResult} Prenotazioni valide o un messaggio d'errore.
 */
export function loadReservations(): ReservationLoadResult {
  try {
    const storedReservations = window.localStorage.getItem(STORAGE_KEY);

    if (storedReservations === null) {
      return { reservations: [], error: null };
    }

    const parsedReservations: unknown = JSON.parse(storedReservations);

    if (
      !Array.isArray(parsedReservations) ||
      !parsedReservations.every(isCourseReservation)
    ) {
      return {
        reservations: [],
        error:
          "Le prenotazioni salvate non sono valide e non sono state caricate.",
      };
    }

    return {
      reservations: parsedReservations.map((reservation) => ({
        courseId: reservation.courseId,
        attendeeName: reservation.attendeeName,
        isPresent:
          "isPresent" in reservation && reservation.isPresent === true,
      })),
      error: null,
    };
  } catch {
    return {
      reservations: [],
      error: "Impossibile leggere le prenotazioni salvate in questo browser.",
    };
  }
}

/**
 * Salva le prenotazioni nel localStorage del browser.
 *
 * @param {CourseReservation[]} reservations - Prenotazioni da conservare.
 * @returns {string | null} Messaggio d'errore o null se il salvataggio riesce.
 */
export function saveReservations(
  reservations: CourseReservation[],
): string | null {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    return null;
  } catch {
    return "Impossibile salvare la prenotazione nel browser. Riprova o libera spazio.";
  }
}
