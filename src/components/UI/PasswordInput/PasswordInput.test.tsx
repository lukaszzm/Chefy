import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PasswordInput } from "@/components/UI/PasswordInput";

describe("PasswordInput", () => {
  it("should render initially as password", () => {
    render(<PasswordInput id="password" name="password" placeholder="passwordPlaceholder" />);

    const input = screen.getByPlaceholderText("passwordPlaceholder");

    expect(input).toHaveAttribute("type", "password");
  });

  it("should show a password after click a button", async () => {
    const user = userEvent.setup();
    render(<PasswordInput id="password" name="password" placeholder="passwordPlaceholder" />);

    const input = screen.getByPlaceholderText("passwordPlaceholder");
    const button = screen.getByRole("button", {
      name: "show password",
    });

    await user.click(button);

    expect(input).toHaveAttribute("type", "text");
  });
});
