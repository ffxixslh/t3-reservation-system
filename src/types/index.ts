import type {
  Appointment,
  MedicalRecord,
  User,
} from "@prisma/client";

export type Patient = User & {
  appointment: Appointment[];
} & { medicalRecord: MedicalRecord[] };
