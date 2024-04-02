import { render, screen } from "@testing-library/react";

import { Ingredients } from "./Ingredients";

const sampleIngredientsList = ["sampleIngredient1", "sampleIngredient2", "sampleIngredient3"];

describe("Ingredients", () => {
  it("should render all ingredients", () => {
    render(<Ingredients ingredientsList={sampleIngredientsList} />);

    const ingredients = screen.getAllByRole("listitem");

    expect(ingredients.length).toBe(sampleIngredientsList.length);
  });

  it("should render label", () => {
    render(<Ingredients ingredientsList={sampleIngredientsList} />);

    const label = screen.getByText("Ingredients");

    expect(label).toBeInTheDocument();
  });
});
