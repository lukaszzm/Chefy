import { fireEvent, render, screen } from "@testing-library/react";
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

  it("should call likeHandler when like button is clicked", () => {
    const likeHandler = jest.fn();
    render(<Buttons likeHandler={likeHandler} />);

    const likeButton = screen.getByRole("button", {
      name: "like",
    });

    likeButton.click();

    expect(likeHandler).toHaveBeenCalled();
  });

  it("should call dislikeHandler when dislike button is clicked", () => {
    const mockDislikeHandler = jest.fn();
    render(<Buttons dislikeHandler={mockDislikeHandler} />);

    const dislikeButton = screen.getByRole("button", {
      name: "dislike",
    });

    fireEvent.click(dislikeButton);

    expect(mockDislikeHandler).toHaveBeenCalled();
  });
});
