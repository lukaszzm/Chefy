import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import NextProgress from "next-progress";

import { DashboardLayout } from "@/layouts/DashboardLayout";
import { queryClient } from "@/lib/queryClient";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const protectedRoutes = ["/explore", "/likes", "/settings"];

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Chefy</title>
          <meta content="Chefy - Because we love cooking" name="description" />
          <link href="/icon.svg" rel="icon" />
        </Head>
        <NextProgress color="#3CA83C" height="5px" />
        <main className={roboto.variable}>
          {protectedRoutes.includes(router.pathname) ? (
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </main>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
