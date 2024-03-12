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

export type TNotifyWays = {
  push: boolean;
  mail: boolean;
  notify: boolean;
};
