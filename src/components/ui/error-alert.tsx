import type { AlertProps } from "@/components/ui/alert";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorAlertProps extends Omit<AlertProps, "children" | "variant"> {
  error: string | null | undefined;
}

function ErrorAlert({ error, ref, className, ...props }: ErrorAlertProps) {
  if (!error) {
    return null;
  }

  return (
    <Alert ref={ref} variant="destructive" data-slot="error-alert" className={className} {...props}>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}

export { ErrorAlert };
