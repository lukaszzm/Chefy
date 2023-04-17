import { render, screen, fireEvent } from "@testing-library/react";
import { SwipeCard } from "./SwipeCard";

const mockOnSwipeRight = jest.fn();
const mockOnSwipeLeft = jest.fn();
const mockSetIsLike = jest.fn();

describe("SwipeCard", () => {
  it("should render children", () => {
    render(
      <SwipeCard
        onSwipeLeft={mockOnSwipeLeft}
        onSwipeRight={mockOnSwipeRight}
        isLike={false}
        setIsLike={mockSetIsLike}
      >
        <div>Child Content</div>
      </SwipeCard>
    );

    const element = screen.getByText("Child Content");

    expect(element).toBeInTheDocument();
  });
});
