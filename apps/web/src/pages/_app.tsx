import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { api } from "@/lib/api";
import "@/styles/globals.css";
import { MDXProvider } from "@mdx-js/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "@code-hike/mdx/dist/index.css"
import * as mdxComponents from "@/components/MDX";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <MDXProvider components={mdxComponents}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <Toaster position="top-right" />
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </MDXProvider>
    </>
  );
}

export default api.withTRPC(App)