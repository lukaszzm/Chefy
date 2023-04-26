import { render, screen } from "@testing-library/react";
import { Title } from "./Title";

describe("Title", () => {
  it("should render title", () => {
    render(<Title>Test</Title>);

    const title = screen.getByRole("heading", {
      name: /test/i,
    });

    expect(title).toBeInTheDocument();
  });
});
