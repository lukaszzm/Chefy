import { Button, ButtonProps } from "@/components/ui/button";

export function SubmitButton({ children, ...props }: ButtonProps) {
  return (
    <Button className="w-full min-w-26 sm:w-auto" size="sm" loadingText="Saving..." type="submit" {...props}>
      {children || "Save"}
    </Button>
  );
}
