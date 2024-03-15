import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";

import TransportClient from "~/server/transportClient";
import { env } from "~/env.mjs";
import { api } from "~/trpc/server";
import {
  TNotification,
  TNotificationContent,
  TNotifyWays,
  TSubscriptionInfo,
} from "~/types";
import NotificationCacheClient from "~/server/notificationCacheClient";
import MailerClient from "~/server/mailerClient";

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
 * @param {object} ways - the ways to handle the notification
 */
export async function handleNotification(
  data: TNotificationContent,
  subscriptionInfo: TSubscriptionInfo,
  ways: TNotifyWays = {
    push: true,
    notify: true,
    mail: true,
  },
) {
  const { push, notify, mail } = ways;

  if (push) {
    webPush.sendNotification(
      subscriptionInfo.subscription,
      JSON.stringify(data.notification),
    );
  }

  if (notify) {
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

  if (mail) {
    const user = await api.user.getOneById.query({
      id: subscriptionInfo.userId,
    });
    if (!user) {
      return;
    }

    if (!user.email) {
      return;
    }

    MailerClient.sendMail({
      from: `医疗预约系统 <${env.STMP_USER}>`,
      to: user.email,
      subject: "预约信息通知",
      html: `
      <h1>${data.notification.title}</h1>
      <p>${data.notification.options.body}</p>
    `,
    });
  }
}
