import { renderHook } from "@testing-library/react";

import { createWrapper } from "@/utils/createWrapper";

import { useDeleteLike } from "./useDeleteLike";

jest.mock("next/router", () => require("next-router-mock"));

describe("useDeleteLike", () => {
  it("should initially return correct states", () => {
    const { result } = renderHook(() => useDeleteLike(), {
      wrapper: createWrapper(),
    });

    expect(result.current.apiResponse).toBe(null);
    expect(result.current.isPending).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });
});
