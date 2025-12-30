import { cn } from "@/utils/cn";

function Block({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="block"
      className={cn(
        "lg:border-border lg:bg-popover space-y-4 rounded-md p-3 lg:rounded-sm lg:border lg:p-6",
        className
      )}
      {...props}
    />
  );
}

export { Block };
