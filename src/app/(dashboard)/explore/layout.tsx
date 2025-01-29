import type { PropsWithChildren } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chefy - Explore recipes",
};

export default function ExploreStackLayout({ children }: PropsWithChildren) {
  return <div className="grid w-full grid-cols-1 grid-rows-1 self-stretch">{children}</div>;
}
