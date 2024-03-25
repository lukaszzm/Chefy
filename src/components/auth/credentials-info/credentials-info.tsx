import { Button } from "@/components/ui/button";

interface CredentialsInfoProps {
  onClick: () => void;
  variant: "sign-in" | "sign-up";
}

const content = {
  "sign-in": {
    text: "Not have an account?",
    linkText: "Sign up here!",
  },
  "sign-up": {
    text: "Already have an account?",
    linkText: "Sign in here!",
  },
} as const;

export const CredentialsInfo = ({ onClick, variant }: CredentialsInfoProps) => {
  return (
    <div className="flex items-center justify-center">
      <p>{content[variant].text}</p>

      <Button variant="link" onClick={onClick}>
        {content[variant].linkText}
      </Button>
    </div>
  );
};
