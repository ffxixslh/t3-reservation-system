import {
  stringIdSchema,
  hospitalSchema,
  hospitalUpdateSchema,
} from "~/schemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const hospitalRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.hospital.findMany();
  }),
  getOne: protectedProcedure
    .input(stringIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.hospital.findUnique({
        where: stringIdSchema.parse(input),
      });
    }),
  createHospital: protectedProcedure
    .input(hospitalSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.hospital.create({
        data: hospitalSchema.parse(input),
      });
    }),
  updateHospital: protectedProcedure
    .input(hospitalUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.hospital.update({
        where: stringIdSchema.parse(input),
        data: hospitalUpdateSchema.parse(input),
      });
    }),
  deleteHospital: protectedProcedure
    .input(stringIdSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.hospital.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
