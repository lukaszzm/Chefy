import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal");
document.body.appendChild(modalRoot);

describe("Modal", () => {
  it("should render modal", async () => {
    const mockCloseModal = jest.fn();
    render(
      <Modal title="Test" closeModal={mockCloseModal} isModalOpen={true}>
        <div>content</div>
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    const title = screen.getByRole("heading", {
      name: /test/i,
    });
    const content = screen.getByText(/content/i);

    expect(modal).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it("should not render modal when isModalOpen is false", async () => {
    const mockCloseModal = jest.fn();
    render(
      <Modal title="Test" closeModal={mockCloseModal} isModalOpen={false}>
        <div>content</div>
      </Modal>
    );

    const modal = screen.queryByRole("dialog");

    expect(modal).not.toBeInTheDocument();
  });

  it("should call closeModal when clicking on backdrop", async () => {
    const mockCloseModal = jest.fn();
    const user = userEvent.setup();
    render(
      <Modal title="Test" closeModal={mockCloseModal} isModalOpen={true}>
        <div>content</div>
      </Modal>
    );

    const modal = screen.getByRole("dialog");

    await user.click(modal);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
