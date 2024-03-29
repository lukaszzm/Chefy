import "@/styles/globals.css";

import type { PropsWithChildren } from "react";

import type { Metadata } from "next";

import { Quicksand } from "next/font/google";

import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Chefy",
  description: "Chefy - Because we love cooking",
};

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <html className={quicksand.className} lang="en">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
