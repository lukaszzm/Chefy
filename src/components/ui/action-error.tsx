import { Alert, AlertDescription } from "@/components/ui/alert";

interface ActionErrorProps {
  error: string | null | undefined;
  className?: string;
}

export const ActionError = ({ error, className }: ActionErrorProps) => {
  if (!error) {
    return null;
  }

  return (
    <Alert className={className} variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};
