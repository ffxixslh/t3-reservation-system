import {
  TNotification,
  TNotificationContent,
} from "~/types";

type TUnsubscribeFn = () => void;

type TSubscriberFn = (data: unknown) => void;

type TFallbackFn = (data: unknown) => void;

type TTransportData = {
  type: TTransportDataType;
  data: unknown;
};

type TTransportDataType = "notification" | "signaling";

const transportClient = () => {
  const subscriberFns = new Map<string, TSubscriberFn>();

  /**
   * Subscribe a user to the subscriber function.
   *
   * @param {string} userId - the ID of the user
   * @param {TSubscriberFn} subscriberFn - the subscriber function
   * @return {TUnsubscribeFn} a function to unsubscribe the user
   */
  const subscribe = (
    userId: string,
    subscriberFn: TSubscriberFn,
  ): TUnsubscribeFn => {
    const nextSubscribers = subscriberFns.set(
      userId,
      subscriberFn,
    );

    return () => nextSubscribers.delete(userId);
  };

  /**
   * Notify function to handle different types of transport data.
   *
   * @param {TTransportData} transportData - the transport data to be processed
   * @param {TFallbackFn} fallbackFn - the fallback function to be called in case of an error
   * @return {Promise<boolean>} indicates whether the notification was successfully handled
   */
  const notify = async (
    transportData: TTransportData,
    fallbackFn?: TFallbackFn,
  ): Promise<boolean> => {
    const { type, data } = transportData;
    console.log(
      "========transportData========\n",
      transportData,
    );

    switch (type) {
      case "notification": {
        const { flag, toUserId, notification } =
          data as TNotificationContent;

        if (flag === "single") {
          const subscriberFn = subscriberFns.get(toUserId);
          return handleNotification(
            subscriberFn,
            notification,
            fallbackFn,
          );
        }

        if (flag === "broadcast") {
          subscriberFns.forEach((subscriberFn) => {
            return handleNotification(
              subscriberFn,
              notification,
              fallbackFn,
            );
          });
        }

        return false;
      }

      case "signaling": {
        return true;
      }

      default: {
        return false;
      }
    }
  };

  const getAll = () => subscriberFns;

  const handleNotification = (
    subscriberFn: TSubscriberFn | undefined,
    notification: TNotification,
    fallbackFn?: TFallbackFn,
  ) => {
    if (!subscriberFn && fallbackFn) {
      fallbackFn(notification);
      return true;
    }

    if (!subscriberFn) {
      return false;
    }

    subscriberFn(notification);
    return true;
  };

  return {
    subscribe,
    notify,
    getAll,
  };
};

declare global {
  var TransportClient: ReturnType<typeof transportClient>;
}

let TransportClient: ReturnType<typeof transportClient>;

if (process.env.NODE_ENV === "production") {
  TransportClient = transportClient();
} else {
  if (!global.TransportClient) {
    global.TransportClient = transportClient();
  }
  TransportClient = global.TransportClient;
}

export default TransportClient;
