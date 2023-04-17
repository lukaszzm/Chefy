import { render } from "@testing-library/react";
import { Instruction } from "./Instruction";

const text = "sample text";

describe("Instruction", () => {
  it("should render instruction", () => {
    const { getByText } = render(<Instruction instruction={text} />);

    const instructionElement = getByText(text);

    expect(instructionElement).toBeInTheDocument();
  });

  it("should render label", () => {
    const { getByText } = render(<Instruction instruction={text} />);

    const labelElement = getByText("Instruction");

    expect(labelElement).toBeInTheDocument();
  });
});
