import { render, screen } from "@testing-library/react";

import { SwipeCard } from "./SwipeCard";

const mockOnSwipeRight = jest.fn();
const mockOnSwipeLeft = jest.fn();
const mockSetIsLike = jest.fn();

describe("SwipeCard", () => {
  it("should render children", () => {
    render(
      <SwipeCard isLike={false} setIsLike={mockSetIsLike} onSwipeLeft={mockOnSwipeLeft} onSwipeRight={mockOnSwipeRight}>
        <div>Child Content</div>
      </SwipeCard>
    );

    const element = screen.getByText("Child Content");

    expect(element).toBeInTheDocument();
  });
});
