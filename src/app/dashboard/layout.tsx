import React from "react";
import { type Metadata } from "next";

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
  await Promise.resolve();
  return <div className="h-full w-full">{children}</div>;
}
