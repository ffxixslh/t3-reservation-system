"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "~/lib/utils";

export function UserMainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const params = useParams<{
    userId: string;
  }>();

  const routes = useMemo(
    () => [
      {
        href: `/user/${params.userId}`,
        label: "总览",
        active: pathname === `/user/${params.userId}`,
      },
      {
        href: `/user/${params.userId}/appointments`,
        label: "预约",
        active:
          pathname ===
          `/user/${params.userId}/appointments`,
      },
      {
        href: `/user/${params.userId}/records`,
        label: "病历",
        active:
          pathname === `/user/${params.userId}/records`,
      },
      {
        href: `/user/${params.userId}/settings`,
        label: "设置",
        active:
          pathname === `/user/${params.userId}/settings`,
      },
    ],
    [params.userId, pathname],
  );

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6",
        className,
      )}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "font-bold text-black dark:text-white"
              : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
