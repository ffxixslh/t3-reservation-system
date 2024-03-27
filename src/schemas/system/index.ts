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
    .max(32),
});
