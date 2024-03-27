import { render, screen } from "@testing-library/react";

import { RecipeNotFound } from "./RecipeNotFound";

describe("RecipeNotFound", () => {
  it("should render title", () => {
    render(<RecipeNotFound text="Change preferences to discover new recipes." title="No recipes found." />);

    const titleElement = screen.getByText("No recipes found.");

    expect(titleElement).toBeInTheDocument();
  });

  it("should render text", () => {
    render(<RecipeNotFound text="Change preferences to discover new recipes." title="No recipes found." />);

    const textElement = screen.getByText("Change preferences to discover new recipes.");

    expect(textElement).toBeInTheDocument();
  });

  it("should render error image", () => {
    render(<RecipeNotFound text="Change preferences to discover new recipes." title="No recipes found." isError />);

    const imageElement = screen.getByRole("img", {
      name: "Error occured",
    });

    expect(imageElement).toBeInTheDocument();
  });

  it("should render no data image", () => {
    render(<RecipeNotFound text="Change preferences to discover new recipes." title="No recipes found." />);

    const imageElement = screen.getByRole("img", {
      name: "Recipe not found",
    });

    expect(imageElement).toBeInTheDocument();
  });
});
