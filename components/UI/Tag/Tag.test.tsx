import { render, screen } from "@testing-library/react";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("should render tag", () => {
    render(<Tag>Test</Tag>);

    const tag = screen.getByText(/test/i);

    expect(tag).toBeInTheDocument();
  });
});
