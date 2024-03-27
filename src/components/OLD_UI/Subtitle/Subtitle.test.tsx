import { render, screen } from "@testing-library/react";

import { Subtitle } from "./Subtitle";

describe("Subtitle", () => {
  it("should render subtitle", () => {
    render(<Subtitle>Test</Subtitle>);

    const subtitle = screen.getByRole("heading", {
      name: /test/i,
    });

    expect(subtitle).toBeInTheDocument();
  });
});
