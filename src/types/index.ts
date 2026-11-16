export type CourseCategory = "Hip-hop" | "Contemporary" | "Master" | "Heels";

export type CourseLevel = "Principiante" | "Intermedio" | "Avanzato";

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
  schedule: string;
  room: string;
  capacity: number;
  enrolledCount: number;
}

export interface CourseReservation {
  courseId: string;
  attendeeName: string;
  isPresent: boolean;
}
