import { act, renderHook } from "@testing-library/react";

import { useHomeModal } from "./useHomeModal";

describe("useHomeModal", () => {
  it("should initially return isModalOpen as false", () => {
    const { result } = renderHook(() => useHomeModal());

    expect(result.current.isModalOpen).toBe(false);
  });

  it("should initially return modalType as login", () => {
    const { result } = renderHook(() => useHomeModal());

    expect(result.current.modalType).toBe("login");
  });

  it("should open login modal", () => {
    const { result } = renderHook(() => useHomeModal());

    act(() => {
      result.current.openLoginModal();
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.modalType).toBe("login");
  });

  it("should open register modal", () => {
    const { result } = renderHook(() => useHomeModal());

    act(() => {
      result.current.openRegisterModal();
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.modalType).toBe("register");
  });

  it("should switch modal", () => {
    const { result } = renderHook(() => useHomeModal());

    expect(result.current.modalType).toBe("login");

    act(() => {
      result.current.switchModal();
    });

    expect(result.current.modalType).toBe("register");
  });

  it("should close modal", () => {
    const { result } = renderHook(() => useHomeModal());

    act(() => {
      result.current.openLoginModal();
    });

    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
  });
});
