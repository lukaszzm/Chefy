import { renderHook, waitFor } from "@testing-library/react";
import { useSettingsForm } from "./useSettingsForm";
import { createWrapper } from "@/utils/createWrapper";

describe("useSettingsForm", () => {
  it("should initially return correct states", async () => {
    const { result } = renderHook(() => useSettingsForm({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.apiResponse).toBe(null);
      expect(result.current.isPending).toBe(false);
      expect(result.current.formState.errors).toEqual({});
      expect(result.current.formState.isValid).toBe(false);
      expect(result.current.formState.isDirty).toBe(false);
    });
  });
});
