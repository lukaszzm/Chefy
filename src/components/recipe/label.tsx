import { cn } from "@/utils/cn";

export function RecipeLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("font-semibold", className)} data-slot="recipe-label" {...props} />;
}
