import { z } from "zod";

export const stringIdSchema = z.object({ id: z.string() });

export const hospitalIdSchema = z.object({
  hospitalId: z.string(),
});

export const userIdSchema = z.object({
  userId: z.string(),
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

export const adminSchema = z.object({
  userId: z.string(),
  hospitalId: z.string(),
});

export const adminUpdateSchema =
  adminSchema.merge(stringIdSchema);

export const userSchema = z.object({
  name: z.string().min(1).max(32),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6)
    .max(32),
  phone: z
    .string({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a string",
    })
    .length(11, "11位电话号码是必填的"),
  email: z.string().optional(),
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
  userId: z.string(),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  timeRange: z.string(),
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
  description: z.string().min(0).max(128),
  patientId: z.string(),
  doctorId: z.string(),
  hospitalId: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const appointmentUpdateSchema =
  appointmentSchema.merge(stringIdSchema);

export const textSchema = z.object({
  title: z.string().min(2).max(32),
  content: z.string().min(8).max(1024),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
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

export const subscriptionInfoSchema = z.object({
  userId: z.string(),
  subscription: z.object({
    endpoint: z.string(),
    keys: z.object({
      p256dh: z.string(),
      auth: z.string(),
    }),
  }),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const subscriptionInfoUpdateSchema =
  subscriptionInfoSchema.merge(stringIdSchema);
