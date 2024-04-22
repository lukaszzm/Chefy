import type { PropsWithChildren } from "react";

export default function AccountLayout({ children }: PropsWithChildren) {
  return <div className="space-y-3">{children}</div>;
}
