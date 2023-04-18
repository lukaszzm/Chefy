import { render, screen } from "@testing-library/react";
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
    render(<HomeNavbar openLoginModal={mockOpenLoginModal} />);

    screen.getByRole("button", { name: /login/i }).click();

    expect(mockOpenLoginModal).toHaveBeenCalled();
  });
});
