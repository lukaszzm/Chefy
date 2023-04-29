import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Password } from "./Password";
import { createWrapper } from "@/utils/createWrapper";

describe("Password", () => {
  it("should render correctly", () => {
    render(<Password />, { wrapper: createWrapper() });

    const currentPasswordInput = screen.getByLabelText(/current password/i);
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const submitButton = screen.getByRole("button", { name: /save/i });

    expect(currentPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should initially disable the save button", () => {
    render(<Password />, { wrapper: createWrapper() });

    const submitButton = screen.getByRole("button", { name: /save/i });

    expect(submitButton).toBeDisabled();
  });

  it("should display error messages when both passwords are too short", async () => {
    const user = userEvent.setup();
    render(<Password />, { wrapper: createWrapper() });

    const currentPasswordInput = screen.getByLabelText(/current password/i);
    const newPasswordInput = screen.getByLabelText(/new password/i);

    await user.type(currentPasswordInput, "123");
    await user.type(newPasswordInput, "123");

    const errorMessages = screen.queryAllByText(
      /your password must have at least 8 characters/i
    );

    expect(errorMessages).toHaveLength(2);
  });

  it("should disable button when current password is too short", async () => {
    const user = userEvent.setup();
    render(<Password />, { wrapper: createWrapper() });

    const currentPasswordInput = screen.getByLabelText(/current password/i);
    await user.type(currentPasswordInput, "123");
    const submitButton = screen.queryByRole("button", { name: /save/i });

    expect(submitButton).toBeDisabled();
  });

  it("should disable button when new password is too short", async () => {
    const user = userEvent.setup();
    render(<Password />, { wrapper: createWrapper() });

    const newPasswordInput = screen.getByLabelText(/new password/i);
    await user.type(newPasswordInput, "123");
    const submitButton = screen.queryByRole("button", { name: /save/i });

    expect(submitButton).toBeDisabled();
  });

  it("should enable button when both passwords are long enough", async () => {
    const user = userEvent.setup();
    render(<Password />, { wrapper: createWrapper() });

    const currentPasswordInput = screen.getByLabelText(/current password/i);
    const newPasswordInput = screen.getByLabelText(/new password/i);

    await user.type(currentPasswordInput, "12345678");
    await user.type(newPasswordInput, "12345678");

    const submitButton = screen.queryByRole("button", { name: /save/i });

    expect(submitButton).toBeEnabled();
  });
});
