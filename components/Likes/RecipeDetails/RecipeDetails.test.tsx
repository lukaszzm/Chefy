import { render, screen, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecipeDetails } from "./RecipeDetails";

jest.mock("next/router", () => require("next-router-mock"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockRecipe = {
  id: "1",
  title: "testTitle",
  ingredients: ["testIngredient1", "testIngredient2"],
  instructions: "testInstructions",
};

describe("RecipeDetails", () => {
  it("should render correctly", () => {
    render(<RecipeDetails {...mockRecipe} />, { wrapper });

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
