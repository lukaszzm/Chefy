import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
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

function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div className={cn(alertVariants({ variant }), className)} data-slot="alert" role="alert" {...props} />;
}

function AlertTitle({ className, children, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5 className={cn("mb-1 leading-none font-medium tracking-tight", className)} data-slot="alert-title" {...props}>
      {children}
    </h5>
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm leading-relaxed", className)} data-slot="alert-description" {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
