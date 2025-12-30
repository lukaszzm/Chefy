import { cn } from "@/utils/cn";

function Skeleton({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div ref={ref} data-slot="skeleton" className={cn("bg-muted animate-pulse rounded-md", className)} {...props} />
  );
}

export { Skeleton };
