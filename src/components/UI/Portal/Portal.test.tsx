import { render } from "@testing-library/react";

import { Portal } from "./Portal";

describe("Portal", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.setAttribute("id", "portal");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it("should render child into specified selector", () => {
    const selector = "#portal";
    const child = "Child";

    render(<Portal selector={selector}>{child}</Portal>, { container });

    const portal = document.querySelector(selector);

    expect(portal).toBeInTheDocument();
    expect(portal).toHaveTextContent(child);
  });

  it("should not render anything if selector is not found", () => {
    const selector = "#not-found";
    const child = "Child";

    render(<Portal selector={selector}>{child}</Portal>, { container });

    const portal = document.querySelector(selector);

    expect(portal).not.toBeInTheDocument();
  });
});
