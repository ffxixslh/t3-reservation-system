import React from "react";
import { type Metadata } from "next";
import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
  title: {
    template: "%s | 医疗预约系统",
    default: "医疗预约系统",
  },
  description: "医疗预约系统。",
};

export default async function UserRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen w-full">{children}</div>
  );
}
