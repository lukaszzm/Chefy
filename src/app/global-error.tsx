"use client";

import { ServerCrash } from "lucide-react";

import { Container } from "@/components/new_ui/container";

export default function GlobalError() {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-popover text-center sm:bg-background">
        <Container className="items-center">
          <ServerCrash size={44} />
          <h1 className="text-2xl font-semibold">Internal Server Error</h1>
          <p className="text-muted-foreground">Sorry, something went wrong on our servers. Please try again later.</p>
        </Container>
      </body>
    </html>
  );
}
