import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

function Heading({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("w-full space-y-2 py-1 pt-2 lg:py-3 lg:pt-6", className)} data-slot="heading" {...props} />;
}

function HeadingTitle({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <h1 className={cn("text-3xl font-semibold", className)} data-slot="heading-title" {...props}>
      {children}
    </h1>
  );
}

export { Heading, HeadingTitle };
