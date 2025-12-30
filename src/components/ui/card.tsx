import { cn } from "@/utils/cn";

function Card({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn("bg-card text-card-foreground rounded-lg border shadow-xs", className)}
      {...props}
    />
  );
}

function CardHeader({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 pb-1", className)} data-slot="card-header" {...props} />
  );
}

function CardTitle({ ref, className, children, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      ref={ref}
      className={cn("text-center text-2xl leading-none font-semibold tracking-tight", className)}
      data-slot="card-title"
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({ ref, className, ...props }: React.ComponentProps<"p">) {
  return (
    <p ref={ref} className={cn("text-muted-foreground text-sm", className)} data-slot="card-description" {...props} />
  );
}

function CardContent({ ref, className, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={cn("p-6 pt-0", className)} data-slot="card-content" {...props} />;
}

function CardFooter({ ref, className, ...props }: React.ComponentProps<"div">) {
  return <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} data-slot="card-footer" {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
