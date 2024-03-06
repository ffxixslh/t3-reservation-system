"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  CreditCard,
  LogOut,
  PlusCircle,
  Settings,
  User,
} from "lucide-react";

import { type TUserOrigin } from "~/types";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useUserInfoContext } from "~/providers/user/user-info-provider";

interface UserMenuProps {}

export const UserMenu: React.FC<UserMenuProps> = () => {
  const user = useUserInfoContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex place-items-center"
        asChild
      >
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/avatar.png"
              alt={user?.name}
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.phone}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>{"预约"}</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>{"病历"}</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>{"设置"}</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={"/api/auth/signout"}
            className="flex-1"
          >
            <div className="flex w-full">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{"注销"}</span>
            </div>
          </Link>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
