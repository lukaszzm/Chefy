import { render, screen, within } from "@testing-library/react";
import { RecipeDetails } from "./RecipeDetails";
import { createWrapper } from "@/utils/createWrapper";

jest.mock("next/router", () => require("next-router-mock"));

const mockRecipe = {
  id: "1",
  title: "testTitle",
  ingredients: ["testIngredient1", "testIngredient2"],
  instructions: "testInstructions",
};

describe("RecipeDetails", () => {
  it("should render correctly", () => {
    render(<RecipeDetails {...mockRecipe} />, { wrapper: createWrapper() });

    const ingredientsSubtitle = screen.getByRole("heading", {
      name: /ingredients/i,
    });
    const ingredients = screen.getByRole("list", {
      name: /ingredients/i,
    });
    const { getAllByRole } = within(ingredients);
    const ingredientItems = getAllByRole("listitem");
    const instructionsSubtitle = screen.getByRole("heading", {
      name: /instructions/i,
    });
    const instructions = screen.getByLabelText(/instructions/i);
    const generatePdfButton = screen.getByRole("button", {
      name: /generate pdf/i,
    });
    const deleteLikeButton = screen.getByRole("button", {
      name: /generate pdf/i,
    });

    expect(ingredientsSubtitle).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
    expect(instructionsSubtitle).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(ingredientItems).toHaveLength(2);
    expect(generatePdfButton).toBeInTheDocument();
    expect(deleteLikeButton).toBeInTheDocument();
  });
});
