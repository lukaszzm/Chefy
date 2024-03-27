import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LogoutModal } from "./LogoutModal";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal");
document.body.appendChild(modalRoot);

const mockCloseModal = jest.fn();

describe("LogoutModal", () => {
  it("should render correctly if modal is open", () => {
    render(<LogoutModal closeModal={mockCloseModal} isModalOpen={true} />);

    const modal = screen.queryByRole("dialog");
    const title = screen.getByRole("heading", {
      name: /log out/i,
    });
    const text = screen.getByText(/are you sure you want to log out/i);
    const cancelButton = screen.getByRole("button", {
      name: /cancel/i,
    });
    const logoutButton = screen.getByRole("button", {
      name: /logout/i,
    });

    expect(modal).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it("should not render if modal is closed", () => {
    render(<LogoutModal closeModal={mockCloseModal} isModalOpen={false} />);

    const modal = screen.queryByRole("dialog");

    expect(modal).not.toBeInTheDocument();
  });

  it("should call closeModal when clicking on close button", async () => {
    const user = userEvent.setup();
    render(<LogoutModal closeModal={mockCloseModal} isModalOpen={true} />);

    const closeButton = screen.getByRole("button", {
      name: /cancel/i,
    });

    await user.click(closeButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
