import { LikesList } from "@/components/likes/likes-list";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";

export default function LikesPage() {
  return (
    <Container className="space-y-4">
      <Title>Liked Recipes</Title>
      <LikesList />
    </Container>
  );
}
