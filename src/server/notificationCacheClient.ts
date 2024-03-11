import { TNotification } from "~/types";

const notificationCacheClient = () => {
  const userNotificationsMap = new Map<
    string,
    TNotification[]
  >();

  /**
   * Sets a notification for a specific user.
   *
   * @param {string} userId - the ID of the user
   * @param {TNotification} data - the notification data to be set
   * @return {boolean} true if the notification was successfully set, false otherwise
   */
  const setNotification = (
    userId: string,
    data: TNotification,
  ): boolean => {
    const userNotification =
      upsertUserNotificationMap(userId).get(userId);

    if (!userNotification) {
      return false;
    }

    userNotification.push(data);
    return true;
  };

  /**
   * Get the notifications for the specified user.
   *
   * @param {string} userId - The ID of the user
   * @return {Array<TNotification>} The notifications for the user
   */
  const getNotification = (
    userId: string,
  ): Array<TNotification> => {
    const userNotification =
      upsertUserNotificationMap(userId).get(userId);

    if (!userNotification) {
      return [];
    }

    return userNotification;
  };

  const upsertUserNotificationMap = (userId: string) => {
    if (!userNotificationsMap.has(userId)) {
      return userNotificationsMap.set(userId, []);
    }
    return userNotificationsMap;
  };

  return {
    setNotification,
    getNotification,
  };
};

declare global {
  var NotificationClient: ReturnType<
    typeof notificationCacheClient
  >;
}

let NotificationCacheClient: ReturnType<
  typeof notificationCacheClient
>;

if (process.env.NODE_ENV === "production") {
  NotificationCacheClient = notificationCacheClient();
} else {
  if (!global.NotificationClient) {
    global.NotificationClient = notificationCacheClient();
  }
  NotificationCacheClient = global.NotificationClient;
}
export default NotificationCacheClient;
