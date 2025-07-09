interface CredentialsHeadingProps {
  title: string;
  subtitle: string;
}

export function CredentialsHeading({ title, subtitle }: CredentialsHeadingProps) {
  return (
    <div className="w-full space-y-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground font-medium">{subtitle}</p>
    </div>
  );
}
