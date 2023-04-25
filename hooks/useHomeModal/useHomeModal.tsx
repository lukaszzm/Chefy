import { useState } from "react";
import { useModal } from "../useModal/useModal";

export const useHomeModal = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState<"login" | "register">("login");

  const openLoginModal = () => {
    openModal();
    setModalType("login");
  };

  const openRegisterModal = () => {
    openModal();
    setModalType("register");
  };

  const switchModal = () => {
    modalType === "login" ? setModalType("register") : setModalType("login");
  };

  return {
    isModalOpen,
    modalType,
    openLoginModal,
    openRegisterModal,
    switchModal,
    closeModal,
  };
};
