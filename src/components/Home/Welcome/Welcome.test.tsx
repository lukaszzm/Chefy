import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Welcome } from "./Welcome";

const mockOpenModal = jest.fn();

describe("Welcome", () => {
  it("should render correctly", () => {
    render(<Welcome openModal={mockOpenModal} />);

    const title = screen.getByRole("heading", {
      name: /welcome to our recipe app/i,
    });
    const subtitle = screen.getByText(
      /we're excited to help you discover new and delicious recipes with just a swipe of your finger\. our app is designed to make meal planning and cooking easy and fun, with a wide variety of recipes from all over the world\./i
    );
    const getStartedButton = screen.getByRole("button", {
      name: /get started/i,
    });

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(getStartedButton).toBeInTheDocument();
  });

  it("should open modal", async () => {
    const user = userEvent.setup();
    render(<Welcome openModal={mockOpenModal} />);

    const getStartedButton = screen.getByRole("button", {
      name: /get started/i,
    });
    await user.click(getStartedButton);

    expect(mockOpenModal).toHaveBeenCalled();
  });
});
