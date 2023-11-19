import type {
  Appointment,
  MedicalRecord,
  User,
} from "@prisma/client";

export type TPatient = User & {
  appointment: Appointment[];
} & { medicalRecord: MedicalRecord[] };

export type TUser = User;
