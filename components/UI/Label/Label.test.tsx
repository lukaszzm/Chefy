import { render, screen } from "@testing-library/react";
import { Label } from "./Label";

describe("Label", () => {
  it("should render text", () => {
    render(<Label htmlFor="something">test</Label>);

    const label = screen.getByText(/test/i);

    expect(label).toBeInTheDocument();
  });
});
