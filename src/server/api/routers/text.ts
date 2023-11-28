import {
  stringIdSchema,
  textSchema,
  textUpdateSchema,
} from "~/schemas";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const textRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.text.findMany();
  }),
  getOne: publicProcedure
    .input(stringIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.text.findUnique({
        where: stringIdSchema.parse(input),
      });
    }),
  createText: publicProcedure
    .input(textSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.text.create({
        data: textSchema.parse(input),
      });
    }),
  updateText: publicProcedure
    .input(textUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.text.update({
        where: stringIdSchema.parse(input),
        data: textUpdateSchema.parse(input),
      });
    }),
  deleteText: publicProcedure
    .input(stringIdSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.text.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
