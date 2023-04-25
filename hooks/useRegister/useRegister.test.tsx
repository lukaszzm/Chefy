import { renderHook } from "@testing-library/react";
import { useRegister } from "./useRegister";
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

describe("useRegister", () => {
  it("should initially return correct states", () => {
    const { result } = renderHook(() => useRegister(), { wrapper });

    expect(result.current.apiResponse).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(false);
    expect(result.current.isDirty).toBe(false);
  });
});
