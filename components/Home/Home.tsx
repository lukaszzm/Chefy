import { useHomeModal } from "@/hooks/useHomeModal";
import { LoginForm } from "../Forms/LoginForm";
import { RegisterForm } from "../Forms/RegisterForm";
import { Modal } from "../UI/Modal";
import { HomeNavbar } from "./HomeNavbar";
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
        <HomeNavbar openLoginModal={openLoginModal} />
        <Welcome openModal={openRegisterModal} />
      </div>
    </>
  );
};
