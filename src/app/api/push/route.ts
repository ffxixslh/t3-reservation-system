import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";

import TransportClient from "~/server/transportClient";
import { env } from "~/env.mjs";
import { api } from "~/trpc/server";
import {
  TNotification,
  TNotificationContent,
} from "~/types/system";

webPush.setVapidDetails(
  "mailto:lhq12230@gmail.com",
  env.VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY,
);

export async function POST(request: NextRequest) {
  const data =
    (await request.json()) as TNotificationContent | null;

  if (!data) {
    return NextResponse.json({
      message: "no data provided",
    });
  }

  const { toUserId, notification, flag } = data;

  switch (flag) {
    case "single":
      const subscriptionInfo =
        await api.subscriptionInfo.getOne.query({
          userId: toUserId,
        });
      if (!subscriptionInfo) {
        return NextResponse.json({
          message: "no subscription found",
        });
      }

      webPush.sendNotification(
        subscriptionInfo.subscription,
        JSON.stringify(notification),
      );

      console.log(
        "++++++++ push getAll ++++++++\n",
        TransportClient.getAll(),
      );

      TransportClient.notify({
        type: "notification",
        data: data,
      });
      break;
    case "broadcast":
      const subscriptionInfos =
        await api.subscriptionInfo.getAll.query();
      if (!subscriptionInfos) {
        return NextResponse.json({
          message: "no subscriptions found",
        });
      }

      subscriptionInfos.forEach(async (s) => {
        webPush.sendNotification(
          s.subscription,
          JSON.stringify(notification),
        );
        TransportClient.notify({
          type: "notification",
          data: notification,
        });
      });
      break;
    default:
      // handle default case here
      break;
  }

  return NextResponse.json({
    message: "success",
  });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const subscriptions =
    await api.subscriptionInfo.getAll.query();

  subscriptions.forEach((s) => {
    const payload: TNotification = {
      title: "WebPush Notification!",
      options: {
        body: "Hello World",
      },
    };
    webPush.sendNotification(
      s.subscription,
      JSON.stringify(payload),
    );
  });

  return NextResponse.json({
    message: `${subscriptions.length} messages sent!`,
  });
}
