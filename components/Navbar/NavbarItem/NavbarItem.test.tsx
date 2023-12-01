import { render, screen, within } from "@testing-library/react";
import { NavbarItem } from "./NavbarItem";
import Image from "next/image";

jest.mock("next/router", () => require("next-router-mock"));

describe("NavbarItem", () => {
  it("should render correctly as a button", () => {
    render(
      <NavbarItem
        icon={<Image src="" alt="test icon" />}
        text="test"
        type="button"
      />
    );

    const button = screen.getByRole("button", {
      name: /test/i,
    });
    const { getByRole } = within(button);
    const icon = getByRole("img", {
      name: /test icon/i,
    });

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("should render correctly as a link", () => {
    render(<NavbarItem icon={<Image src="" alt="test icon" />} text="test" />);

    const link = screen.getByRole("link", {
      name: /test/i,
    });
    const { getByRole } = within(link);
    const icon = getByRole("img", {
      name: /test icon/i,
    });

    expect(link).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
