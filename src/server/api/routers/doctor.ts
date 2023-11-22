import {
  hospitalIdSchema,
  stringIdSchema,
  doctorSchema,
  doctorUpdateSchema,
} from "~/schemas";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const doctorRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(hospitalIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.doctor.findMany({
        where: hospitalIdSchema.parse(input),
        include: {
          appointments: true,
          medicalRecords: true,
          department: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getOne: publicProcedure
    .input(stringIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.doctor.findUnique({
        where: stringIdSchema.parse(input),
        include: {
          appointments: true,
          medicalRecords: true,
          department: true,
        },
      });
    }),
  createDoctor: publicProcedure
    .input(doctorSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.doctor.create({
        data: doctorSchema.parse(input),
      });
    }),
  updateDoctor: publicProcedure
    .input(doctorUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.doctor.update({
        where: stringIdSchema.parse(input),
        data: doctorUpdateSchema.parse(input),
      });
    }),
  deleteDoctor: publicProcedure
    .input(stringIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.doctor.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
