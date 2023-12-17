import { z } from "zod";

export const credentialsSchema = z.object({
  phone: z
    .string({
      required_error: "电话是必填的",
      invalid_type_error: "Phone must be a string",
    })
    .length(11),
  password: z
    .string({
      required_error: "密码是必填的",
      invalid_type_error: "Password must be a string",
    })
    .min(6)
    .max(16),
});

export const searchParamsSchema = z.object({
  page: z.string().default("1"),
  per_page: z.string().default("10"),
  sort: z.string().optional(),
  name: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  store: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  operator: z.string().optional(),
});
