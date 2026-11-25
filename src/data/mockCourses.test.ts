import { describe, expect, it } from "vitest";
import { MOCK_COURSES } from "./mockCourses";
import type { CourseCategory, CourseLevel } from "../types";

const categories: CourseCategory[] = [
  "Classico",
  "Modern",
  "Contemporaneo",
  "Hip-hop",
  "Heels",
  "Musical",
];
const levels: CourseLevel[] = ["Base", "Intermedio", "Avanzato"];

describe("mock course catalogue", () => {
  it("includes every level for each dance discipline", () => {
    for (const category of categories) {
      for (const level of levels) {
        expect(
          MOCK_COURSES.some(
            (course) => course.category === category && course.level === level,
          ),
        ).toBe(true);
      }
    }
  });

  it("uses a unique id for every course", () => {
    const ids = MOCK_COURSES.map((course) => course.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});
