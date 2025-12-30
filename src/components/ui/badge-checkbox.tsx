import type { InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

interface BadgeCheckboxProps extends InputProps {
  label: string;
}

function BadgeCheckbox({ ref, id, label, className, ...props }: BadgeCheckboxProps) {
  return (
    <>
      <input
        ref={ref}
        id={id}
        data-slot="badge-checkbox"
        type="checkbox"
        className={cn("peer hidden", className)}
        {...props}
      />
      <Label
        className="border-border text-muted-foreground hover:bg-muted/20 peer-checked:border-primary peer-checked:text-primary hover:peer-checked:bg-primary/5 inline-flex cursor-pointer rounded-lg border bg-transparent px-3.5 py-1.5 text-center text-xs transition duration-150 ease-in-out"
        htmlFor={id}
      >
        {label}
      </Label>
    </>
  );
}

export { BadgeCheckbox, type BadgeCheckboxProps };
