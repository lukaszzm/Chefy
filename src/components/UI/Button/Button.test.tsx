import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("should render correctly as a primary button", () => {
    render(<Button variant="primary">Primary</Button>);

    const button = screen.getByRole("button");
    const text = screen.getByText(/primary/i);

    expect(text).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("should render correctly as a danger button", () => {
    render(<Button variant="danger">Danger</Button>);

    const button = screen.getByRole("button");
    const text = screen.getByText(/danger/i);

    expect(text).toBeInTheDocument();
    expect(button).toHaveClass("bg-red-400");
  });

  it("should render correctly as an outline-danger button", () => {
    render(<Button variant="outline-danger">Danger</Button>);

    const button = screen.getByRole("button");
    const text = screen.getByText(/danger/i);

    expect(text).toBeInTheDocument();
    expect(button).toHaveClass("text-red-400");
  });

  it("should render correctly as a full-width button", () => {
    render(
      <Button variant="primary" fullWidth>
        Primary
      </Button>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveClass("w-full");
  });

  it("should be disabled when disabled prop is true", () => {
    render(
      <Button variant="primary" disabled>
        Primary
      </Button>
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("should render a loading spinner when isLoading prop is true", () => {
    render(
      <Button variant="primary" isLoading>
        Primary
      </Button>
    );

    const button = screen.getByRole("button");
    const spinner = screen.getByRole("status");

    expect(button).toContainElement(spinner);
  });

  it("should call onClick when clicked", async () => {
    const mockOnClick = jest.fn();
    const user = userEvent.setup();
    render(
      <Button variant="primary" onClick={mockOnClick}>
        Primary
      </Button>
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when isLoading prop is true", () => {
    render(
      <Button variant="primary" isLoading>
        Primary
      </Button>
    );

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });
});
