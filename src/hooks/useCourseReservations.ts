import { useState } from "react";
import type { Course, CourseReservation } from "../types";
import { loadReservations, saveReservations } from "../utils/reservationStorage";
import { coursesOverlap } from "../utils/schedule";

function useCourseReservations(initialCourses: Course[]) {
  const [storedReservations] = useState(loadReservations);
  const [courses, setCourses] = useState<Course[]>(() =>
    initialCourses.map((course) => ({
      ...course,
      enrolledCount: Math.min(
        course.capacity,
        course.enrolledCount +
          storedReservations.reservations.filter(
            (reservation) => reservation.courseId === course.id,
          ).length,
      ),
    })),
  );
  const [reservations, setReservations] = useState<CourseReservation[]>(
    storedReservations.reservations,
  );
  const [storageError, setStorageError] = useState(
    storedReservations.error ?? "",
  );
  const [bookingNotice, setBookingNotice] = useState("");

  function confirmBooking(
    courseId: string,
    attendeeName: string,
  ): string | null {
    const displayName = attendeeName.trim();

    if (!displayName) {
      return "Inserisci il tuo nome prima di confermare la prenotazione.";
    }

    const course = courses.find((item) => item.id === courseId);

    if (!course || course.enrolledCount >= course.capacity) {
      return "Questo corso è al completo.";
    }

    const normalizedName = displayName.toLocaleLowerCase();
    const hasScheduleConflict = reservations.some((reservation) => {
      if (
        reservation.attendeeName.trim().toLocaleLowerCase() !== normalizedName
      ) {
        return false;
      }

      const reservedCourse = courses.find(
        (item) => item.id === reservation.courseId,
      );

      return reservedCourse ? coursesOverlap(course, reservedCourse) : false;
    });

    if (hasScheduleConflict) {
      return "Hai già prenotato un corso che si sovrappone in questo giorno e orario.";
    }

    const nextReservations = [
      ...reservations,
      { courseId, attendeeName: displayName, isPresent: false },
    ];
    const saveError = saveReservations(nextReservations);

    if (saveError) {
      setStorageError(saveError);
      return saveError;
    }

    setCourses((currentCourses) =>
      currentCourses.map((item) =>
        item.id === courseId && item.enrolledCount < item.capacity
          ? { ...item, enrolledCount: item.enrolledCount + 1 }
          : item,
      ),
    );
    setReservations(nextReservations);
    setStorageError("");
    setBookingNotice(`Prenotazione confermata per ${displayName}.`);
    return null;
  }

  function updateAttendance(reservationIndex: number, isPresent: boolean) {
    const nextReservations = reservations.map((reservation, index) =>
      index === reservationIndex ? { ...reservation, isPresent } : reservation,
    );
    const saveError = saveReservations(nextReservations);

    if (saveError) {
      setStorageError(saveError);
      return;
    }

    setReservations(nextReservations);
    setStorageError("");
    setBookingNotice("Presenza aggiornata.");
  }

  return {
    courses,
    reservations,
    storageError,
    bookingNotice,
    confirmBooking,
    updateAttendance,
    clearBookingNotice: () => setBookingNotice(""),
  };
}

export default useCourseReservations;
