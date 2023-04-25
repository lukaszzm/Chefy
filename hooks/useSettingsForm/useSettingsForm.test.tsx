import { renderHook, waitFor } from "@testing-library/react";
import { useSettingsForm } from "./useSettingsForm";
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

describe("useSettingsForm", () => {
  it("should initially return correct states", async () => {
    const { result } = renderHook(() => useSettingsForm({}), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.apiResponse).toBe(null);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.formState.errors).toEqual({});
      expect(result.current.formState.isValid).toBe(false);
      expect(result.current.formState.isDirty).toBe(false);
    });
  });
});
