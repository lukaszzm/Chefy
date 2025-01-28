import Image from "next/image";

import { CardHeader, CardTitle } from "@/components/ui/card";

interface ExploreCardHeaderProps {
  title: string;
  imageSrc: string;
}

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
