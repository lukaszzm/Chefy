"use client";

import { Toaster as Sonner } from "sonner";

import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/utils/cn";

interface ToasterProps extends React.ComponentProps<typeof Sonner> {}

function Toaster({ ref, className, ...props }: ToasterProps) {
  const isMobile = useMobile();

  return (
    <Sonner
      ref={ref}
      data-slot="toaster"
      className={cn("toaster group", className)}
      position={isMobile ? "top-center" : "bottom-right"}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster, type ToasterProps };
