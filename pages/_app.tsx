import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import NextProgress from "next-progress";
import { Roboto } from "next/font/google";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

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
        <main className={roboto.variable}>
          <Head>
            <title>Chefy</title>
            <meta
              name="description"
              content="Chefy - Because we love cooking"
            />
            <link rel="icon" href="/icon.svg" />
          </Head>
          <NextProgress height="5px" color="#3CA83C" />
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
