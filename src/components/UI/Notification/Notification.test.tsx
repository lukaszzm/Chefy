import { render, screen } from "@testing-library/react";
import { Notification } from "./Notification";
import userEvent from "@testing-library/user-event";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "notification");
document.body.appendChild(modalRoot);

const mockCloseNotification = jest.fn();

describe("Notification", () => {
  it("should render when isOpen prop is true", () => {
    render(
      <Notification isOpen={true} closeNotification={mockCloseNotification}>
        Child
      </Notification>
    );

    const notification = screen.getByRole("alert");
    const child = screen.getByText(/child/i);

    expect(notification).toBeInTheDocument();
    expect(child).toBeInTheDocument();
  });

  it("should not render when isOpen prop is false", () => {
    render(
      <Notification isOpen={false} closeNotification={mockCloseNotification}>
        Child
      </Notification>
    );

    const notification = screen.queryByRole("alert");

    expect(notification).not.toBeInTheDocument();
  });

  it("should close notification after click close button", async () => {
    const user = userEvent.setup();
    render(
      <Notification isOpen={true} closeNotification={mockCloseNotification}>
        Child
      </Notification>
    );

    const closeButton = screen.getByRole("button", {
      name: "close notification",
    });

    await user.click(closeButton);

    expect(mockCloseNotification).toBeCalledTimes(1);
  });
});
