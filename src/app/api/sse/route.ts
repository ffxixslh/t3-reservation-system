import { NextRequest, NextResponse } from "next/server";

import TransportClient from "~/server/transportClient";
import NotificationCacheClient from "~/server/notificationCacheClient";

const formatSSEContent = (data: unknown) =>
  `data: ${JSON.stringify(data)}\n\n`;

export async function GET(request: NextRequest) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({
      message: "no userId provided",
    });
  }

  const unsubscribeFn = TransportClient.subscribe(
    userId,
    (data) => {
      void writer.write(formatSSEContent(data));
    },
  );

  request.signal.onabort = () => {
    unsubscribeFn();
    void writer.close();
  };

  NotificationCacheClient.getNotification(userId).forEach(
    (data) => {
      setTimeout(() => {
        void writer.write(formatSSEContent(data));
      }, 500);
    },
  );

  return new NextResponse(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
