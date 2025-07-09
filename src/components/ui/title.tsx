import { cn } from "@/utils/cn";

function Title({ className, children, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1 className={cn("text-2xl font-semibold", className)} data-slot="title" {...props}>
      {children}
    </h1>
  );
}

export { Title };
