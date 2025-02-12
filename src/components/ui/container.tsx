import { cn } from "@/utils/cn";

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("container size-full max-w-none space-y-4 px-8 py-4 lg:m-8 lg:max-w-6xl", className)}
      data-slot="container"
      {...props}
    />
  );
}

export { Container };
