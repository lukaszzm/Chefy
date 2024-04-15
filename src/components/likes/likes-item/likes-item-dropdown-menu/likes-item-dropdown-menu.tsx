import { Ellipsis } from "lucide-react";

import { LikesItemDetailsDialog } from "@/components/likes/likes-item/likes-item-details-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Recipe } from "@/types";

interface LikesItemDropdownMenuProps extends Recipe {}

export const LikesItemDropdownMenu = (props: LikesItemDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LikesItemDetailsDialog {...props} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
