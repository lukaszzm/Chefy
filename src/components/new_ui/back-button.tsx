"use client";

import { forwardRef } from "react";

import { useRouter } from "next/navigation";

import type { ButtonProps } from "@/components/new_ui/button";
import { Button } from "@/components/new_ui/button";

export const BackButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, "onClick">>((props, ref) => {
  const { back } = useRouter();

  return <Button ref={ref} onClick={back} {...props} />;
});

BackButton.displayName = "BackButton";
