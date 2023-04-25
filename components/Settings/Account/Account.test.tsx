import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Account } from "./Account";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

describe("Account", () => {
  it("should render with name prop as default value", async () => {
    await act(async () => render(<Account name="John Doe" />, { wrapper }));

    const textbox = screen.getByRole("textbox", { name: /name/i });

    expect(textbox).toHaveValue("John Doe");
  });

  it("should initially disable the save button", async () => {
    await act(async () => render(<Account name="John Doe" />, { wrapper }));

    const button = screen.getByRole("button", { name: /save/i });

    expect(button).toBeDisabled();
  });

  it("should enable the save button when the name is changed", async () => {
    const user = userEvent.setup();
    render(<Account name="John Doe" />, { wrapper });

    const textbox = screen.getByRole("textbox", { name: /name/i });
    await user.type(textbox, "New name");
    const button = screen.queryByRole("button", { name: /save/i });

    expect(button).toBeEnabled();
  });

  it("should display an error when the name is empty", async () => {
    const user = userEvent.setup();
    render(<Account name="John Doe" />, { wrapper });

    const textbox = screen.getByRole("textbox", { name: /name/i });
    await user.clear(textbox);
    const error = screen.queryByText(/name is required/i);

    expect(error).toBeInTheDocument();
  });

  it("should disable the save button when the name is empty", async () => {
    const user = userEvent.setup();
    render(<Account name="John Doe" />, { wrapper });

    const textbox = screen.getByRole("textbox", { name: /name/i });
    await user.clear(textbox);
    const button = screen.queryByRole("button", { name: /save/i });

    expect(button).toBeDisabled();
  });
});
