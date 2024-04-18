import { Skeleton } from "@/components/ui/skeleton";

export default function LikesLoading() {
  return (
    <>
      <div className="space-y-3">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
      <Skeleton className="mx-auto h-10 w-40" />
    </>
  );
}
