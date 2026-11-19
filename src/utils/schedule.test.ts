import { describe, expect, it } from "vitest";
import type { Course } from "../types";
import { coursesOverlap, formatSchedule } from "./schedule";

function createCourse(overrides: Partial<Course> = {}): Course {
  return {
    id: "course-1",
    title: "Test course",
    category: "Hip-hop",
    level: "Principiante",
    instructor: "Test instructor",
    day: "Lunedì",
    startMinute: 18 * 60,
    endMinute: 19 * 60,
    room: "Sala A",
    capacity: 10,
    enrolledCount: 0,
    ...overrides,
  };
}

describe("schedule utilities", () => {
  it("formats numeric time intervals as HH:mm", () => {
    expect(
      formatSchedule(
        createCourse({ startMinute: 9 * 60 + 5, endMinute: 11 * 60 }),
      ),
    ).toBe("09:05 - 11:00");
  });

  it("detects overlap only on the same day and treats touching intervals as separate", () => {
    const first = createCourse();

    expect(
      coursesOverlap(
        first,
        createCourse({ id: "course-2", startMinute: 18 * 60 + 30 }),
      ),
    ).toBe(true);
    expect(
      coursesOverlap(
        first,
        createCourse({
          id: "course-2",
          startMinute: 19 * 60,
          endMinute: 20 * 60,
        }),
      ),
    ).toBe(false);
    expect(
      coursesOverlap(
        first,
        createCourse({ id: "course-2", day: "Martedì" }),
      ),
    ).toBe(false);
  });

  it("rejects invalid time ranges when checking conflicts", () => {
    expect(
      coursesOverlap(
        createCourse({ startMinute: 20 * 60, endMinute: 19 * 60 }),
        createCourse(),
      ),
    ).toBe(false);
  });
});
