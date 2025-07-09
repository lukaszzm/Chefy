import { Block } from "@/components/ui/block";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routes } from "@/config/routes";
import Link from "next/link";

export default function LikedRecipeNotFound() {
  return (
    <Container>
      <Block className="flex h-72 w-full flex-col items-center justify-center">
        <p className="text-muted-foreground text-center text-base">
          Could not find the liked recipe. It may have been removed or does not exist.
        </p>
        <Button variant="outline" asChild>
          <Link href={routes.likes}>Go back to your Liked Recipes</Link>
        </Button>
      </Block>
    </Container>
  );
}
