"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteLike } from "@/features/likes/actions/delete-like";
import { useMenu } from "@/features/likes/hooks/use-menu";
import { useAction } from "@/hooks/use-action";

export const LikesItemDeleteButton = () => {
  const {
    recipe: { id },
    changeMenuState,
  } = useMenu();

  const { execute, isPending } = useAction({
    action: () => deleteLike(id),
    onSuccess: () => changeMenuState(false),
    onError: (e) => toast.error(e),
  });

  return (
    <Button disabled={isPending} items="start" role="menuitem" variant="destructiveGhost" onClick={execute}>
      <Trash2 />
      <span>{isPending ? "Deleting..." : "Delete"}</span>
    </Button>
  );
};
