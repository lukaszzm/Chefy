import { renderHook } from "@testing-library/react";
import { useRecipe } from "./useRecipe";
import { createWrapper } from "@/utils/createWrapper";

describe("useRecipe", () => {
  it("should initially return correct states", () => {
    const { result } = renderHook(() => useRecipe("1"), {
      wrapper: createWrapper(),
    });

    expect(result.current.isShortVersion).toBe(true);
    expect(result.current.isLike).toBe(true);
    expect(result.current.isError).toBe(false);
  });
});
