"use client";

import { Logo } from "@/components/ui/logo";

export default function GlobalError() {
  return (
    <html lang="en">
      <body className="bg-popover sm:bg-background flex min-h-screen items-center justify-center">
        <main className="">
          <div className="flex max-w-sm flex-col gap-4 p-4 sm:flex-row">
            <Logo />
            <div>
              <h1 className="text-xl font-bold">Something went wrong</h1>
              <p className="text-muted-foreground">
                Sorry, we couldn&apos;t process your request at this time. Please try again later.
              </p>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
