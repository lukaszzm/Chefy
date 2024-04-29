import { LoadingSpinner } from "@/components/new_ui/loading-spinner";

export const ExploreLoading = () => {
  return (
    <div className="col-start-1 row-start-1 flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <LoadingSpinner className="size-5" />
      <p>Searching recipes for you...</p>
    </div>
  );
};
