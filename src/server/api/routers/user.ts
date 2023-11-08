import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(32),
        password: z
          .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
          })
          .min(1)
          .max(16),
        phone: z.string({
          required_error: "Phone is required",
          invalid_type_error: "Phone must be a string",
        }),
        email: z.string().email(),
        role: z.enum(["ADMIN", "DOCTOR", "PATIENT"]).default("PATIENT"),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          phone: input.phone,
          password: input.password,
          email: input.email ?? "",
          role: input.role,
        },
      });
    }),
  getByName: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(32),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          name: input.name,
        },
      });
    }),
});
