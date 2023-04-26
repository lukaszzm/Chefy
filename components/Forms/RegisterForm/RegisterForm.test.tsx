import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "./RegisterForm";
import { createWrapper } from "@/utils/createWrapper";

const mockSwitchModal = jest.fn();

describe("RegisterForm", () => {
  it("should render correctly", () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, {
      wrapper: createWrapper(),
    });

    const nameElement = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordElement = screen.getByLabelText(/password/i);
    const switchElement = screen.getByText(/sign in here!/i);
    const submitElement = screen.getByRole("button", {
      name: /submit/i,
    });
    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(switchElement).toBeInTheDocument();
    expect(submitElement).toBeInTheDocument();
  });

  it("should initially have disabled submit button", () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, {
      wrapper: createWrapper(),
    });

    const submitElement = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should switch modal", () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, {
      wrapper: createWrapper(),
    });

    screen.getByText(/sign in here!/i).click();

    expect(mockSwitchModal).toHaveBeenCalled();
  });

  it("should display error message when name is empty", async () => {
    const user = userEvent.setup();
    render(<RegisterForm switchModal={mockSwitchModal} />, {
      wrapper: createWrapper(),
    });

    const nameElement = screen.getByRole("textbox", {
      name: /name/i,
    });

    await user.type(nameElement, "John Doe");
    await user.clear(nameElement);

    const errorMessage = screen.queryByText(/name is required/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message when email is invalid", async () => {
    const user = userEvent.setup();
    render(<RegisterForm switchModal={mockSwitchModal} />, {
      wrapper: createWrapper(),
    });

    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });

    await user.type(emailElement, "testmail");

    const errorMessage = screen.queryByText(/invalid email/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message when password is too short", async () => {
    const user = userEvent.setup();
    render(<RegisterForm switchModal={mockSwitchModal} />, {
      wrapper: createWrapper(),
    });

    const passwordElement = screen.getByLabelText(/password/i);

    await user.type(passwordElement, "123");
    const errorMessage = screen.queryByText(
      /your password must have at least 8 characters/i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it("should have disabled submit button when name is empty", async () => {
    const user = userEvent.setup();
    render(<RegisterForm switchModal={mockSwitchModal} />, {
      wrapper: createWrapper(),
    });

    const nameElement = screen.getByRole("textbox", {
      name: /name/i,
    });

    await user.type(nameElement, "John Doe");
    await user.clear(nameElement);

    const submitElement = screen.queryByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should have disabled submit button when email is invalid", async () => {
    const user = userEvent.setup();
    render(<RegisterForm switchModal={mockSwitchModal} />, {
      wrapper: createWrapper(),
    });

    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    await user.type(emailElement, "testmail");
    const submitElement = screen.queryByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should have disabled submit button when password is too short", async () => {
    const user = userEvent.setup();
    render(<RegisterForm switchModal={mockSwitchModal} />, {
      wrapper: createWrapper(),
    });

    const passwordElement = screen.getByLabelText(/password/i);
    await user.type(passwordElement, "123");
    const submitElement = screen.queryByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should have enabled submit button when all inputs are valid", async () => {
    const user = userEvent.setup();
    render(<RegisterForm switchModal={mockSwitchModal} />, {
      wrapper: createWrapper(),
    });

    const nameElement = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordElement = screen.getByLabelText(/password/i);
    await user.type(nameElement, "John Doe");
    await user.type(emailElement, "test@test.com");
    await user.type(passwordElement, "12345678");
    const submitElement = screen.queryByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeEnabled();
  });
});
