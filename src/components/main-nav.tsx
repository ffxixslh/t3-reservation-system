"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

interface ParamsProps {
  hospitalId: string;
  [key: string]: string;
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams<ParamsProps>();

  const routes = [
    {
      href: `/dashboard/${params.hospitalId}`,
      label: "总览",
      active: pathname === `/`,
    },
    {
      href: `/dashboard/${params.hospitalId}/billboards`,
      label: "看板",
      active: pathname === `/billboards`,
    },
    {
      href: `/dashboard/${params.hospitalId}/doctors`,
      label: "医生",
      active: pathname === `/doctors`,
    },
    {
      href: `/dashboard/${params.hospitalId}/patients`,
      label: "患者",
      active: pathname === `/patients`,
    },
    {
      href: `/dashboard/${params.hospitalId}/appointments`,
      label: "预约",
      active: pathname === `/appointments`,
    },
    {
      href: `/dashboard/${params.hospitalId}/admins`,
      label: "管理员",
      active: pathname === `/admins`,
    },
    {
      href: `/dashboard/${params.hospitalId}/settings`,
      label: "设置",
      active: pathname === `/settings`,
    },
  ];

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
