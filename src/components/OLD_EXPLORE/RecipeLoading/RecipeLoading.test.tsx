import { render, screen } from "@testing-library/react";

import { RecipeLoading } from "./RecipeLoading";

describe("RecipeLoading", () => {
  it("should render loading message", () => {
    render(<RecipeLoading />);

    const loadingMessage = screen.getByText("Searching recipes for you..");

    expect(loadingMessage).toBeInTheDocument();
  });
});
