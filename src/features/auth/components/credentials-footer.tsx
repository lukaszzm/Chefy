import Link from "next/link";

interface CredentialsFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export const CredentialsFooter = ({ text, linkText, href }: CredentialsFooterProps) => {
  return (
    <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
      <p>{text}</p>

      <Link className="font-semibold text-primary hover:underline" href={href}>
        {linkText}
      </Link>
    </div>
  );
};
