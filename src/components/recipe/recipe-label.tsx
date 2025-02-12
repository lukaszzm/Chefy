import { cn } from "@/utils/cn";

export function RecipeLabel({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("font-semibold", className)} data-slot="recipe-label" {...props} />;
}
