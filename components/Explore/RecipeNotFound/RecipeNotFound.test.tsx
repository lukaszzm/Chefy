import { render, screen } from "@testing-library/react";
import { RecipeNotFound } from "./RecipeNotFound";

describe("RecipeNotFound", () => {
  it("should render title", () => {
    render(
      <RecipeNotFound
        title="No recipes found."
        text="Change preferences to discover new recipes."
      />
    );

    const titleElement = screen.getByText("No recipes found.");

    expect(titleElement).toBeInTheDocument();
  });

  it("should render text", () => {
    render(
      <RecipeNotFound
        title="No recipes found."
        text="Change preferences to discover new recipes."
      />
    );

    const textElement = screen.getByText(
      "Change preferences to discover new recipes."
    );

    expect(textElement).toBeInTheDocument();
  });

  it("should render error image", () => {
    render(
      <RecipeNotFound
        title="No recipes found."
        text="Change preferences to discover new recipes."
        isError
      />
    );

    const imageElement = screen.getByRole("img", {
      name: "Error occured",
    });

    expect(imageElement).toBeInTheDocument();
  });

  it("should render no data image", () => {
    render(
      <RecipeNotFound
        title="No recipes found."
        text="Change preferences to discover new recipes."
      />
    );

    const imageElement = screen.getByRole("img", {
      name: "Recipe not found",
    });

    expect(imageElement).toBeInTheDocument();
  });
});
