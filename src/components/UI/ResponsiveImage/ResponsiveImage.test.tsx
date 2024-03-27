import { render, screen } from "@testing-library/react";

import { ResponsiveImage } from "./ResponsiveImage";

describe("ResponsiveImage", () => {
  it("should render image", () => {
    render(<ResponsiveImage alt="test" src="https://via.placeholder.com/150" />);

    const image = screen.getByRole("img", {
      name: /test/i,
    });

    expect(image).toBeInTheDocument();
  });
});
