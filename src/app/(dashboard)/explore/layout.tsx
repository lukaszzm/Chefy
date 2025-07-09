import type { PropsWithChildren } from "react";

export default function ExploreStackLayout({ children }: PropsWithChildren) {
  return <div className="grid size-full flex-1 grid-cols-1 grid-rows-1">{children}</div>;
}
