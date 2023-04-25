import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Areas } from "./Areas";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockAllAreas = [
  { id: "1", name: "Area 1" },
  { id: "2", name: "Area 2" },
];

const mockCheckedByDefault = [{ id: "1", name: "Area 1" }];

describe("Areas", () => {
  it("should render with allAreas prop as default value", async () => {
    await act(async () =>
      render(
        <Areas
          allAreas={mockAllAreas}
          checkedByDefaultAreas={mockCheckedByDefault}
        />,
        { wrapper }
      )
    );

    const area1 = screen.getByRole("checkbox", { name: /area 1/i });
    const area2 = screen.getByRole("checkbox", { name: /area 2/i });

    expect(area1).toBeChecked();
    expect(area2).not.toBeChecked();
  });

  it("should initially disable the save button", async () => {
    await act(async () =>
      render(
        <Areas
          allAreas={mockAllAreas}
          checkedByDefaultAreas={mockCheckedByDefault}
        />,
        { wrapper }
      )
    );

    const button = screen.getByRole("button", { name: /save/i });

    expect(button).toBeDisabled();
  });

  it("should enable the save button when an area is checked", async () => {
    const user = userEvent.setup();
    render(
      <Areas
        allAreas={mockAllAreas}
        checkedByDefaultAreas={mockCheckedByDefault}
      />,
      {
        wrapper,
      }
    );

    const area2 = screen.getByRole("checkbox", { name: /area 2/i });
    await user.click(area2);
    const button = screen.queryByRole("button", { name: /save/i });

    expect(button).toBeEnabled();
  });
});
