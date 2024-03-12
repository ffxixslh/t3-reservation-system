import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

import { env } from "~/env.mjs";
import { TSubscriptionInfo } from "~/types";
import { api } from "~/trpc/server";

webpush.setVapidDetails(
  "mailto:lhq12230@gmail.com",
  env.VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY,
);

export async function POST(request: NextRequest) {
  const result =
    (await request.json()) as TSubscriptionInfo | null;

  if (!result) {
    return;
  }

  const { userId, subscription } = result;

  if (!userId) {
    console.error("No userId was provided!");
    return;
  }

  if (!subscription) {
    console.error("No subscription was provided!");
    return;
  }

  const mutateResult =
    await api.subscriptionInfo.createSubscriptionInfo.mutate(
      {
        userId,
        subscription,
      },
    );

  return NextResponse.json({
    message: "push success",
    result: mutateResult,
  });
}
