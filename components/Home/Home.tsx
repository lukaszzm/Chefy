import { useLoginModal } from "../../hooks/useLoginModal";
import { LoginForm } from "../Forms/LoginForm";
import { RegisterForm } from "../Forms/RegisterForm";
import { Modal } from "../UI/Modal";
import { NavBar } from "./Navbar";
import { Welcome } from "./Welcome";

export const Home: React.FC = () => {
  const {
    isModalOpen,
    modalType,
    switchModal,
    openLoginModal,
    openRegisterModal,
    closeModal,
  } = useLoginModal();

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
      <div className="flex flex-col h-screen justify-center overflow-auto">
        <NavBar openLoginModal={openLoginModal} />
        <Welcome openModal={openRegisterModal} />
      </div>
    </>
  );
};
