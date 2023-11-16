import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

const idSchema = z.object({ id: z.string() });

const userSchema = z.object({
  name: z.string().min(1).max(32),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(1)
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
  hospital: z.object({
    connect: z.object({
      id: z.string(),
    }),
  }),
});

const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),
  getOne: publicProcedure
    .input(idSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: idSchema.parse(input),
      });
    }),
  createUser: publicProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.create({
        data: userSchema.parse(input),
      });
    }),
  updateUser: publicProcedure
    .input(userUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: input.id },
        data: userUpdateSchema.parse(input),
      });
    }),
  deleteUser: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.delete({
        where: idSchema.parse(input),
      });
    }),
});
