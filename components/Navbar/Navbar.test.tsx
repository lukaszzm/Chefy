import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("Navbar", () => {
  it("should render correctly", () => {
    render(<Navbar />);

    const logo = screen.getByRole("img", {
      name: /chefy logo/i,
    });

    const exploreLink = screen.getByRole("link", {
      name: /explore/i,
    });
    const likesLink = screen.getByRole("link", {
      name: /likes/i,
    });
    const settingsLink = screen.getByRole("link", {
      name: /settings/i,
    });
    const logoutButton = screen.getByRole("button", {
      name: /log out/i,
    });

    expect(logo).toBeInTheDocument();
    expect(exploreLink).toBeInTheDocument();
    expect(likesLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});
