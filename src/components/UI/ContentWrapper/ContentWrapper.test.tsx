import { render, screen } from "@testing-library/react";
import { ContentWrapper } from "./ContentWrapper";

describe("ContentWrapper", () => {
  it("should render children", () => {
    render(<ContentWrapper>test</ContentWrapper>);

    const child = screen.getByText(/test/i);

    expect(child).toBeInTheDocument();
  });
});
