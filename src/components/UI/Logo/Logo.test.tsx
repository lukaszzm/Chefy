import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("should render logo with text", () => {
    render(<Logo />);

    const logo = screen.getByRole("img", { name: /chefy logo/i });
    const text = screen.getByText(/chefy/i);

    expect(logo).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
