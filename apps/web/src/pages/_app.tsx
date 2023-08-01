import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { api } from "@/lib/api";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "@code-hike/mdx/dist/index.css"
import { Jost } from 'next/font/google'

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <Toaster position="top-right" />
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
    </>
  );
}

export default api.withTRPC(App)