import { render, screen, within } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("should render correctly as an error", () => {
    render(<Alert isError>Error</Alert>);

    const alert = screen.getByRole("alert");
    const text = within(alert).getByText(/error/i);

    expect(text).toBeInTheDocument();
    expect(alert).toHaveClass("bg-red-400");
  });

  it("should render correctly as a success", () => {
    render(<Alert>Success</Alert>);
    const alert = screen.getByRole("alert");
    const text = within(alert).getByText(/success/i);

    expect(text).toBeInTheDocument();
    expect(alert).toHaveClass("bg-green-400");
  });
});
