import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockSwitchModal = jest.fn();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("RegisterForm", () => {
  it("should render correctly", () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, { wrapper });
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
    render(<RegisterForm switchModal={mockSwitchModal} />, { wrapper });

    const submitElement = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should switch modal", () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, { wrapper });

    screen.getByText(/sign in here!/i).click();

    expect(mockSwitchModal).toHaveBeenCalled();
  });

  it("should display error message when name is empty", async () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, { wrapper });

    const nameElement = screen.getByRole("textbox", {
      name: /name/i,
    });
    fireEvent.input(nameElement, { target: { value: "a" } });
    fireEvent.input(nameElement, { target: { value: "" } });
    const errorMessage = await screen.findByText(/name is required/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message when email is invalid", async () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, { wrapper });

    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    fireEvent.input(emailElement, { target: { value: "testmail" } });
    const errorMessage = await screen.findByText(/invalid email/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message when password is too short", async () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, { wrapper });

    const passwordElement = screen.getByLabelText(/password/i);
    fireEvent.input(passwordElement, { target: { value: "123" } });
    const errorMessage = await screen.findByText(
      /your password must have at least 8 characters/i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it("should have disabled submit button when name is empty", () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, { wrapper });

    const nameElement = screen.getByRole("textbox", {
      name: /name/i,
    });
    fireEvent.input(nameElement, { target: { value: "s" } });
    fireEvent.input(nameElement, { target: { value: "" } });
    const submitElement = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should have disabled submit button when email is invalid", () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, { wrapper });

    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    fireEvent.input(emailElement, { target: { value: "testmail" } });
    const submitElement = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should have disabled submit button when password is too short", () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, { wrapper });

    const passwordElement = screen.getByLabelText(/password/i);
    fireEvent.input(passwordElement, { target: { value: "123" } });
    const submitElement = screen.getByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeDisabled();
  });

  it("should have enabled submit button when all inputs are valid", async () => {
    render(<RegisterForm switchModal={mockSwitchModal} />, { wrapper });

    const nameElement = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailElement = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordElement = screen.getByLabelText(/password/i);
    fireEvent.input(nameElement, { target: { value: "test" } });
    fireEvent.input(emailElement, { target: { value: "test@test.com" } });
    fireEvent.input(passwordElement, { target: { value: "12345678" } });
    const submitElement = await screen.findByRole("button", {
      name: /submit/i,
    });

    expect(submitElement).toBeEnabled();
  });
});
