import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CourseReservation } from "../types";
import { loadReservations, saveReservations } from "./reservationStorage";

const STORAGE_KEY = "dance-hub:reservations";

describe("reservation storage", () => {
  let values: Map<string, string>;
  let localStorage: Pick<Storage, "getItem" | "setItem">;

  beforeEach(() => {
    values = new Map();
    localStorage = {
      getItem: vi.fn((key) => values.get(key) ?? null),
      setItem: vi.fn((key, value) => values.set(key, value)),
    };
    vi.stubGlobal("window", { localStorage });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("round-trips reservations", () => {
    const reservations: CourseReservation[] = [
      { courseId: "course-1", attendeeName: "Ada", isPresent: true },
    ];

    expect(saveReservations(reservations)).toBeNull();
    expect(loadReservations()).toEqual({ reservations, error: null });
  });

  it("reports invalid stored JSON instead of loading it", () => {
    values.set(STORAGE_KEY, "{not-json");

    expect(loadReservations()).toEqual({
      reservations: [],
      error: "Impossibile leggere le prenotazioni salvate in questo browser.",
    });
  });

  it("reports storage write errors", () => {
    vi.mocked(localStorage.setItem).mockImplementation(() => {
      throw new Error("storage unavailable");
    });

    expect(
      saveReservations([
        { courseId: "course-1", attendeeName: "Ada", isPresent: false },
      ]),
    ).toBe(
      "Impossibile salvare la prenotazione nel browser. Riprova o libera spazio.",
    );
  });
});
