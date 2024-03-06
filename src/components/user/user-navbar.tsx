"use client";

import { UserMainNav } from "~/components/user/user-main-nav";
import { UserMenu } from "~/components/user/user-menu";
import Navbar from "~/components/navbar";
import { IconNav } from "~/components/icon-nav";

export default function UserNavbar() {
  return (
    <Navbar
      mainNav={<UserMainNav className="mx-6" />}
      subNav={<UserMenu />}
      iconNav={<IconNav />}
    />
  );
}
