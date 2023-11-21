import {
  hospitalIdSchema,
  cuidSchema,
  userSchema,
  userUpdateSchema,
} from "~/schemas";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
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
  getOne: publicProcedure
    .input(cuidSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: cuidSchema.parse(input),
        include: {
          appointments: true,
          medicalRecords: true,
        },
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
        where: cuidSchema.parse(input),
        data: userUpdateSchema.parse(input),
      });
    }),
  deleteUser: publicProcedure
    .input(cuidSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.delete({
        where: cuidSchema.parse(input),
      });
    }),
});
