import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";

import TransportClient from "~/server/transportClient";
import { env } from "~/env.mjs";
import { api } from "~/trpc/server";
import {
  TNotification,
  TNotificationContent,
  TSubscriptionInfo,
} from "~/types/system";
import NotificationCacheClient from "~/server/notificationCacheClient";

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

  switch (data.flag) {
    case "single": {
      const subscriptionInfo =
        await api.subscriptionInfo.getOne.query({
          userId: data.toUserId,
        });
      if (!subscriptionInfo) {
        return NextResponse.json({
          message: "no subscription found",
        });
      }

      handleNotification(data, subscriptionInfo);
      return;
    }

    case "broadcast": {
      const subscriptionInfos =
        await api.subscriptionInfo.getAll.query();
      if (!subscriptionInfos) {
        return NextResponse.json({
          message: "no subscriptions found",
        });
      }

      subscriptionInfos.forEach((subscriptionInfo) => {
        handleNotification(data, subscriptionInfo);
      });
      return;
    }

    default:
      break;
  }

  return NextResponse.json({
    message: "success",
  });
}

/**
 * Handles the notification by sending it to the subscription and updating the notification cache.
 *
 * @param {TNotificationContent} data - the notification content
 * @param {TSubscriptionInfo} subscriptionInfo - the subscription information
 */
export function handleNotification(
  data: TNotificationContent,
  subscriptionInfo: TSubscriptionInfo,
) {
  webPush.sendNotification(
    subscriptionInfo.subscription,
    JSON.stringify(data.notification),
  );

  TransportClient.notify(
    {
      type: "notification",
      data: data,
    },
    (notification) => {
      NotificationCacheClient.setNotification(
        subscriptionInfo.userId,
        notification as TNotification,
      );
    },
  );
}

export async function GET(request: NextRequest) {
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
