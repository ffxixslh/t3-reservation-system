import { PushSubscription } from "web-push";

export type TSubscriptionInfo = {
  userId: string;
  subscription: PushSubscription;
};

export type TNotification = {
  title: string;
  options: NotificationOptions;
};

export type TNotificationContent = {
  flag: "single" | "broadcast";
  fromUserId: string;
  toUserId: string;
  notification: TNotification;
};
