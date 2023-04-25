import { act, renderHook, waitFor } from "@testing-library/react";
import { useRecipe } from "./useRecipe";
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

describe("useRecipe", () => {
  it("should initially return correct states", () => {
    const { result } = renderHook(() => useRecipe("1"), { wrapper });

    expect(result.current.isShortVersion).toBe(true);
    expect(result.current.isLike).toBe(true);
    expect(result.current.isError).toBe(false);
  });
});
