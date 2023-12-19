import {
  type TAppointment,
  type TDoctor,
  type TUserOrigin,
} from "~/types";

export const ROLE: TUserOrigin["role"][] = [
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
