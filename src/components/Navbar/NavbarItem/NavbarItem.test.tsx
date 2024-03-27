import { render, screen, within } from "@testing-library/react";

import { NavbarItem } from "./NavbarItem";

jest.mock("next/router", () => require("next-router-mock"));

const testIcon = <span data-testid="test-icon">icon</span>;

describe("NavbarItem", () => {
  it("should render correctly as a button", () => {
    render(<NavbarItem icon={testIcon} text="test" type="button" />);

    const button = screen.getByRole("button", {
      name: /test/i,
    });
    const icon = within(button).getByTestId("test-icon");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("should render correctly as a link", () => {
    render(<NavbarItem icon={testIcon} text="test" />);

    const link = screen.getByRole("link", {
      name: /test/i,
    });
    const icon = within(link).getByTestId("test-icon");

    expect(link).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
