"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import Navbar from "~/components/navbar";
import { LeftNav } from "~/components/left-nav";
import { RightNav } from "~/components/right-nav";
import { IconNav } from "~/components/icon-nav";
import { Card } from "~/components/ui/card";
import {
  UserIcon,
  BriefcaseMedical,
  LogInIcon,
  PlusSquareIcon,
} from "lucide-react";
import { redirect } from "next/navigation";

const HomePage = () => {
  const { data: session } = useSession();

  if (
    session &&
    session.user.role !== "ADMIN" &&
    session.user.role !== "DOCTOR"
  ) {
    redirect(`/user/${session.user.id}`);
  }

  return (
    <main className="flex h-full flex-col">
      <Navbar
        mainNav={<LeftNav />}
        subNav={<RightNav />}
        iconNav={<IconNav />}
      />
      <div className="flex h-full flex-col gap-12 px-4 py-16 dark:text-white">
        {session ? (
          <div className="h-full rounded-lg p-4 ">
            <div className="text-center text-3xl font-bold">
              {session.user.name}，欢迎回来
            </div>
            <div className="ml-2 py-2 text-xl font-bold">
              权限导航
            </div>
            <div className="grid gap-4 p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Link href={`/user/${session.user.id}`}>
                <Card className="flex items-end justify-evenly gap-4 py-4 hover:bg-[rgba(0,0,0,0.1)] hover:transition-all dark:hover:bg-[rgba(255,255,255,0.1)]">
                  <UserIcon className="h-20 w-20" />
                  <span>用户空间</span>
                </Card>
              </Link>
              {session.user.role === "DOCTOR" && (
                <Link
                  href={`/doctor/${session.user.doctorId}`}
                >
                  <Card className="flex items-end justify-evenly gap-4 py-4 hover:bg-[rgba(0,0,0,0.1)] hover:transition-all dark:hover:bg-[rgba(255,255,255,0.1)]">
                    <BriefcaseMedical className="h-20 w-20" />
                    <span>医生空间</span>
                  </Card>
                </Link>
              )}
              {session.user.role === "ADMIN" && (
                <Link href={`/dashboard`}>
                  <Card className="flex items-end justify-evenly gap-4 py-4 hover:bg-[rgba(0,0,0,0.1)] hover:transition-all dark:hover:bg-[rgba(255,255,255,0.1)]">
                    <UserIcon className="h-20 w-20" />
                    <span>仪表板</span>
                  </Card>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full rounded-lg p-4 ">
            <div className="text-center text-3xl font-bold">
              欢迎使用智能医疗预约系统
            </div>
            <div className="ml-2 py-2 text-xl font-bold">
              快速导航
            </div>
            <div className="grid gap-4 p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Link href="/auth/signin">
                <Card className="flex items-end justify-evenly gap-4 py-4 hover:bg-[rgba(0,0,0,0.1)] hover:transition-all dark:hover:bg-[rgba(255,255,255,0.1)]">
                  <LogInIcon className="h-20 w-20" />
                  <span>登录</span>
                </Card>
              </Link>
              <Link href="/auth/signup">
                <Card className="flex items-end justify-evenly gap-4 py-4 hover:bg-[rgba(0,0,0,0.1)] hover:transition-all dark:hover:bg-[rgba(255,255,255,0.1)]">
                  <PlusSquareIcon className="h-20 w-20" />
                  <span>注册</span>
                </Card>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default HomePage;
