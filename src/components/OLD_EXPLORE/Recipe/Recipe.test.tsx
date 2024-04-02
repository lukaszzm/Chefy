import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createWrapper } from "@/utils/createWrapper";

import { Recipe } from "./Recipe";

const mockRecipe = {
  id: "1",
  title: "testTitle",
  imageSrc: "https://via.placeholder.com/150",
  category: {
    id: "1",
    name: "testCategory",
  },
  area: {
    id: "1",
    name: "testArea",
  },
  ingredients: ["testIngredient1", "testIngredient2"],
  instructions: "testInstructions",
};

describe("Recipe", () => {
  it("should render short recipe details when shortVersion is true", () => {
    render(<Recipe {...mockRecipe} />, { wrapper: createWrapper() });

    const title = screen.getByText(mockRecipe.title);
    const category = screen.getByText(mockRecipe.category.name);
    const area = screen.getByText(mockRecipe.area.name);
    const readMoreButton = screen.getByRole("button", {
      name: /read more/i,
    });

    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(area).toBeInTheDocument();
    expect(readMoreButton).toBeInTheDocument();
  });

  it("should render all recipe details when read more was clicked", async () => {
    const user = userEvent.setup();
    render(<Recipe {...mockRecipe} />, { wrapper: createWrapper() });

    const readMoreButton = screen.getByRole("button", {
      name: /read more/i,
    });

    await user.click(readMoreButton);

    const title = screen.getByText(mockRecipe.title);
    const category = screen.getByText(mockRecipe.category.name);
    const area = screen.getByText(mockRecipe.area.name);
    const ingredients = screen.getByText(mockRecipe.ingredients[0]);
    const instructions = screen.getByText(mockRecipe.instructions);
    const readLessButton = screen.getByRole("button", {
      name: /read less/i,
    });

    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(area).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(readLessButton).toBeInTheDocument();
  });
});
