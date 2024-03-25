import { renderHook } from "@testing-library/react";
import { useSignIn } from "./use-sign-in";

describe("useSignIn", () => {
  it("should initially have apiResponse as null", () => {
    const { result } = renderHook(() => useSignIn());

    expect(result.current.apiResponse).toBe(null);
  });
});
