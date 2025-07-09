import { Alert, AlertDescription } from "@/components/ui/alert";

interface ActionErrorProps extends Omit<React.ComponentProps<"div">, "children"> {
  error: string | null | undefined;
}

function ActionError({ error, ...props }: ActionErrorProps) {
  if (!error) {
    return null;
  }

  return (
    <Alert data-slot="action-error" variant="destructive" {...props}>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}

export { ActionError };
