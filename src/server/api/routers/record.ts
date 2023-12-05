import {
  hospitalIdSchema,
  stringIdSchema,
  recordUpdateSchema,
} from "~/schemas";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const recordRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(hospitalIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.medicalRecord.findMany({
        where: hospitalIdSchema.parse(input),
        include: {
          doctor: true,
          patient: true,
          texts: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getOne: publicProcedure
    .input(stringIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.medicalRecord.findUnique({
        where: stringIdSchema.parse(input),
        include: {
          doctor: true,
          patient: true,
          texts: true,
        },
      });
    }),
  createRecord: publicProcedure
    .input(recordUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.medicalRecord.create({
        data: {
          ...input,
          texts: {
            createMany: {
              data: input.texts,
            },
          },
        },
      });
    }),
  updateRecord: publicProcedure
    .input(recordUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.medicalRecord.update({
        where: stringIdSchema.parse(input),
        data: {
          ...input,
          texts: {
            deleteMany: {
              medicalRecordId: input.id,
            },
            createMany: {
              data: input.texts,
            },
          },
        },
      });
    }),
  deleteRecord: publicProcedure
    .input(stringIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.medicalRecord.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
