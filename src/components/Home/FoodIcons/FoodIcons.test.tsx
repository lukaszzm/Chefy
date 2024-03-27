import { render, screen } from "@testing-library/react";

import { FoodIcons } from "./FoodIcons";

describe("FoodIcons", () => {
  it("should render all icons", () => {
    render(<FoodIcons />);

    const icons = screen.getAllByRole("img");

    expect(icons.length).toBe(6);
  });
});
