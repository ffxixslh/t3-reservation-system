import { z } from "zod";

export const cuidSchema = z.object({ id: z.string() });

export const numberIdSchema = z.object({ id: z.number() });

export const hospitalIdSchema = z.object({
  hospitalId: z.string(),
});

export const hospitalSchema = z.object({
  name: z.string().min(1).max(32),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const hospitalUpdateSchema =
  hospitalSchema.merge(cuidSchema);

export const departmentIdSchema = z.object({
  departmentId: z.number(),
});

export const departmentSchema = z.object({
  name: z.string().min(1).max(32),
  description: z.string().min(0).max(128).default(""),
  hospitalId: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const departmentUpdateSchema =
  departmentSchema.merge(numberIdSchema);

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
  // appointment: z.array()
});

export const userUpdateSchema =
  userSchema.merge(cuidSchema);

// export const appointmentSchema = z.object({});
