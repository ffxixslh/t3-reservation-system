"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "~/lib/utils";

export function DashboardMainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const params = useParams<{
    hospitalId: string;
  }>();

  const routes = useMemo(
    () => [
      {
        href: `/`,
        label: "首页",
        active: pathname === `/`,
      },
      {
        href: `/dashboard/${params.hospitalId}`,
        label: "总览",
        active:
          pathname === `/dashboard/${params.hospitalId}`,
      },
      {
        href: `/dashboard/${params.hospitalId}/departments`,
        label: "部门",
        active:
          pathname ===
          `/dashboard/${params.hospitalId}/departments`,
      },
      {
        href: `/dashboard/${params.hospitalId}/users`,
        label: "用户",
        active:
          pathname ===
          `/dashboard/${params.hospitalId}/users`,
      },
      {
        href: `/dashboard/${params.hospitalId}/doctors`,
        label: "医生",
        active:
          pathname ===
          `/dashboard/${params.hospitalId}/doctors`,
      },
      {
        href: `/dashboard/${params.hospitalId}/appointments`,
        label: "预约",
        active:
          pathname ===
          `/dashboard/${params.hospitalId}/appointments`,
      },
      {
        href: `/dashboard/${params.hospitalId}/records`,
        label: "病历",
        active:
          pathname ===
          `/dashboard/${params.hospitalId}/records`,
      },
      {
        href: `/dashboard/${params.hospitalId}/admins`,
        label: "管理员",
        active:
          pathname ===
          `/dashboard/${params.hospitalId}/admins`,
      },
      {
        href: `/dashboard/${params.hospitalId}/settings`,
        label: "设置",
        active:
          pathname ===
          `/dashboard/${params.hospitalId}/settings`,
      },
    ],
    [params.hospitalId, pathname],
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
