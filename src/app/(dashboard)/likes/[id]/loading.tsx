import { Skeleton } from "@/components/new_ui/skeleton";

export default function LikeLoading() {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-10 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        <Skeleton className="size-10" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-full max-w-xl" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-36 w-full" />
      </div>
    </>
  );
}
