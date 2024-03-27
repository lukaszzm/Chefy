import { render, screen } from "@testing-library/react";
import type { FieldError } from "react-hook-form";

import { Input } from "./Input";

describe("Input", () => {
  it("should render input", () => {
    render(<Input id="test" name="test" placeholder="test" type="text" />);

    const input = screen.getByPlaceholderText(/test/i);

    expect(input).toBeInTheDocument();
  });

  it("should render error message", () => {
    render(
      <Input error={{ message: "error message" } as FieldError} id="test" name="test" placeholder="test" type="text" />
    );

    const errorMessage = screen.getByText(/error message/i);
    const input = screen.getByPlaceholderText(/test/i);

    expect(input).toHaveClass("border-red-500");
    expect(errorMessage).toBeInTheDocument();
  });
});
