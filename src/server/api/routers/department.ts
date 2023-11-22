import {
  stringIdSchema,
  departmentSchema,
  departmentUpdateSchema,
  hospitalIdSchema,
} from "~/schemas";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(hospitalIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.department.findMany({
        where: hospitalIdSchema.parse(input),
        include: {
          doctors: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),
  getOne: publicProcedure
    .input(stringIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.department.findUnique({
        where: stringIdSchema.parse(input),
        include: {
          doctors: true,
        },
      });
    }),
  createDepartment: publicProcedure
    .input(departmentSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.department.create({
        data: departmentSchema.parse(input),
      });
    }),
  updateDepartment: publicProcedure
    .input(departmentUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.department.update({
        where: stringIdSchema.parse(input),
        data: departmentUpdateSchema.parse(input),
      });
    }),
  deleteDepartment: publicProcedure
    .input(stringIdSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.department.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
