import { cn } from "@/utils/cn";

export function SettingsContainer({
  className,
  subtitle,
  children,
  ...props
}: React.ComponentProps<"div"> & { subtitle: string }) {
  return (
    <div
      className={cn("border-border w-full rounded-md border p-4", className)}
      data-slot="settings-container"
      {...props}
    >
      <h2 className="text-muted-foreground mb-4 font-semibold">{subtitle}</h2>
      {children}
    </div>
  );
}
