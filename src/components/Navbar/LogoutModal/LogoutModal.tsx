import { signOut } from "next-auth/react";
import { Modal } from "@/components/UI/Modal";
import { Button } from "@/components/UI/Button";

interface LogoutModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const LogoutModal = ({ isModalOpen, closeModal }: LogoutModalProps) => {
  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} title="Log out">
      <p className="text-center font-medium text-gray-500">
        Are you sure you want to log out?
      </p>
      <div className="flex justify-between mt-2 gap-4">
        <Button variant="outline-danger" fullWidth onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button variant="danger" fullWidth onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </Modal>
  );
};
