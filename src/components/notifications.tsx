"use client";

import * as idb from "idb";
import { User, BellIcon, BellRing } from "lucide-react";

import { env } from "~/env.mjs";
import { urlBase64ToUint8Array } from "~/lib/utils";
import { useUserInfoContext } from "~/providers/user/user-info-provider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  TNotification,
  TNotificationContent,
} from "~/types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const notificationsSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window;

export default function Notifications() {
  const [messages, setMessages] = useState<string[]>([]);

  const user = useUserInfoContext();
  const { data: session } = useSession();

  if (!user) {
    return null;
  }

  if (!notificationsSupported()) {
    return <div>您的浏览器不支持通知推送服务</div>;
  }

  useEffect(() => {
    if (!session) {
      return;
    }

    const eventSource = new EventSource(
      `/api/sse?userId=${session.user.id}`,
    );

    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        event.data as string,
      ]);
    };

    eventSource.onerror = (error) => {
      console.error("Error occurred:", error);
      eventSource.close();
    };

    return () => {
      // Clean up event source on component unmount
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }

    const parsedMessages = messages.map((m) => {
      return JSON.parse(m) as TNotification;
    }) as TNotification[];

    saveNotificationsToIndexedDB(
      session.user.id,
      parsedMessages,
    ).catch((err) => {
      console.error(`[Notifications Error] ${err}`);
    });
  }, [messages]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <BellIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="center"
        forceMount
      >
        <DropdownMenuLabel className="grid place-items-center font-normal">
          {Notification.permission !== "granted" ? (
            <Button
              variant="outline"
              onClick={subscribe(user.id)}
            >
              订阅通知
            </Button>
          ) : (
            <div>{`通知 (${messages.length})`}</div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {messages.map((message, index) => {
            const messageJson = JSON.parse(
              message,
            ) as TNotification;
            return (
              <DropdownMenuItem key={message}>
                <div className="flex w-full items-center gap-x-2">
                  <div className="flex h-10 w-10 place-items-center">
                    {messageJson.options.image ? (
                      <Image
                        src={messageJson.options.image}
                        alt={messageJson.title}
                        sizes={"40px"}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <BellRing />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="text-lg">
                      {messageJson.title}
                    </div>
                    <div className="truncate">
                      {messageJson.options.body}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const unregisterServiceWorkers = async () => {
  const registrations =
    await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    registrations.map((r) => r.unregister()),
  );
};

const registerServiceWorker = () => {
  return navigator.serviceWorker.register(`/sw.js`);
};

const subscribe = (userId: string) => async () => {
  await unregisterServiceWorkers();

  const swRegistration = await registerServiceWorker();

  try {
    const options = {
      applicationServerKey: urlBase64ToUint8Array(
        env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      ),
      userVisibleOnly: true,
    };
    const subscription =
      await swRegistration.pushManager.subscribe(options);

    await saveSubscription(userId, subscription);

    await saveSubscriptionToIndexedDB(userId, subscription);
  } catch (err) {
    console.error("Error", err);
  }
};

const saveSubscription = async (
  userId: string,
  subscription: PushSubscription,
) => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/subscribe`;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      subscription,
    }),
  });

  return response.json();
};

async function saveSubscriptionToIndexedDB(
  userId: string,
  subscription: PushSubscription,
) {
  try {
    const db = await idb.openDB("rs-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("subscription")) {
          const store = db.createObjectStore(
            "subscription",
            {
              keyPath: "p256d",
            },
          );
          const key = subscription.getKey("p256dh");
          if (!key) {
            return;
          }

          const indexKey =
            typeof key === "string"
              ? key
              : new TextDecoder().decode(key);

          store.createIndex("p256d", indexKey, {
            unique: true,
          });
        }
      },
    });

    const tx = db.transaction("subscription", "readwrite");
    await Promise.all([
      tx.store.put(
        JSON.parse(
          JSON.stringify({
            userId,
            subscription,
          }),
        ),
      ),
      tx.done,
    ]);

    db.close();
  } catch (error) {
    console.log(`[saveSubscriptionToIndexedDB]`, error);
  }
}

async function saveNotificationsToIndexedDB(
  userId: string,
  notifications: TNotification[],
) {
  if (notifications.length === 0) {
    return;
  }

  try {
    const db = await idb.openDB("rs-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("notification")) {
          const store = db.createObjectStore(
            "notification",
            {
              keyPath: `notification_${userId}`,
            },
          );
          store.createIndex(
            `notification_${userId}`,
            userId,
            {
              unique: true,
            },
          );
        }
      },
    });

    const tx = db.transaction("notification", "readwrite");
    await Promise.all([
      tx.store.put(
        JSON.parse(
          JSON.stringify({
            userId,
            notifications,
          }),
        ),
      ),
      tx.done,
    ]);

    db.close();
  } catch (error) {
    console.error(`[saveNotificationsToIndexedDB]`, error);
  }
}
