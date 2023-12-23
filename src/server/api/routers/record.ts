import {
  hospitalIdSchema,
  stringIdSchema,
  recordSchema,
  recordUpdateSchema,
} from "~/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const recordRouter = createTRPCRouter({
  getAllByHospitalId: protectedProcedure
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
  getAllByPatientId: protectedProcedure.query(
    async ({ ctx }) => {
      return await ctx.db.medicalRecord.findMany({
        where: {
          patientId: ctx.session.user.id,
        },
        include: {
          doctor: true,
          patient: true,
          texts: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  ),
  getAllByDoctorId: protectedProcedure.query(
    async ({ ctx }) => {
      return await ctx.db.medicalRecord.findMany({
        where: {
          doctorId: ctx.session.user.doctorId,
        },
        include: {
          doctor: true,
          patient: true,
          texts: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  ),
  getOne: protectedProcedure
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
  createRecord: protectedProcedure
    .input(recordSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.medicalRecord.create({
        data: {
          ...recordSchema.parse(input),
          texts: {
            createMany: {
              data: input.texts,
            },
          },
        },
      });
    }),
  updateRecord: protectedProcedure
    .input(recordUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.medicalRecord.update({
        where: stringIdSchema.parse(input),
        data: {
          ...recordSchema.parse(input),
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
  deleteRecord: protectedProcedure
    .input(stringIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.medicalRecord.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
