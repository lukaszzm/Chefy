import Link from "next/link";

interface CredentialsFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export function CredentialsFooter({ text, linkText, href }: CredentialsFooterProps) {
  return (
    <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm font-medium">
      <p>{text}</p>

      <Link className="text-primary font-semibold hover:underline" href={href}>
        {linkText}
      </Link>
    </div>
  );
}
