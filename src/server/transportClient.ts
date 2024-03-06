import { TNotificationContent } from "~/types";

type TUnsubscribeFn = () => void;

type TSubscriberFn = (data: unknown) => void;

type TTransportData = {
  type: TTransportDataType;
  data: unknown;
};

type TTransportDataType = "notification" | "signaling";

const transportClient = () => {
  const subscribers = new Map<string, TSubscriberFn>();

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
    const nextSubscribers = subscribers.set(
      userId,
      subscriberFn,
    );
    console.log(
      "========nextSubscribers========\n",
      nextSubscribers,
    );

    return () => nextSubscribers.delete(userId);
  };

  /**
   * Notify function to handle different types of transport data.
   *
   * @param {TTransportData} transportData - the transport data to be processed
   * @return {boolean} indicates whether the notification was successfully handled
   */
  const notify = async (
    transportData: TTransportData,
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
          const subscriberFn = subscribers.get(toUserId);
          console.log(
            "========subscriberFn========\n",
            subscriberFn,
          );

          if (!subscriberFn) {
            return false;
          }
          subscriberFn(notification);
          return true;
        } else if (flag === "broadcast") {
          subscribers.forEach((s) => s(notification));
          return true;
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

  const getAll = () => subscribers;

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
