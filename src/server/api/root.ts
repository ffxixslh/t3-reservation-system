import { userRouter } from "~/server/api/routers/user";
import { hospitalRouter } from "~/server/api/routers/hospital";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  hospital: hospitalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
