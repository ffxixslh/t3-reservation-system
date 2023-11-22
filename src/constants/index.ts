import { type TDoctor, type TUser } from "~/types";

export const ROLE: TUser["role"][] = [
  "PATIENT",
  "ADMIN",
  "DOCTOR",
];

export const LEVEL: TDoctor["level"][] = [
  "CHIEF",
  "ATTENDING",
  "RESIDENT",
  "INTERN",
];
