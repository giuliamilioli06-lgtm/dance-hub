import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Course } from "../types";
import { formatSchedule } from "../utils/schedule";

interface BookingModalProps {
  course: Course | null;
  onClose: () => void;
  onConfirm: (courseId: string, attendeeName: string) => string | null;
}

/**
 * Raccoglie il nome del partecipante e conferma la prenotazione di un corso.
 *
 * @param {BookingModalProps} props - Corso selezionato e callback del modale.
 * @returns {import("react").ReactElement} Il modale di conferma della prenotazione.
 */
function BookingModal({ course, onClose, onConfirm }: BookingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [attendeeName, setAttendeeName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const courseId = course?.id;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (courseId && dialog && !dialog.open) {
      dialog.showModal();
      setAttendeeName("");
      setErrorMessage("");
    } else if (!courseId && dialog?.open) {
      dialog.close();
    }
  }, [courseId]);

  /**
   * Convalida il nome inserito e inoltra la richiesta di prenotazione.
   *
   * @param {FormEvent<HTMLFormElement>} event - Evento di invio del modulo.
   * @returns {void} Mostra un errore oppure conferma la prenotazione.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = attendeeName.trim();

    if (!normalizedName) {
      setErrorMessage("Inserisci il tuo nome prima di confermare la prenotazione.");
      return;
    }

    if (normalizedName.length < 2) {
      setErrorMessage("Inserisci un nome di almeno due caratteri.");
      return;
    }

    if (courseId) {
      const bookingError = onConfirm(courseId, normalizedName);

      if (bookingError) {
        setErrorMessage(bookingError);
      }
    }
  }

  return (
    <dialog
      className="booking-dialog"
      ref={dialogRef}
      aria-labelledby="booking-title"
      onClose={() => {
        if (courseId) {
          onClose();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      {course && (
        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <div className="booking-form__heading">
            <p className="section-eyebrow">Un posto ti aspetta</p>
            <button
              className="booking-form__close"
              type="button"
              aria-label="Chiudi il modulo"
              onClick={onClose}
            >
              ×
            </button>
            <h2 id="booking-title">Prenota il tuo posto</h2>
            <p>
              {course.title} · {course.day}, {formatSchedule(course)}
            </p>
          </div>

          <div className="booking-course-summary">
            <span>Insegnante</span>
            <strong>{course.instructor}</strong>
            <span>Sala</span>
            <strong>{course.room}</strong>
          </div>

          <label className="booking-label" htmlFor="attendee-name">
            Il tuo nome
          </label>
          <input
            autoFocus
            className="booking-input"
            id="attendee-name"
            name="attendeeName"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            value={attendeeName}
            onChange={(event) => {
              setAttendeeName(event.target.value);
              setErrorMessage("");
            }}
            placeholder="Es. Giulia Rossi"
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorMessage ? "booking-error" : undefined}
          />
          {errorMessage && (
            <p className="booking-error" id="booking-error" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="booking-form__actions">
            <button
              className="button button--secondary"
              type="button"
              onClick={onClose}
            >
              Annulla
            </button>
            <button className="button button--primary" type="submit">
              Conferma prenotazione
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}

export default BookingModal;
