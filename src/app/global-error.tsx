"use client";

import { ServerCrash } from "lucide-react";

import { Container } from "@/components/ui/container";

export default function GlobalError() {
  return (
    <html lang="en">
      <body className="bg-popover sm:bg-background flex min-h-screen items-center justify-center text-center">
        <Container className="items-center">
          <ServerCrash size={44} />
          <h1 className="text-2xl font-semibold">Internal Server Error</h1>
          <p className="text-muted-foreground">Sorry, something went wrong on our servers. Please try again later.</p>
        </Container>
      </body>
    </html>
  );
}
