"use client";

import { UserMainNav } from "~/components/user/user-main-nav";
import { ThemeToggle } from "~/components/theme-toggle";
import { UserMenu } from "./user-menu";
import { useUserInfoContext } from "~/providers/user/user-info-provider";

export default function UserNavbar() {
  const user = useUserInfoContext();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <UserMainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserMenu user={user} />
        </div>
      </div>
    </div>
  );
}
