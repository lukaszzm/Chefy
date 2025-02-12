import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function ExploreLoading() {
  return (
    <div className="text-muted-foreground col-start-1 row-start-1 flex flex-col items-center justify-center gap-2">
      <LoadingSpinner className="size-5" />
      <p>Searching recipes for you...</p>
    </div>
  );
}
