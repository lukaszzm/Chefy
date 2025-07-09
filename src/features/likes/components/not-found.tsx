import { Container } from "@/components/ui/container";

export function LikesNotFound() {
  return (
    <Container className="flex h-72 flex-col items-center justify-center">
      <p className="text-muted-foreground text-base">You haven&apos;t liked any recipes yet. </p>
    </Container>
  );
}
