import { Block } from "@/components/ui/block";
import { Heading } from "@/components/ui/heading";
import { Skeleton } from "@/components/ui/skeleton";

export default function LikedRecipeLoading() {
  return (
    <>
      <Heading className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-10 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </Heading>
      <Block className="flex flex-col">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-full max-w-xl" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-36 w-full" />
      </Block>
    </>
  );
}
