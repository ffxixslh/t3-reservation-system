import type {
  Appointment,
  MedicalRecord,
  User,
  Department,
  Doctor,
  Hospital,
  Text,
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

export type TText = Text;

export type TRecord = MedicalRecord & {
  doctor: Doctor;
} & { patient: User } & { texts: Text[] };
