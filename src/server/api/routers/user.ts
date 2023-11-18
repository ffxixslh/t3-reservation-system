import {
  hospitalIdSchema,
  idSchema,
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
          appointment: true,
          medicalRecord: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getOne: publicProcedure
    .input(idSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: idSchema.parse(input),
        include: {
          appointment: true,
          medicalRecord: true,
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
        where: idSchema.parse(input.id),
        data: userUpdateSchema.parse(input),
      });
    }),
  deleteUser: publicProcedure
    .input(idSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.delete({
        where: idSchema.parse(input),
      });
    }),
});
