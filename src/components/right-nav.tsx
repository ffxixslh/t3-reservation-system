"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "~/lib/utils";

export function RightNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const adminRoutes = useMemo(
    () => [
      {
        href: `/dashboard`,
        label: "仪表板",
        active: pathname === `/dashboard`,
      },
    ],
    [pathname],
  );

  const commonRoutes = useMemo(
    () => [
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
      {session?.user.role === "ADMIN" &&
        adminRoutes.map((route) => (
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
      {!session &&
        commonRoutes.map((route) => (
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
      {session && (
        <Link
          href="/auth/signout"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          注销
        </Link>
      )}
    </nav>
  );
}
