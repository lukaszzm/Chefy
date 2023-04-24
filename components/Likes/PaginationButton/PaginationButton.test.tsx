import { render, screen } from "@testing-library/react";
import { PaginationButton } from "./PaginationButton";

describe("PaginationButton", () => {
  it("should render correctly", () => {
    render(<PaginationButton toPage={1}>1</PaginationButton>);

    const pageButton = screen.getByRole("button", {
      name: /1/i,
    });

    expect(pageButton).toBeInTheDocument();
    expect(pageButton).not.toBeDisabled();
  });

  it("should be disabled when disabled props is passed", () => {
    render(
      <PaginationButton toPage={1} disabled>
        1
      </PaginationButton>
    );

    const pageButton = screen.getByRole("button", {
      name: /1/i,
    });

    expect(pageButton).toBeDisabled();
  });

  it("should be active when active props is passed", () => {
    render(
      <PaginationButton toPage={1} active>
        1
      </PaginationButton>
    );

    const pageButton = screen.getByRole("button", {
      name: /1/i,
    });

    expect(pageButton).toHaveClass("bg-primary");
  });
});
