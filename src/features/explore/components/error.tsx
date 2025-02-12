import { Bug } from "lucide-react";

export function ExploreError() {
  return (
    <div className="text-muted-foreground col-start-1 row-start-1 mx-auto flex max-w-sm flex-col items-center justify-center gap-4 p-4 text-center">
      <Bug size={44} />

      <div>
        <p className="text-xl font-semibold">Something went wrong.</p>
        <p>Could not find recipes for you, try again later.</p>
      </div>
    </div>
  );
}
