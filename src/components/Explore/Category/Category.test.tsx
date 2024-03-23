import { render, screen } from "@testing-library/react";
import { Category } from "./Category";

describe("Category", () => {
  it("should render without label when hideLabel props is true", () => {
    render(
      <Category category="sampleCategory" area="sampleArea" hideLabel={true} />
    );

    const categoryLabel = screen.queryByText("Category");
    const category = screen.getByText("sampleCategory");
    const area = screen.getByText("sampleArea");

    expect(categoryLabel).not.toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(area).toBeInTheDocument();
  });

  it("should render with label when hideLabel props is false", () => {
    render(
      <Category category="sampleCategory" area="sampleArea" hideLabel={false} />
    );

    const categoryLabel = screen.getByText("Category");
    const category = screen.getByText("sampleCategory");
    const area = screen.getByText("sampleArea");

    expect(categoryLabel).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(area).toBeInTheDocument();
  });
});
