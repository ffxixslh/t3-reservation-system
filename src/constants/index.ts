import {
  type TAppointment,
  type TDoctor,
  type TUser,
} from "~/types";

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

export const STATUS: TAppointment["status"][] = [
  "PENDING",
  "CONFIRMED",
  "CANCELED",
  "COMPLETED",
];
