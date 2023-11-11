import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/theme-provider";

import "~/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
