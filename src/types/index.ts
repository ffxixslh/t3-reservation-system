import type {
  Appointment as PrismaAppointment,
  MedicalRecord as PrismaMedicalRecord,
  User as PrismaUser,
  Department as PrismaDepartment,
  Doctor as PrismaDoctor,
  Hospital as PrismaHospital,
  Text as PrismaText,
} from "@prisma/client";

export type THospital = PrismaHospital;

export type TUser = PrismaUser;

export type TDepartment = PrismaDepartment & {
  doctors: PrismaDoctor[];
};

export type TPatient = Omit<TUser, "doctorId"> & {
  appointments: PrismaAppointment[];
} & { medicalRecords: PrismaMedicalRecord[] };

export type TPatientWithoutPassword = Omit<
  TPatient,
  "password"
>;

export type TDoctor = PrismaDoctor & {
  appointments: PrismaAppointment[];
} & { medicalRecords: PrismaMedicalRecord[] } & {
  department: PrismaDepartment;
};

export type TAppointment = PrismaAppointment & {
  doctor: PrismaDoctor;
} & { patient: PrismaUser };

export type TText = Omit<PrismaText, "medicalRecordId">;

export type TRecord = PrismaMedicalRecord & {
  doctor: PrismaDoctor;
} & { patient: PrismaUser } & { texts: PrismaText[] };
