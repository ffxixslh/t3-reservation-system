import {
  stringIdSchema,
  userIdSchema,
  subscriptionInfoSchema,
  subscriptionInfoUpdateSchema,
} from "~/schemas";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const subscriptionInfoRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.subscriptionInfo.findMany({
      include: {
        subscription: {
          include: {
            keys: true,
          },
        },
      },
    });
  }),
  getOne: protectedProcedure
    .input(userIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.subscriptionInfo.findUnique({
        where: {
          userId: input.userId,
        },
        include: {
          subscription: {
            include: {
              keys: true,
            },
          },
        },
      });
    }),
  createSubscriptionInfo: protectedProcedure
    .input(subscriptionInfoSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.subscriptionInfo.upsert({
        where: {
          userId: input.userId,
        },
        create: {
          userId: input.userId,
          subscription: {
            create: {
              endpoint: input.subscription.endpoint,
              keys: {
                create: input.subscription.keys,
              },
            },
          },
        },
        update: {
          subscription: {
            update: {
              endpoint: input.subscription.endpoint,
              keys: {
                update: input.subscription.keys,
              },
            },
          },
        },
      });
    }),
  updateSubscriptionInfo: protectedProcedure
    .input(subscriptionInfoUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.subscriptionInfo.update({
        where: stringIdSchema.parse(input),
        data: {
          subscription: {
            update: {
              endpoint: input.subscription.endpoint,
              keys: {
                update: input.subscription.keys,
              },
            },
          },
        },
      });
    }),
  deleteSubscriptionInfo: protectedProcedure
    .input(stringIdSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.subscriptionInfo.delete({
        where: stringIdSchema.parse(input),
      });
    }),
});
