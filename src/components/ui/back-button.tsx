"use client";

import { useRouter } from "next/navigation";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

function BackButton(props: ButtonProps) {
  const { back } = useRouter();

  return <Button data-slot="back-button" onClick={back} {...props} />;
}

export { BackButton };
