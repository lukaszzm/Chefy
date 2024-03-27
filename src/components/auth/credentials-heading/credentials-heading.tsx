interface CredentialsHeadingProps {
  title: string;
  subtitle: string;
}

export const CredentialsHeading = ({ title, subtitle }: CredentialsHeadingProps) => {
  return (
    <div className="w-full space-y-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="font-medium text-muted-foreground">{subtitle}</p>
    </div>
  );
};
