import Image from "next/image";

import { CardHeader, CardTitle } from "@/components/ui/card";

interface ExploreCardHeaderProps {
  title: string;
  imageSrc: string;
}

export function ExploreCardHeader({ title, imageSrc }: ExploreCardHeaderProps) {
  return (
    <CardHeader className="mb-4 flex-none space-y-2">
      <div className="bg-muted relative h-80 w-full rounded-xl">
        <Image
          alt={`Image of ${title}`}
          className="pointer-events-none rounded-xl select-none"
          loading="lazy"
          sizes="350px"
          src={imageSrc}
          draggable={false}
          fill
        />
      </div>

      <CardTitle>{title}</CardTitle>
    </CardHeader>
  );
}
