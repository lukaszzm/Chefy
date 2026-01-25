import "@/styles/globals.css";

import type { Metadata } from "next";

import { Quicksand } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/app/providers";
import { getLocale, getMessages } from "next-intl/server";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chefy",
  description: "Explore and share delicious recipes from around the world.",
};

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  return (
    <html className={quicksand.className} lang={locale}>
      <body>
        <Providers i18n={{ locale, messages }}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
