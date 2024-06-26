import { Skeleton } from "@/components/ui/skeleton";
import { Title } from "@/components/ui/title";

export default function LikesLoading() {
  return (
    <>
      <Title>Liked Recipes</Title>

      <div className="space-y-2">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
      <Skeleton className="mx-auto h-10 w-56" />
    </>
  );
}
