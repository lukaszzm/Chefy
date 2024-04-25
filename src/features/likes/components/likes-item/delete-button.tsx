"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteLike } from "@/features/likes/actions/delete-like";
import { useAction } from "@/hooks/use-action";

interface LikesItemDeleteButtonProps {
  id: string;
  onDelete?: () => void;
}

export const LikesItemDeleteButton = ({ id, onDelete }: LikesItemDeleteButtonProps) => {
  const { execute, isPending } = useAction({
    action: () => deleteLike(id),
    onSuccess: () => onDelete?.(),
    onError: (e) => toast.error(e),
  });

  return (
    <Button disabled={isPending} items="start" variant="destructiveGhost" onClick={execute}>
      <Trash2 />
      <span>{isPending ? "Deleting..." : "Delete"}</span>
    </Button>
  );
};
