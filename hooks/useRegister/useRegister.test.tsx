import { renderHook } from "@testing-library/react";
import { useRegister } from "./useRegister";
import { createWrapper } from "@/utils/createWrapper";

describe("useRegister", () => {
  it("should initially return correct states", () => {
    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(),
    });

    expect(result.current.apiResponse).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(false);
    expect(result.current.isDirty).toBe(false);
  });
});
