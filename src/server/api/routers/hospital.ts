import {
  stringIdSchema,
  hospitalSchema,
  hospitalUpdateSchema,
} from "~/schemas";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const hospitalRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.hospital.findMany();
  }),
  getOne: publicProcedure
    .input(stringIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.hospital.findUnique({
        where: stringIdSchema.parse(input),
      });
    }),
  createHospital: publicProcedure
    .input(hospitalSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.hospital.create({
        data: hospitalSchema.parse(input),
      });
    }),
  updateHospital: publicProcedure
    .input(hospitalUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.hospital.update({
        where: stringIdSchema.parse(input),
        data: hospitalUpdateSchema.parse(input),
      });
    }),
  deleteHospital: publicProcedure
    .input(stringIdSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.hospital.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
