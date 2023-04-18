import { render, screen } from "@testing-library/react";
import { Welcome } from "./Welcome";

const mockOpenModal = jest.fn();

describe("Welcome", () => {
  it("should render correctly", () => {
    render(<Welcome openModal={mockOpenModal} />);

    const title = screen.getByRole("heading", {
      name: /welcome to our recipe app/i,
    });
    const subtitle = screen.getByRole("heading", {
      name: /we're excited to help you discover new and delicious recipes with just a swipe of your finger\. our app is designed to make meal planning and cooking easy and fun, with a wide variety of recipes from all over the world\./i,
    });
    const getStartedButton = screen.getByRole("button", {
      name: /get started/i,
    });

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
  });

  it("should open modal", () => {
    render(<Welcome openModal={mockOpenModal} />);

    const getStartedButton = screen.getByRole("button", {
      name: /get started/i,
    });
    getStartedButton.click();

    expect(mockOpenModal).toHaveBeenCalled();
  });
});
