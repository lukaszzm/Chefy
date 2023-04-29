import { render, screen } from "@testing-library/react";
import { LoadingScreen } from "./LoadingScreen";

describe("LoadingScreen", () => {
  it("should render loading spinner", () => {
    render(<LoadingScreen />);

    const loadingSpinner = screen.getByRole("status");

    expect(loadingSpinner).toBeInTheDocument();
  });

  it("should render loading text", () => {
    render(<LoadingScreen />);

    const loadingText = screen.getByText(/loading/i);

    expect(loadingText).toBeInTheDocument();
  });
});
