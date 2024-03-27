import { render, screen } from "@testing-library/react";

import { Container } from "./Container";

describe("Container", () => {
  it("should render children", () => {
    render(<Container>test</Container>);

    const child = screen.getByText(/test/i);

    expect(child).toBeInTheDocument();
  });
});
