import { Skeleton } from "@/components/ui/skeleton";

export default function LikesListLoading() {
  return (
    <>
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
