import { useHomeModal } from "@/hooks/useLoginModal";
import { LoginForm } from "../Forms/LoginForm";
import { RegisterForm } from "../Forms/RegisterForm";
import { Modal } from "../Modal/Modal";
import { NavBar } from "./HomeNavbar";
import { Welcome } from "./Welcome";

export const Home: React.FC = () => {
  const {
    isModalOpen,
    modalType,
    switchModal,
    openLoginModal,
    openRegisterModal,
    closeModal,
  } = useHomeModal();

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        title={modalType}
      >
        {modalType === "login" ? (
          <LoginForm switchModal={switchModal} />
        ) : (
          <RegisterForm switchModal={switchModal} />
        )}
      </Modal>
      <div className="flex flex-col min-h-screen justify-center overflow-auto">
        <NavBar openLoginModal={openLoginModal} />
        <Welcome openModal={openRegisterModal} />
      </div>
    </>
  );
};
