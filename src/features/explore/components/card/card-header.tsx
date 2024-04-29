import Image from "next/image";

import { CardHeader, CardTitle } from "@/components/new_ui/card";
import type { Recipe } from "@/types";

interface ExploreCardHeaderProps extends Pick<Recipe, "title" | "imageSrc"> {}

export const ExploreCardHeader = ({ title, imageSrc }: ExploreCardHeaderProps) => {
  return (
    <CardHeader className="mb-4 flex-none space-y-2">
      <div className="relative h-80 w-full rounded-xl bg-muted">
        <Image alt={`Image of ${title}`} className="rounded-xl" loading="lazy" sizes="350px" src={imageSrc} fill />
      </div>

      <CardTitle>{title}</CardTitle>
    </CardHeader>
  );
};
