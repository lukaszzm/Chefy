import { render, screen, within } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("should render correctly as an error", () => {
    render(<Alert variant="error">Error</Alert>);

    const alert = screen.getByRole("alert");
    const text = within(alert).getByText(/error/i);

    expect(text).toBeInTheDocument();
    expect(alert).toHaveClass("bg-red-400");
  });

  it("should render correctly as a success", () => {
    render(<Alert variant="success">Success</Alert>);
    const alert = screen.getByRole("alert");
    const text = within(alert).getByText(/success/i);

    expect(text).toBeInTheDocument();
    expect(alert).toHaveClass("bg-green-400");
  });

  it("should render correctly as a warning", () => {
    render(<Alert variant="warning">Warning</Alert>);
    const alert = screen.getByRole("alert");
    const text = within(alert).getByText(/warning/i);

    expect(text).toBeInTheDocument();
    expect(alert).toHaveClass("bg-yellow-400");
  });

  it("should render correctly as an info", () => {
    render(<Alert variant="info">Info</Alert>);
    const alert = screen.getByRole("alert");
    const text = within(alert).getByText(/info/i);

    expect(text).toBeInTheDocument();
    expect(alert).toHaveClass("bg-blue-400");
  });
});
