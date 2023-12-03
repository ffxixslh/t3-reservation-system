import { z } from "zod";

export const stringIdSchema = z.object({ id: z.string() });

export const hospitalIdSchema = z.object({
  hospitalId: z.string(),
});

export const hospitalSchema = z.object({
  name: z.string().min(1).max(32),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const hospitalUpdateSchema =
  hospitalSchema.merge(stringIdSchema);

export const departmentSchema = z.object({
  name: z.string().min(1).max(32),
  description: z.string().min(0).max(128).default(""),
  hospitalId: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const departmentUpdateSchema =
  departmentSchema.merge(stringIdSchema);

export const userSchema = z.object({
  name: z.string().min(1).max(32),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6)
    .max(16),
  phone: z
    .string({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a string",
    })
    .length(11),
  email: z.string().optional().default(""),
  role: z
    .enum(["ADMIN", "DOCTOR", "PATIENT"])
    .default("PATIENT"),
  hospitalId: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const userUpdateSchema =
  userSchema.merge(stringIdSchema);

export const doctorSchema = z.object({
  name: z.string().min(1).max(32),
  level: z.enum([
    "CHIEF",
    "ATTENDING",
    "INTERN",
    "RESIDENT",
  ]),
  departmentId: z.string(),
  hospitalId: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const doctorUpdateSchema =
  doctorSchema.merge(stringIdSchema);

export const appointmentSchema = z.object({
  time: z.date().default(new Date()),
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "COMPLETED",
    "CANCELED",
  ]),
  patientId: z.string(),
  doctorId: z.string(),
  hospitalId: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const appointmentUpdateSchema =
  appointmentSchema.merge(stringIdSchema);

export const textSchema = z.object({
  medicalRecordId: z.string(),
  title: z.string().min(2).max(32),
  content: z.string().min(8).max(1024),
});

export const textUpdateSchema =
  textSchema.merge(stringIdSchema);

export const recordSchema = z.object({
  texts: textUpdateSchema.array(),
  patientId: z.string(),
  doctorId: z.string(),
  hospitalId: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const recordUpdateSchema =
  recordSchema.merge(stringIdSchema);
