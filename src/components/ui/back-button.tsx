"use client";

import { useRouter } from "next/navigation";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

function BackButton({ ref, ...props }: Omit<ButtonProps, "onClick">) {
  const { back } = useRouter();

  return <Button ref={ref} data-slot="back-button" onClick={back} {...props} />;
}

export { BackButton };
