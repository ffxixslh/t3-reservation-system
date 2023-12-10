import { excludeKeyFromObject } from "~/lib/utils";
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
      const users = await ctx.db.user.findMany({
        where: hospitalIdSchema.parse(input),
        include: {
          appointments: true,
          medicalRecords: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return users.map((user) =>
        excludeKeyFromObject(user, [
          "password",
          "doctorId",
        ]),
      );
    }),
  getById: protectedProcedure
    .input(stringIdSchema)
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: stringIdSchema.parse(input),
        include: {
          appointments: true,
          medicalRecords: true,
        },
      });
      if (!user) {
        return null;
      }
      return excludeKeyFromObject(user, [
        "password",
        "doctorId",
      ]);
    }),
  getByCredentials: publicProcedure
    .input(credentialsSchema)
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: credentialsSchema.parse(input),
      });
      if (!user) {
        return null;
      }
      const objectWithoutKeys = excludeKeyFromObject(user, [
        "password",
        "doctorId",
      ]);
      return objectWithoutKeys;
    }),
  createUser: protectedProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
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
});
