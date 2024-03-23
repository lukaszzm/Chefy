import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("should render loading spinner", () => {
    render(<LoadingSpinner color="gray" size="sm" />);

    const loadingSpinner = screen.getByRole("status");

    expect(loadingSpinner).toBeInTheDocument();
  });
});
