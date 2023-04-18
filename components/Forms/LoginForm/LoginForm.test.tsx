import { fireEvent, render, waitFor, screen } from "@testing-library/react";
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

  it("should initially have disabled submit button", () => {
    render(<LoginForm switchModal={mockSwitchModal} />);

    const submitElement = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should switch modal", () => {
    render(<LoginForm switchModal={mockSwitchModal} />);

    screen.getByText(/sign up here!/i).click();

    expect(mockSwitchModal).toHaveBeenCalled();
  });

  it("should display error message when email is invalid", async () => {
    render(<LoginForm switchModal={mockSwitchModal} />);

    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    fireEvent.input(emailElement, { target: { value: "testmail" } });
    const errorMessage = await screen.findByText(/invalid email/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message when password is too short", async () => {
    render(<LoginForm switchModal={mockSwitchModal} />);

    const passwordElement = screen.getByLabelText(/password/i);
    fireEvent.input(passwordElement, { target: { value: "123" } });
    const errorMessage = await screen.findByText(
      /your password must have at least 8 characters/i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it("should have disabled submit button when email is invalid", () => {
    render(<LoginForm switchModal={mockSwitchModal} />);

    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    fireEvent.input(emailElement, { target: { value: "testmail" } });
    const submitElement = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should have disabled submit button when password is too short", async () => {
    render(<LoginForm switchModal={mockSwitchModal} />);

    const passwordElement = screen.getByLabelText(/password/i);
    fireEvent.input(passwordElement, { target: { value: "123" } });
    const submitElement = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should have enabled submit button when email and password are valid", async () => {
    render(<LoginForm switchModal={mockSwitchModal} />);

    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordElement = screen.getByLabelText(/password/i);

    fireEvent.input(emailElement, { target: { value: "test@test.com" } });
    fireEvent.input(passwordElement, { target: { value: "12345678" } });

    const submitElement = await screen.findByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeEnabled();
  });
});
