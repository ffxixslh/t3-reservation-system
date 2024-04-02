import React from "react";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { HospitalModalProvider } from "~/providers/hospital-modal-provider";
import { getServerAuthSession } from "~/server/auth";
import NotFound from "../not-found";

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
    return <NotFound />;
  }

  return (
    <div className="min-h-screen w-full">
      <HospitalModalProvider />
      {children}
    </div>
  );
}
