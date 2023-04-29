import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import { FieldError } from "react-hook-form";

describe("Input", () => {
  it("should render input", () => {
    render(<Input id="test" name="test" type="text" placeholder="test" />);

    const input = screen.getByPlaceholderText(/test/i);

    expect(input).toBeInTheDocument();
  });

  it("should render error message", () => {
    render(
      <Input
        id="test"
        name="test"
        type="text"
        placeholder="test"
        error={{ message: "error message" } as FieldError}
      />
    );

    const errorMessage = screen.getByText(/error message/i);
    const input = screen.getByPlaceholderText(/test/i);

    expect(input).toHaveClass("border-red-500");
    expect(errorMessage).toBeInTheDocument();
  });
});
