import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HomeNavbar } from "./HomeNavbar";

const mockOpenLoginModal = jest.fn();

describe("HomeNavbar", () => {
  it("should render correctly", () => {
    render(<HomeNavbar openLoginModal={mockOpenLoginModal} />);

    const logoImage = screen.getByRole("img", {
      name: /chefy logo/i,
    });
    const logoText = screen.getByText(/chefy/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(logoImage).toBeInTheDocument();
    expect(logoText).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should open login modal", async () => {
    const user = userEvent.setup();
    render(<HomeNavbar openLoginModal={mockOpenLoginModal} />);

    const button = screen.getByRole("button", { name: /login/i });
    await user.click(button);

    expect(mockOpenLoginModal).toHaveBeenCalled();
  });
});
