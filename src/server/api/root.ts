import { hospitalRouter } from "~/server/api/routers/hospital";
import { departmentRouter } from "~/server/api/routers/department";
import { doctorRouter } from "./routers/doctor";
import { userRouter } from "~/server/api/routers/user";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  hospital: hospitalRouter,
  department: departmentRouter,
  doctor: doctorRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
