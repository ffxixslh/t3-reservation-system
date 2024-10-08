import { createTRPCRouter } from "~/server/api/trpc";

import { hospitalRouter } from "~/server/api/routers/hospital";
import { adminRouter } from "~/server/api/routers/admin";
import { departmentRouter } from "~/server/api/routers/department";
import { doctorRouter } from "~/server/api/routers/doctor";
import { userRouter } from "~/server/api/routers/user";
import { appointmentRouter } from "~/server/api/routers/appointment";
import { recordRouter } from "~/server/api/routers/record";
import { subscriptionInfoRouter } from "~/server/api/routers/subscription";
import { chatRouter } from "~/server/api/routers/chat";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  hospital: hospitalRouter,
  hospitalAdmin: adminRouter,
  department: departmentRouter,
  doctor: doctorRouter,
  user: userRouter,
  appointment: appointmentRouter,
  record: recordRouter,
  subscriptionInfo: subscriptionInfoRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
