import { act, renderHook } from "@testing-library/react";

import { useModal } from "./useModal";

describe("useModal", () => {
  it("should initially return isModalOpen as false", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isModalOpen).toBe(false);
  });

  it("should open modal", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isModalOpen).toBe(true);
  });

  it("should close modal", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
  });
});
