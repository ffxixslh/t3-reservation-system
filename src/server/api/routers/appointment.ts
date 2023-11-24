import {
  hospitalIdSchema,
  stringIdSchema,
  appointmentSchema,
  appointmentUpdateSchema,
} from "~/schemas";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const appointmentRouter = createTRPCRouter({
  getAll: publicProcedure
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
  getOne: publicProcedure
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
  createAppointment: publicProcedure
    .input(appointmentSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.create({
        data: appointmentSchema.parse(input),
      });
    }),
  updateAppointment: publicProcedure
    .input(appointmentUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.update({
        where: stringIdSchema.parse(input),
        data: appointmentUpdateSchema.parse(input),
      });
    }),
  deleteAppointment: publicProcedure
    .input(stringIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.appointment.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
