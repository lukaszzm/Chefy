import { render, screen } from "@testing-library/react";
import { Notification } from "./Notification";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "notification");
document.body.appendChild(modalRoot);

describe("Notification", () => {
  it("should render notification witch child", () => {
    render(<Notification>Child</Notification>);

    const notification = screen.getByRole("alert");
    const child = screen.getByText(/child/i);

    expect(notification).toBeInTheDocument();
    expect(child).toBeInTheDocument();
  });
});
