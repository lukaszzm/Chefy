import { render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

const mockSwitchModal = jest.fn();

describe("LoginForm", () => {
  it("should render correctly", () => {
    render(<LoginForm switchModal={mockSwitchModal} />);

    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordElement = screen.getByLabelText(/password/i);
    const switchElement = screen.getByText(/sign up here!/i);
    const submitElement = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(switchElement).toBeInTheDocument();
    expect(submitElement).toBeInTheDocument();
  });

  it("should switch modal", () => {
    render(<LoginForm switchModal={mockSwitchModal} />);

    screen.getByText(/sign up here!/i).click();

    expect(mockSwitchModal).toHaveBeenCalled();
  });
});
