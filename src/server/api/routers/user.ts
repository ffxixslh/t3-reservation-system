import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  hospitalIdSchema,
  credentialsSchema,
  stringIdSchema,
  userSchema,
  userUpdateSchema,
} from "~/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(hospitalIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findMany({
        where: hospitalIdSchema.parse(input),
        include: {
          appointments: true,
          medicalRecords: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getOneById: protectedProcedure
    .input(stringIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: stringIdSchema.parse(input),
        include: {
          appointments: true,
          medicalRecords: true,
        },
      });
    }),
  getOneByPhone: publicProcedure
    .input(
      z.object({
        phone: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: {
          phone: input.phone,
        },
      });
    }),
  getOneByEmailResetPassword: publicProcedure
    .input(
      z.object({
        phone: z.string(),
        emailResetPassword: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: {
          phone: input.phone,
          emailResetPassword: input.emailResetPassword,
        },
      });
    }),
  getByCredentials: publicProcedure
    .input(credentialsSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: credentialsSchema.parse(input),
      });
    }),
  createUser: protectedProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          phone: input.phone,
        },
      });
      if (user) {
        return new TRPCError({
          code: "CONFLICT",
          message:
            "用户已存在，请输入其他手机号码或找回密码",
        });
      }

      return await ctx.db.user.create({
        data: userSchema.parse(input),
      });
    }),
  createNewUser: publicProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          phone: input.phone,
        },
      });
      if (user) {
        return new TRPCError({
          code: "CONFLICT",
          message:
            "用户已存在，请输入其他手机号码或找回密码",
        });
      }

      return await ctx.db.user.create({
        data: userSchema.parse(input),
      });
    }),
  updateUser: protectedProcedure
    .input(userUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: stringIdSchema.parse(input),
        data: userUpdateSchema.parse(input),
      });
    }),
  deleteUser: protectedProcedure
    .input(stringIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.delete({
        where: stringIdSchema.parse(input),
      });
    }),
  updateEmailResetPassword: publicProcedure
    .input(
      z.object({
        phone: z.string(),
        emailResetPassword: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: {
          phone: input.phone,
        },
        data: {
          emailResetPassword: input.emailResetPassword,
        },
      });
    }),
  updatePassword: publicProcedure
    .input(
      z.object({
        phone: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: {
          phone: input.phone,
        },
        data: {
          password: input.password,
        },
      });
    }),
});
