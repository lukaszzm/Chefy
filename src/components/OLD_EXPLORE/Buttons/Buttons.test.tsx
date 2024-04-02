import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Buttons } from "./Buttons";

describe("Buttons", () => {
  it("should render correctly", () => {
    render(<Buttons />);

    const likeButton = screen.getByRole("button", {
      name: "like",
    });
    const dislikeButton = screen.getByRole("button", {
      name: "dislike",
    });

    expect(likeButton).toBeInTheDocument();
    expect(dislikeButton).toBeInTheDocument();
  });

  it("should disable buttons when disabled prop is true", () => {
    render(<Buttons disabled={true} />);

    const likeButton = screen.getByRole("button", {
      name: "like",
    });
    const dislikeButton = screen.getByRole("button", {
      name: "dislike",
    });

    expect(likeButton).toBeDisabled();
    expect(dislikeButton).toBeDisabled();
  });

  it("should call likeHandler when like button is clicked", async () => {
    const likeHandler = jest.fn();
    const user = userEvent.setup();
    render(<Buttons likeHandler={likeHandler} />);

    const likeButton = screen.getByRole("button", {
      name: "like",
    });

    await user.click(likeButton);

    expect(likeHandler).toHaveBeenCalled();
  });

  it("should call dislikeHandler when dislike button is clicked", async () => {
    const mockDislikeHandler = jest.fn();
    const user = userEvent.setup();
    render(<Buttons dislikeHandler={mockDislikeHandler} />);

    const dislikeButton = screen.getByRole("button", {
      name: "dislike",
    });

    await user.click(dislikeButton);

    expect(mockDislikeHandler).toHaveBeenCalled();
  });
});
