import type { PropsWithChildren } from "react";

export default function PreferencesLayout({ children }: PropsWithChildren) {
  return <div className="space-y-3">{children}</div>;
}
