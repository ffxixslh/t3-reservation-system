import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import type { Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";

import { ToastProvider } from "~/providers/toast-provider";
import { ThemeProvider } from "~/providers/theme-provider";
import { HospitalModalProvider } from "~/providers/hospital-modal-provider";
import { AuthSessionProvider } from "~/providers/auth-session-provider";

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
              <HospitalModalProvider />
              {children}
            </ThemeProvider>
          </AuthSessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
