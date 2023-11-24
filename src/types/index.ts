import type {
  Appointment,
  MedicalRecord,
  User,
  Department,
  Doctor,
  Hospital,
} from "@prisma/client";

export type THospital = Hospital;

export type TUser = User;

export type TDepartment = Department & {
  doctors: Doctor[];
};

export type TPatient = User & {
  appointments: Appointment[];
} & { medicalRecords: MedicalRecord[] };

export type TDoctor = Doctor & {
  appointments: Appointment[];
} & { medicalRecords: MedicalRecord[] } & {
  department: Department;
};

export type TAppointment = Appointment & {
  doctor: Doctor;
} & { patient: User };
