import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen sm:items-center sm:justify-center">
      <div className="w-full space-y-6 bg-popover px-10 py-8 sm:max-w-md sm:rounded-lg sm:border sm:border-border">
        {children}
      </div>
    </div>
  );
}
