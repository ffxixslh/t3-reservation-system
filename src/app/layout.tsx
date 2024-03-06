import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import type { Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";

import { ToastProvider } from "~/providers/toast-provider";
import { ThemeProvider } from "~/providers/theme-provider";
import { AuthSessionProvider } from "~/providers/auth-session-provider";
import { UserInfoProvider } from "~/providers/user/user-info-provider";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 医疗预约系统",
    default: "医疗预约系统",
  },
  description: "医疗预约系统。",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  const userInfo = session?.user
    ? await api.user.getOneById.query({
        id: session.user.id,
      })
    : null;

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <AuthSessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <ToastProvider />
              <UserInfoProvider value={userInfo}>
                {children}
              </UserInfoProvider>
            </ThemeProvider>
          </AuthSessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
