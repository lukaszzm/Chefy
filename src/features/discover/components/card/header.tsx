import Image from "next/image";

import { CardHeader, CardTitle } from "@/components/ui/card";

interface DiscoverCardHeaderProps {
  title: string;
  imageSrc: string;
  priority?: boolean;
}

export function DiscoverCardHeader({ title, imageSrc, priority = false }: DiscoverCardHeaderProps) {
  return (
    <CardHeader className="mb-4 flex-none space-y-2">
      <div className="bg-muted relative h-80 w-full rounded-xl">
        <Image
          alt={`Image of ${title}`}
          className="pointer-events-none rounded-xl select-none"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
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
