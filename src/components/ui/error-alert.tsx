import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorAlertProps {
  error: string | null | undefined;
  className?: string;
}

function ErrorAlert({ error, className }: ErrorAlertProps) {
  if (!error) {
    return null;
  }

  return (
    <Alert className={className} variant="destructive" data-slot="error-alert">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}

export { ErrorAlert };
