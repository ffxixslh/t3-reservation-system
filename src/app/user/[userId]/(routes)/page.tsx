"use client";

import {
  BookOpenIcon,
  ClipboardEdit,
  ClipboardIcon,
  SettingsIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card } from "~/components/ui/card";

const UserPage = () => {
  const { data: session } = useSession();

  return (
    <div className="flex h-full flex-col">
      <div className="h-full rounded-lg p-4 ">
        <div className="text-center text-3xl font-bold">
          {session?.user.name}，欢迎回来
        </div>
        <div className="ml-2 py-2 text-xl font-bold">
          快速导航
        </div>
        <div className="grid gap-4 p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link
            href={`/user/${session?.user.id}/appointments/new`}
          >
            <Card className="flex items-end justify-evenly gap-4 py-4 hover:bg-[rgba(0,0,0,0.1)] hover:transition-all dark:hover:bg-[rgba(255,255,255,0.1)]">
              <ClipboardEdit className="h-20 w-20" />
              <span>创建预约</span>
            </Card>
          </Link>
          <Link
            href={`/user/${session?.user.id}/appointments`}
          >
            <Card className="flex items-end justify-evenly gap-4 py-4 hover:bg-[rgba(0,0,0,0.1)] hover:transition-all dark:hover:bg-[rgba(255,255,255,0.1)]">
              <ClipboardIcon className="h-20 w-20" />
              <span>查看预约</span>
            </Card>
          </Link>
          <Link href={`/user/${session?.user.id}/records`}>
            <Card className="flex items-end justify-evenly gap-4 py-4 hover:bg-[rgba(0,0,0,0.1)] hover:transition-all dark:hover:bg-[rgba(255,255,255,0.1)]">
              <BookOpenIcon className="h-20 w-20" />
              <span>查看病历</span>
            </Card>
          </Link>
          <Link href={`/user/${session?.user.id}/setting`}>
            <Card className="flex items-end justify-evenly gap-4 py-4 hover:bg-[rgba(0,0,0,0.1)] hover:transition-all dark:hover:bg-[rgba(255,255,255,0.1)]">
              <SettingsIcon className="h-20 w-20" />
              <span>个人设置</span>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
