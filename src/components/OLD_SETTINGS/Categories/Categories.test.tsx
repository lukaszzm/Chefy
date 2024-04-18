import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createWrapper } from "@/utils/createWrapper";

import { Categories } from "./Categories";

const mockAllCategories = [
  { id: "1", name: "Category 1" },
  { id: "2", name: "Category 2" },
];

const mockCheckedByDefault = [{ id: "1", name: "Category 1" }];

describe("Categories", () => {
  it("should render with allCategories prop as default value", async () => {
    await act(async () =>
      render(<Categories allCategories={mockAllCategories} checkedByDefaultCategories={mockCheckedByDefault} />, {
        wrapper: createWrapper(),
      })
    );

    const category1 = screen.getByRole("checkbox", { name: /category 1/i });
    const category2 = screen.getByRole("checkbox", { name: /category 2/i });

    expect(category1).toBeChecked();
    expect(category2).not.toBeChecked();
  });

  it("should initially disable the save button", async () => {
    await act(async () =>
      render(<Categories allCategories={mockAllCategories} checkedByDefaultCategories={mockCheckedByDefault} />, {
        wrapper: createWrapper(),
      })
    );

    const button = screen.getByRole("button", { name: /save/i });

    expect(button).toBeDisabled();
  });

  it("should enable the save button when an category is checked", async () => {
    const user = userEvent.setup();
    render(<Categories allCategories={mockAllCategories} checkedByDefaultCategories={mockCheckedByDefault} />, {
      wrapper: createWrapper(),
    });

    const category2 = screen.getByRole("checkbox", { name: /category 2/i });

    await user.click(category2);

    const button = screen.queryByRole("button", { name: /save/i });

    expect(button).toBeEnabled();
  });
});
