import { Alert, AlertDescription } from "@/components/ui/alert";

interface ActionErrorProps extends Omit<React.ComponentProps<"div">, "children"> {
  error: string | null | undefined;
}

function ActionError({ ref, error, ...props }: ActionErrorProps) {
  if (!error) {
    return null;
  }

  return (
    <Alert ref={ref} data-slot="action-error" variant="destructive" {...props}>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}

export { ActionError };
