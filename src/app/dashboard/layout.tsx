import React from "react";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
  title: {
    template: "%s | 后台管理系统",
    default: "后台管理系统",
  },
  description: "医疗预约系统。",
};

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full">{children}</div>
  );
}
