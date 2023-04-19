import { render, screen } from "@testing-library/react";
import { Pagination } from "./Pagination";
import "jest-canvas-mock";

describe("Pagination", () => {
  it("should render correctly when is one page", () => {
    render(<Pagination currentPage={1} pageCount={1} />);

    const numberElement = screen.getByRole("button", {
      name: /1/i,
    });

    expect(numberElement).toBeInTheDocument();
  });
});
