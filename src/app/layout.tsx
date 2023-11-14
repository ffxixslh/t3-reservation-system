import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import type { Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import { ModalProvider } from "~/providers/modal-provider";
import { ToastProvider } from "~/providers/toast-provider";
import { ThemeProvider } from "~/providers/theme-provider";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Reservation System Dashboard",
    default: "Dashboard",
  },
  description: "Reservation System Dashboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await Promise.resolve(1);
  return (
    <html lang="en">
      <body className={`font-sans ${inter.className}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <ToastProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
