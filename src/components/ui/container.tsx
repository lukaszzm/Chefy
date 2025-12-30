import { cn } from "@/utils/cn";

function Container({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="container"
      className={cn("container size-full max-w-none space-y-4 px-8 py-4 lg:m-8 lg:max-w-6xl", className)}
      {...props}
    />
  );
}

export { Container };
