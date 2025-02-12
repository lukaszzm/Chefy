import { TextSearch } from "lucide-react";

export function ExploreNotFound() {
  return (
    <div className="text-muted-foreground col-start-1 row-start-1 mx-auto flex max-w-sm flex-col items-center justify-center gap-4 p-4 text-center">
      <TextSearch size={44} />

      <div>
        <p className="text-xl font-semibold">No recipes found.</p>
        <p>Change preferences to discover new recipes.</p>
      </div>
    </div>
  );
}
