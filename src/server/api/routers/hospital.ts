import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

const idSchema = z.object({ id: z.string() });

const hospitalSchema = z.object({
  name: z.string().min(1).max(32),
});

const hospitalUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const hospitalRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.hospital.findMany();
  }),
  getOne: publicProcedure
    .input(idSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.hospital.findUnique({
        where: idSchema.parse(input),
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
        where: { id: input.id },
        data: hospitalUpdateSchema.parse(input),
      });
    }),
  deleteHospital: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.hospital.delete({
        where: idSchema.parse(input),
      });
    }),
});
