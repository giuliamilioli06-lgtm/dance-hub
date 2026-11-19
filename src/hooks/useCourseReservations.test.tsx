import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import type { Course } from "../types";
import useCourseReservations from "./useCourseReservations";

const STORAGE_KEY = "dance-hub:reservations";

const courses: Course[] = [
  {
    id: "course-1",
    title: "First course",
    category: "Hip-hop",
    level: "Principiante",
    instructor: "Ada",
    day: "Lunedì",
    startMinute: 18 * 60,
    endMinute: 19 * 60,
    room: "Sala A",
    capacity: 10,
    enrolledCount: 2,
  },
  {
    id: "course-2",
    title: "Second course",
    category: "Contemporary",
    level: "Intermedio",
    instructor: "Bea",
    day: "Lunedì",
    startMinute: 18 * 60 + 30,
    endMinute: 19 * 60 + 30,
    room: "Sala B",
    capacity: 10,
    enrolledCount: 1,
  },
];

describe("useCourseReservations", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("saves a successful booking and updates the course count", () => {
    const { result } = renderHook(() => useCourseReservations(courses));

    act(() => {
      expect(result.current.confirmBooking("course-1", " Ada ")).toBeNull();
    });

    expect(result.current.reservations).toEqual([
      { courseId: "course-1", attendeeName: "Ada", isPresent: false },
    ]);
    expect(result.current.courses[0].enrolledCount).toBe(3);
    expect(result.current.bookingNotice).toBe("Prenotazione confermata per Ada.");
    expect(window.localStorage.getItem(STORAGE_KEY)).toContain(
      '"attendeeName":"Ada"',
    );
  });

  it("rejects a same-person booking that overlaps another course", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        { courseId: "course-1", attendeeName: "Ada", isPresent: false },
      ]),
    );
    const { result } = renderHook(() => useCourseReservations(courses));

    let error: string | null = null;
    act(() => {
      error = result.current.confirmBooking("course-2", "ada");
    });

    expect(error).toBe(
      "Hai già prenotato un corso che si sovrappone in questo giorno e orario.",
    );
    expect(result.current.reservations).toHaveLength(1);
    expect(result.current.courses[1].enrolledCount).toBe(1);
  });
});
