import {
  hospitalIdSchema,
  stringIdSchema,
  userIdSchema,
  adminSchema,
  adminUpdateSchema,
} from "~/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(hospitalIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.hospitalAdmin.findMany({
        where: hospitalIdSchema.parse(input),
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getOneByAdminId: protectedProcedure
    .input(stringIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.hospitalAdmin.findUnique({
        where: stringIdSchema.parse(input),
      });
    }),
  getOneByUserId: publicProcedure
    .input(userIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.hospitalAdmin.findUnique({
        where: userIdSchema.parse(input),
      });
    }),
  createAdmin: protectedProcedure
    .input(adminSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.hospitalAdmin.create({
        data: adminSchema.parse(input),
      });
    }),
  updateAdmin: protectedProcedure
    .input(adminUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.hospitalAdmin.update({
        where: stringIdSchema.parse(input),
        data: adminSchema.parse(input),
      });
    }),
  deleteAdmin: protectedProcedure
    .input(stringIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.hospitalAdmin.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
