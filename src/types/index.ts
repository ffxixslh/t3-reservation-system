import type {
  Appointment,
  MedicalRecord,
  User,
  Department,
  Doctor,
} from "@prisma/client";

export type TUser = User;

export type TDepartment = Department & {
  doctors: Doctor[];
};

export type TPatient = User & {
  appointments: Appointment[];
} & { medicalRecords: MedicalRecord[] };
