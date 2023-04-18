import { render, screen } from "@testing-library/react";
import { Home } from "./Home";

describe("Home", () => {
  it("should render correctly", () => {
    render(<Home />);

    const navbar = screen.getByRole("navigation");
    const title = screen.getByRole("heading", {
      name: /welcome to our recipe app/i,
    });
    const subtitle = screen.getByRole("heading", {
      name: /we're excited to help you discover new and delicious recipes with just a swipe of your finger\. our app is designed to make meal planning and cooking easy and fun, with a wide variety of recipes from all over the world\./i,
    });
    const getStartedButton = screen.getByRole("button", {
      name: /get started/i,
    });

    expect(navbar).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
  });

  it("should initially render without modal", () => {
    render(<Home />);

    const modal = screen.queryByRole("dialog");

    expect(modal).toBeNull();
  });
});
