import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-0.75 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive text-white [&>svg]:text-white bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps extends React.ComponentProps<"div">, VariantProps<typeof alertVariants> {}

function Alert({ ref, className, variant, ...props }: AlertProps) {
  return (
    <div ref={ref} data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  );
}

function AlertTitle({ ref, className, children, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      ref={ref}
      data-slot="alert-title"
      className={cn("mb-1 leading-none font-medium tracking-tight", className)}
      {...props}
    >
      {children}
    </h5>
  );
}

function AlertDescription({ ref, className, ...props }: React.ComponentProps<"p">) {
  return <p ref={ref} data-slot="alert-description" className={cn("text-sm leading-relaxed", className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription, alertVariants, type AlertProps };
