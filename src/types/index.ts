export type CourseCategory =
  | "Classico"
  | "Modern"
  | "Contemporaneo"
  | "Hip-hop"
  | "Heels"
  | "Musical";

export type CourseLevel = "Base" | "Intermedio" | "Avanzato";

export type Weekday =
  | "Lunedì"
  | "Martedì"
  | "Mercoledì"
  | "Giovedì"
  | "Venerdì"
  | "Sabato";

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  instructor: string;
  day: Weekday;
  startMinute: number;
  endMinute: number;
  room: string;
  capacity: number;
  enrolledCount: number;
}

export interface CourseReservation {
  courseId: string;
  attendeeName: string;
  isPresent: boolean;
}
