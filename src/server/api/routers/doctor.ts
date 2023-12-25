import {
  hospitalIdSchema,
  stringIdSchema,
  doctorSchema,
  doctorUpdateSchema,
  userIdSchema,
} from "~/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const doctorRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(hospitalIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.doctor.findMany({
        where: hospitalIdSchema.parse(input),
        include: {
          appointments: true,
          medicalRecords: true,
          department: true,
          dateRange: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getOneByDoctorId: protectedProcedure
    .input(stringIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.doctor.findUnique({
        where: stringIdSchema.parse(input),
        include: {
          appointments: true,
          medicalRecords: true,
          department: true,
          dateRange: true,
        },
      });
    }),
  getOneByUserId: publicProcedure
    .input(userIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.doctor.findUnique({
        where: userIdSchema.parse(input),
      });
    }),
  createDoctor: protectedProcedure
    .input(doctorSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.doctor.create({
        data: {
          ...doctorSchema.parse(input),
          dateRange: {
            create: {
              ...input.dateRange,
            },
          },
        },
      });
    }),
  updateDoctor: protectedProcedure
    .input(doctorUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.doctor.update({
        where: stringIdSchema.parse(input),
        data: {
          ...doctorSchema.parse(input),
          dateRange: {
            upsert: {
              update: {
                ...input.dateRange,
              },
              create: {
                ...input.dateRange,
              },
            },
          },
        },
      });
    }),
  deleteDoctor: protectedProcedure
    .input(stringIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.doctor.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
