"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "~/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        href: `/`,
        label: "首页",
        active: pathname === `/`,
      },
      {
        href: `/auth/signin`,
        label: "登录",
        active: pathname === `/auth/signin`,
      },
      {
        href: `/auth/signup`,
        label: "注册",
        active: pathname === `/auth/signup`,
      },
    ],
    [pathname],
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
