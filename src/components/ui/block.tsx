import { cn } from "@/utils/cn";

function Block({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "lg:border-border lg:bg-popover space-y-4 rounded-md p-3 lg:rounded-sm lg:border lg:p-6",
        className
      )}
      data-slot="block"
      {...props}
    />
  );
}

export { Block };
