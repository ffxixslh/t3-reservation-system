"use client";

import dynamic from "next/dynamic";
import { ThemeToggle } from "~/components/theme-toggle";

import { cn } from "~/lib/utils";

const Notifications = dynamic(
  () => import("~/components/notifications"),
  {
    ssr: false,
  },
);

export function IconNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6",
        className,
      )}
      {...props}
    >
      <Notifications />
      <ThemeToggle />
    </nav>
  );
}
