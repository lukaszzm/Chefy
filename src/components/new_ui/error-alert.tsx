import { Alert, AlertDescription } from "@/components/new_ui/alert";

interface ErrorAlertProps {
  error: string | null | undefined;
  className?: string;
}

export const ErrorAlert = ({ error, className }: ErrorAlertProps) => {
  if (!error) {
    return null;
  }

  return (
    <Alert className={className} variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};
