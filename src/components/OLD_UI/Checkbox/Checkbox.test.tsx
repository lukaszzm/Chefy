import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("should render text", () => {
    render(<Checkbox id="test" text="test" />);

    const checkbox = screen.getByText(/test/i);

    expect(checkbox).toBeInTheDocument();
  });

  it("should be unchecked by default", () => {
    render(<Checkbox id="test" text="test" />);

    const checkbox = screen.getByRole("checkbox", {
      name: /test/i,
    });

    expect(checkbox).not.toBeChecked();
  });

  it("should be checked when isCheckedByDefault prop is true", () => {
    render(<Checkbox id="test" text="test" isCheckedByDefault />);

    const checkbox = screen.getByRole("checkbox", {
      name: /test/i,
    });

    expect(checkbox).toBeChecked();
  });

  it("should be checked after click", async () => {
    const user = userEvent.setup();
    render(<Checkbox id="test" text="test" />);

    const checkbox = screen.getByRole("checkbox", {
      name: /test/i,
    });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("should be unchecked after click when isCheckedByDefault prop is true", async () => {
    const user = userEvent.setup();
    render(<Checkbox id="test" text="test" isCheckedByDefault />);

    const checkbox = screen.getByRole("checkbox", {
      name: /test/i,
    });
    expect(checkbox).toBeChecked();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
