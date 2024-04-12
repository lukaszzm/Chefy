import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const ExploreLoading = () => {
  return (
    <div className="col-start-1 row-start-1 flex flex-col items-center justify-center text-muted-foreground/80">
      <LoadingSpinner className="size-8" />
      <p>Searching recipes for you...</p>
    </div>
  );
};
