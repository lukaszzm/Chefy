import { render, screen } from "@testing-library/react";
import { LikedRecipe } from "./LikedRecipe";

const mockRecipe = {
  id: "1",
  title: "Title",
  area: "Area",
  category: "Category",
  ingredients: ["Ingredient"],
  instructions: "Instructions",
};

describe("LikedRecipe", () => {
  it("should render correctly", () => {
    render(<LikedRecipe {...mockRecipe} />);

    const title = screen.getByText(mockRecipe.title);
    const category = screen.getByText(mockRecipe.category);
    const area = screen.getByText(mockRecipe.area);
    const infoButton = screen.getByRole("button", { name: /info/i });

    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(area).toBeInTheDocument();
    expect(infoButton).toBeInTheDocument();
  });
});
