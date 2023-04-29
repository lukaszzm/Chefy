import { renderHook } from "@testing-library/react";
import { useDeleteLike } from "./useDeleteLike";
import { createWrapper } from "@/utils/createWrapper";

jest.mock("next/router", () => require("next-router-mock"));

describe("useDeleteLike", () => {
  it("should initially return correct states", () => {
    const { result } = renderHook(() => useDeleteLike(), {
      wrapper: createWrapper(),
    });

    expect(result.current.apiResponse).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });
});
