"use client";

import { UserMainNav } from "~/components/user/user-main-nav";
import { UserMenu } from "../user-menu";
import { useUserInfoContext } from "~/providers/user/user-info-provider";
import Navbar from "../navbar";

export default function UserNavbar() {
  const user = useUserInfoContext();

  return (
    <Navbar
      mainNav={<UserMainNav className="mx-6" />}
      subNav={<UserMenu user={user} />}
    />
  );
}
