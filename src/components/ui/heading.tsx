import { cn } from "@/utils/cn";

function Heading({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="heading"
      className={cn("w-full space-y-2 py-1 pt-2 lg:py-3 lg:pt-6", className)}
      {...props}
    />
  );
}

function HeadingTitle({ ref, className, children, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1 ref={ref} data-slot="heading-title" className={cn("text-3xl font-semibold", className)} {...props}>
      {children}
    </h1>
  );
}

export { Heading, HeadingTitle };
