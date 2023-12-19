"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "~/lib/utils";

export function DoctorMainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const params = useParams<{
    doctorId: string;
  }>();

  const routes = useMemo(
    () => [
      {
        href: `/`,
        label: "首页",
        active: pathname === `/`,
      },
      {
        href: `/doctor/${params.doctorId}`,
        label: "总览",
        active: pathname === `/doctor/${params.doctorId}`,
      },
      {
        href: `/doctor/${params.doctorId}/appointments`,
        label: "预约",
        active:
          pathname ===
          `/doctor/${params.doctorId}/appointments`,
      },
      {
        href: `/doctor/${params.doctorId}/records`,
        label: "病历",
        active:
          pathname === `/doctor/${params.doctorId}/records`,
      },
      {
        href: `/doctor/${params.doctorId}/settings`,
        label: "设置",
        active:
          pathname ===
          `/doctor/${params.doctorId}/settings`,
      },
    ],
    [params.doctorId, pathname],
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
