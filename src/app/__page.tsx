"use client";
import dynamic from "next/dynamic";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const Notifications = dynamic(
  () => import("~/components/notifications"),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <div>
      <div>
        <div className="text-2xl font-bold">
          Service Worker Example
        </div>
        <Notifications />
      </div>
    </div>
  );
}
