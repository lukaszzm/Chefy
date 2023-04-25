import { renderHook } from "@testing-library/react";
import { useLogin } from "./useLogin";

describe("useLogin", () => {
  it("should initially have apiResponse as null", () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.apiResponse).toBe(null);
  });
});
