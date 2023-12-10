import {
  stringIdSchema,
  appointmentSchema,
  appointmentUpdateSchema,
  hospitalIdSchema,
} from "~/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const appointmentRouter = createTRPCRouter({
  getAllByHospitalId: protectedProcedure
    .input(hospitalIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.appointment.findMany({
        where: hospitalIdSchema.parse(input),
        include: {
          doctor: true,
          patient: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getAllByPatientId: protectedProcedure.query(
    async ({ ctx }) => {
      return await ctx.db.appointment.findMany({
        where: {
          patientId: ctx.session.user.id,
        },
        include: {
          doctor: true,
          patient: true,
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
      return await ctx.db.appointment.findUnique({
        where: stringIdSchema.parse(input),
        include: {
          doctor: true,
          patient: true,
        },
      });
    }),
  createAppointment: protectedProcedure
    .input(appointmentSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.create({
        data: appointmentSchema.parse(input),
      });
    }),
  updateAppointment: protectedProcedure
    .input(appointmentUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.update({
        where: stringIdSchema.parse(input),
        data: appointmentUpdateSchema.parse(input),
      });
    }),
  deleteAppointment: protectedProcedure
    .input(stringIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
